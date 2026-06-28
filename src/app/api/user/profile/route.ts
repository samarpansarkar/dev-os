import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/db";
import { User } from "@/models/User";

export async function PUT(req: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { firstName, lastName, email, bio } = await req.json();
    const name = `${firstName} ${lastName}`.trim();

    if (!name || !email) {
      return NextResponse.json({ message: "First name, last name, and email are required." }, { status: 400 });
    }

    await connectDB();

    // Check if email is being changed and if it's already in use
    if (email !== session.user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser && existingUser._id.toString() !== session.user.id) {
        return NextResponse.json({ message: "Email is already in use by another account." }, { status: 409 });
      }
    }

    // Update the user
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { name, email, bio },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Profile updated successfully.", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ message: "An error occurred while updating the profile." }, { status: 500 });
  }
}
