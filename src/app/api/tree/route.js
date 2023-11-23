
import connectMongoDB from "../../../../utils/mongoose";
import { NextResponse } from "next/server";
import NewClientDistributor from '../../../../models/tree'

export async function POST(req) {
    try {
        const { name, position, children } = await req.json();
        console.log(name,"che");
    await connectMongoDB();

    const newClient = NewClientDistributor.create({
      name,
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
      const Client = await NewClientDistributor.find();
      return NextResponse.json({ Client });
    } catch (error) {
      console.error("Error fetching topics:", error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }