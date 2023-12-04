import ticketForm from "../../../../models/supportform";
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../utils/mongoose";

export async function POST(req) {
  try {
    const { firstName, lastName, object, message } = await req.json();
     console.log( firstName, lastName, object, message);
    await connectMongoDB();

    if (!firstName || !lastName || !object) {
      return NextResponse.json(
        {
          message: "required filled not found",
        },
        { status: 400 }
      );
    }

    const newForm = await ticketForm.create({
      firstName,
      lastName,
      object,
      message,
    });

    return NextResponse.json(
      {
        message: "user Created",
        user: newForm,
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
