import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Education from "@/models/Education";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const portfolio = searchParams.get("portfolio");
    await connectToDatabase();
    
    const query = portfolio ? { portfolios: { $in: [portfolio, "all"] } } : {};
    const education = await Education.find(query).sort({ createdAt: -1 });
    
    return NextResponse.json(education, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch education" }, { status: 500 });
  }
}