import { IssuanceRequest, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    
    const { isPenalty, ...data } = body;
    const { userId } = data;

    const user = await prisma.user.findUnique({
      where: { govId: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    if (isPenalty) {
      const penalty = await prisma.penalty.create({
        data: {
          user,
          ...data,
        },
      });
      const numberOfStars = penalty.numberOfStarsReduced;
      const newStars = user.stars ? user.stars : 5 - numberOfStars;
      await prisma.user.update({
        where: { govId: userId },
        data: {
          stars: newStars,
        },
      });
    } else {
      const award = await prisma.award.create({
        data: {
          user,
          ...data,
        },
      });
      const numberOfStars = award.numberOfStarsAdded;
      const newStars = user.stars ? user.stars : 0 + numberOfStars;
      await prisma.user.update({
        where: { govId: userId },
        data: {
          stars: newStars,
        },
      });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Error logging penalty:", error);
    return NextResponse.json(
      { error: "Failed to award penalty or rewards" },
      { status: 500 },
    );
  }
}
