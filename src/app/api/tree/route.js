import connectMongoDB from "../../../../utils/mongoose";
import { NextResponse } from "next/server";
import NewMLMTreeData from "../../../../models/tree";

export async function POST(req) {
  try {
    const { name, position, children, referralOfTheMonth, city, country } = await req.json();
    await connectMongoDB();

    const newClient = NewMLMTreeData.create({
      name,
      city,
      country,
      referralOfTheMonth,
      position,
      children,
    });

    return NextResponse.json(
      { message: "client created", client: newClient },
      { status: 200 }
    );
  } catch (error) {
    console.log("error");
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const Client = await NewMLMTreeData.find();
    return NextResponse.json({ Client });
  } catch (error) {
    console.error("Error fetching topics:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
