import { NextResponse } from "next/server";
import connectMongoDB from "../../../../utils/mongoose";
import NewWaitListWithTime from "../../../../models/waitlist";

export async function POST(req) {
  try {
    const { firstName, lastName, city, country, pack, email, status } =
      await req.json();
    await connectMongoDB();
    if (!firstName || !lastName || !email || !status) {
      return NextResponse.json(
        {
          message: "required filled not found",
        },
        { status: 400 }
      );
    }
    const newUser = await NewWaitListWithTime.create({
      firstName,
      lastName,
      city,
      country,
      pack,
      email,
      status,
    });
    return NextResponse.json(
      {
        message: "user Created",
        user: newUser,
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
    const users = await NewWaitListWithTime.find();
    return NextResponse.json({ users });
  } catch (error) {
    console.error("Error fetching topics:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    if (!req.nextUrl) {
      console.error("req.nextUrl is undefined");
      return NextResponse.json({ error: "Invalid request URL structure" }, { status: 400 });
    }

    if (!req.nextUrl.searchParams) {
      console.error("req.nextUrl.searchParam is undefined");
      return NextResponse.json({ error: "Invalid request URL structure" }, { status: 400 });
    }

    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      console.error("Id parameter is missing");
      return NextResponse.json({ error: "Missing 'id' parameter in the request URL" }, { status: 400 });
    }

    await connectMongoDB();
    await NewWaitListWithTime.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting topic:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
