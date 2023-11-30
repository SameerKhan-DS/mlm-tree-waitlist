// import dashboardUser from "@/models/User";
// import connect from "@/utils/db";
import connectMongoDB from "../../../../utils/mongoose";
import NewWaitListWithTime from "../../../../models/waitlist";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import NewMLMTreeData from "../../../../models/tree";

export const POST = async (request: any) => {
  const { firstName, lastName, city, country, email, password, referralCode } =
    await request.json();
  console.log(
    firstName,
    lastName,
    city,
    country,
    email,
    password,
    referralCode,
    "email, passwordemail, password"
  );

  await connectMongoDB();

  const existingUser = await NewWaitListWithTime.findOne({ email });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);
  console.log(existingUser, hashedPassword, "existingUser");
  const referredBy = await NewMLMTreeData.findOne({ _id: referralCode });
  // console.log(referredBy, "referralCode && referredBy");

  const newUser = new NewWaitListWithTime(
    referralCode && referredBy
      ? {
          firstName,
          lastName,
          city,
          email,
          country,
          password: hashedPassword,
          referralCode: referralCode,
          reward: referralCode ? 10 : null,
          status: "active"
        }
      : {
          firstName,
          lastName,
          city,
          email,
          country,
          password: hashedPassword,
          status: "active"
        }
  );

  if (referredBy) {
    const { referralOfTheMonth } = await NewMLMTreeData.findById(referredBy._id);
    if (!referralOfTheMonth) {
      await NewMLMTreeData.findOneAndUpdate(
        { _id: referredBy._id },
        { $set: { referralOfTheMonth: 1 } },
        { upsert: true, new: true }
      );
    } else {
      await NewMLMTreeData.findOneAndUpdate(
        { _id: referredBy._id },
        { $inc: { referralOfTheMonth: 1 } },
        { new: true }
      );
    }
  }

  try {
    await newUser.save();
    return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    console.log("error hai bhai");
    return new NextResponse(err, {
      status: 500,
    });
  }
};
