import { IssuanceRequest, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {


    const session = await auth();
    const userId = session?.user.id;

    const profileData = {
        role: "Administrator",
        govId: "123456789",
        name: "John Doe",
        email: "johndoe@example.com",
        password: "********",
        location: "New York, USA",
        phone: "+1 234 567 890",
        profileImage: "/images/user/user-06.png", // Default profile image
        stars: 3, // Number of filled stars
      };
  
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    const data = {
        role: user.role,
        govId: user.govId,
        name: user.name,
        email: user.email,
        location: user.location,
        phone: user.phone,
        profileImage: user.image, // User's profile image
        stars: user.stars, // Number of filled stars
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


export async function PUT(req: Request) {
    try {

        const session = await auth();
        const userId = session?.user.id;
        const body = await req.json();

       

      const user = await prisma.user.update({
        where: { id: userId },
        data: {
            phone: body.phone,
            location: body.location,
            image: body.profileImage,
        }
      });
  
      
      if (!user) {
        return NextResponse.json({ message: "User not found!" }, { status: 404 });
      }
        
        
  
      return NextResponse.json({ status: 201
    },
);
    } catch (error) {
      console.error("Error logging penalty:", error);
      return NextResponse.json(
        { error: "Failed to award penalty or rewards" },
        { status: 500 },
      );
    }
  }
  