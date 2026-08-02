import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Project from "@/models/Project";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const portfolio = searchParams.get("portfolio");
    await connectToDatabase();
    
    const query = portfolio ? { portfolios: { $in: [portfolio, "all"] } } : {};
    const projects = await Project.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}