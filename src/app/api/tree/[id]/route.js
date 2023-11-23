import connectMongoDB from "../../../../../utils/mongoose";
import NewClientDistributor from "../../../../../models/tree";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const { newChildren } = await req.json();

  // Create a new child document
  const child = new NewClientDistributor(newChildren);
  await child.save();

  // Find the parent document by ID
  const parent = await NewClientDistributor.findById(id);

  // Add the reference to the new child in the parent's children array
  parent.children.push(child._id);

  // Save the updated parent document
  await parent.save();

  return NextResponse.json({ children: "topic updated" }, { status: 200 });
}