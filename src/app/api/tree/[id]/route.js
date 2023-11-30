import connectMongoDB from "../../../../../utils/mongoose";
import NewMLMTreeData from "../../../../../models/tree";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { id } = params;
  const { newChildren } = await req.json();
  console.log(newChildren, "newChildren");
  const updatedChild = {
    name: newChildren.firstName,
    position: newChildren.position,
    city: newChildren.city,
    country: newChildren.country,
  };
  // Create a new child document
  const child = new NewMLMTreeData(updatedChild);
  await child.save();
  // Find the parent document by ID
  const parent = await NewMLMTreeData.findById(id);

  // Add the reference to the new child in the parent's children array
  parent.children.push(child._id);

  // Save the updated parent document
  await parent.save();

  return NextResponse.json({ children: "topic updated" }, { status: 200 });
}
