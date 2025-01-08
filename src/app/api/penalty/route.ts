import { IssuanceRequest, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse request body
    const { isPenalty, ...data } = body;
    const { userId } = data;


    const user = await prisma.user.findUnique({
      where: { govId: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    if (isPenalty) {
      console.log(data);
      const penalty = await prisma.penalty.create({
        data: {
          ...data,
        },
      });
      
      const numberOfStars = penalty.numberOfStarsReduced;
      const newStars = user?.stars ? user?.stars : 5 - numberOfStars;
      await prisma.user.update({
        where: { govId: userId },
        data: {
          stars: newStars,
        },
      });
    } else {
      const award = await prisma.award.create({
        data: {
          ...data,
        },
      });
      const numberOfStars = award.numberOfStarsAdded;
      const newStars = (user.stars ? user.stars : 0) + numberOfStars;
      await prisma.user.update({
        where: { govId: userId },
        data: {
          stars: newStars,
        },
      });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error logging:", error);
    return NextResponse.json(
      { error: "Failed to log!" },
      { status: 500 },
    );
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth();
    const govId = session?.user.govId;

    const user = await prisma.user.findUnique({
      where: { govId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 405 });
    }

    const data = await prisma.penalty.findMany({
      where: { userId: user.govId },
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error finding fines: ", error);
    return NextResponse.json(
      { error: "Failed to find penalties" },
      { status: 500 },
    );
  }
}
