import faqsList from "../../../../models/faqs";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../utils/mongoose";

export async function POST(req) {
  try {

    const { title, content } = await req.json();
    
    await connectMongoDB();
    
    if (!title || !content) {
      return NextResponse.json(
        {
          message: "required filled not found",
        },
        { status: 400 }
      );
    }

    const newFAQ = await faqsList.create({
      title,
      content,
    });

    return NextResponse.json(
      {
        message: "user Created",
        user: newFAQ,
      },
      { status: 201 }
    );

  } catch (error) {
    console.log("Error creating topic:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const faqs = await faqsList.find();
    return NextResponse.json({ faqs });
  } catch (error) {
    console.error("Error fetching topics:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
