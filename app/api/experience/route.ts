import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Experience from "@/models/Experience";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const portfolio = searchParams.get("portfolio");
    await connectToDatabase();
    
    const query = portfolio ? { portfolios: { $in: [portfolio, "all"] } } : {};
    const experience = await Experience.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(experience, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 });
  }
}