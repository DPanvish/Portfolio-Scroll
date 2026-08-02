import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import About from "@/models/About";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const portfolio = searchParams.get("portfolio");
    await connectToDatabase();
    
    const query = portfolio ? { portfolios: { $in: [portfolio, "all"] } } : {};
    const about = await About.findOne(query);
    
    return NextResponse.json(about || {}, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch about data" }, { status: 500 });
  }
}