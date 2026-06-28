import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Project } from '@/models/Project';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import { auth } from '@/auth';

const execAsync = promisify(exec);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const project = await Project.findById(id);

    if (!project) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    const session = await auth();

    // 1. Try GitHub API if githubUrl is provided
    if (project.githubUrl) {
      try {
        // Extract owner and repo from URL (e.g. https://github.com/owner/repo)
        const match = project.githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (match) {
          const owner = match[1];
          const repo = match[2].replace('.git', '');
          
          const headers: HeadersInit = {
            'Accept': 'application/vnd.github.v3+json',
          };
          
          // Use NextAuth session token if available
          if (session?.githubAccessToken) {
            headers['Authorization'] = `token ${session.githubAccessToken}`;
          }

          const ghRes = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=10`, {
            headers
          });

          if (ghRes.ok) {
            const data = await ghRes.json();
            const commits = data.map((item: any) => ({
              hash: item.sha,
              authorName: item.commit.author.name,
              authorEmail: item.commit.author.email,
              date: item.commit.author.date.split('T')[0],
              subject: item.commit.message.split('\n')[0],
              github: true // marker to show it came from github
            }));
            return NextResponse.json({ success: true, data: commits });
          } else {
            console.warn(`GitHub API failed for ${owner}/${repo}: ${ghRes.status}`);
          }
        }
      } catch (ghError) {
        console.error('GitHub API error:', ghError);
      }
    }

    // 2. Fallback to local git path
    if (!project.localPath || !fs.existsSync(project.localPath)) {
      return NextResponse.json({ 
        success: false, 
        error: 'Unable to fetch from GitHub and no valid local path is configured' 
      }, { status: 400 });
    }

    try {
      const { stdout } = await execAsync('git log -n 10 --pretty=format:"%H|%an|%ae|%ad|%s" --date=short', {
        cwd: project.localPath,
        timeout: 5000
      });

      const commits = stdout.split('\n').filter(Boolean).map(line => {
        const [hash, authorName, authorEmail, date, ...subjectParts] = line.split('|');
        return { 
          hash, 
          authorName, 
          authorEmail, 
          date, 
          subject: subjectParts.join('|'),
          local: true 
        };
      });

      return NextResponse.json({ success: true, data: commits });
    } catch (gitError: any) {
      console.error('Git log error:', gitError);
      return NextResponse.json({ success: false, error: 'Failed to retrieve git history locally' }, { status: 400 });
    }

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
