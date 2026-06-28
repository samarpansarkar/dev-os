import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { Snippet } from '@/models/Snippet';
import { Category } from '@/models/Category';

export async function GET() {
  try {
    await connectDB();

    // Clear existing for a clean slate
    await Snippet.deleteMany({});
    
    // Check if we need to create categories
    let reactCat = await Category.findOne({ name: 'React' });
    if (!reactCat) reactCat = await Category.create({ name: 'React', color: '#61dafb', description: 'React hooks and components' });
    
    let pythonCat = await Category.findOne({ name: 'Python' });
    if (!pythonCat) pythonCat = await Category.create({ name: 'Python', color: '#3572A5', description: 'Python scripts' });

    let linuxCat = await Category.findOne({ name: 'Linux' });
    if (!linuxCat) linuxCat = await Category.create({ name: 'Linux', color: '#fcc624', description: 'Server administration' });

    // Seed Snippets
    const seedSnippets = [
      {
        title: 'useDebounce Hook',
        description: 'A custom React hook that delays invoking a function until after wait milliseconds have elapsed.',
        language: 'TypeScript',
        categoryId: reactCat._id,
        tags: ['react', 'hook', 'debounce'],
        difficulty: 'Intermediate',
        blocks: [
          {
            type: 'text',
            content: 'This hook is extremely useful for things like search inputs where you don\'t want to hit the API on every single keystroke.'
          },
          {
            type: 'code',
            filename: 'useDebounce.ts',
            language: 'typescript',
            content: `import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}`
          },
          {
            type: 'note',
            content: 'Make sure to pass a primitive value or a memoized object to prevent infinite re-renders.'
          }
        ]
      },
      {
        title: 'Setup PostgreSQL with Docker',
        description: 'Quickly spin up a local postgres database for development using Docker.',
        language: 'YAML',
        categoryId: linuxCat._id,
        tags: ['docker', 'postgres', 'database'],
        difficulty: 'Beginner',
        blocks: [
          {
            type: 'text',
            content: 'Save this docker-compose file in your project root.'
          },
          {
            type: 'code',
            filename: 'docker-compose.yml',
            language: 'yaml',
            content: `version: '3.8'
services:
  db:
    image: postgres:15-alpine
    restart: always
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydatabase
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:`
          },
          {
            type: 'command',
            content: 'docker-compose up -d'
          }
        ]
      },
      {
        title: 'FastAPI Hello World',
        description: 'A minimal FastAPI setup for building APIs with Python.',
        language: 'Python',
        categoryId: pythonCat._id,
        tags: ['python', 'fastapi', 'backend'],
        difficulty: 'Beginner',
        blocks: [
          {
            type: 'command',
            content: 'pip install fastapi uvicorn'
          },
          {
            type: 'code',
            filename: 'main.py',
            language: 'python',
            content: `from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}`
          },
          {
            type: 'command',
            content: 'uvicorn main:app --reload'
          }
        ]
      }
    ];

    await Snippet.insertMany(seedSnippets);

    return NextResponse.json({ success: true, message: 'Database seeded successfully with Categories and Snippets!' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
