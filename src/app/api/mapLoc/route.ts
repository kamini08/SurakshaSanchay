import { db } from "@/lib/db";
import { NextResponse } from "next/server";

const policeStations = [
  { name: "TT Nagar Police Station", lat: 23.23725, long: 77.39984 },
  { name: "Kamla Nagar Police Station", lat: 23.21554, long: 77.39552 },
  { name: "Shyamla Hills Police Station", lat: 23.2457, long: 77.4107 },
  { name: "Habibganj Police Station", lat: 23.2295, long: 77.4381 },
  { name: "Piplani Police Station", lat: 23.2289, long: 77.4718 },
  { name: "Govindpura Police Station", lat: 23.2587, long: 77.4935 },
  { name: "Ashoka Garden Police Station", lat: 23.2494, long: 77.4631 },
  { name: "MP Nagar Police Station", lat: 23.2332, long: 77.4272 },
  { name: "Bhopal Kotwali Police Station", lat: 23.2689, long: 77.4012 },
  { name: "Hanumanganj Police Station", lat: 23.2812, long: 77.4135 },
  { name: "Chhola Mandir Police Station", lat: 23.2856, long: 77.4343 },
  { name: "Shahpura Police Station", lat: 23.1945, long: 77.4423 },
  { name: "Misrod Police Station", lat: 23.1734, long: 77.4802 },
  { name: "Kolar Police Station", lat: 23.1678, long: 77.4187 },
  { name: "Jahangirabad Police Station", lat: 23.2635, long: 77.4273 },
  { name: "Mangalwara Police Station", lat: 23.2721, long: 77.4224 },
  { name: "Talaiya Police Station", lat: 23.2685, long: 77.4152 },
  { name: "Ayodhya Nagar Police Station", lat: 23.2467, long: 77.4823 },
  { name: "Bagh Sewania Police Station", lat: 23.2118, long: 77.4756 },
  { name: "Khajuri Sadak Police Station", lat: 23.1245, long: 77.5712 },
  { name: "Ratibad Police Station", lat: 23.1101, long: 77.3865 },
  { name: "Berasia Police Station", lat: 23.6352, long: 77.4323 },
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const selectedCategory = body;
    console.log("csaaaaaaaaaaaaaaaaaaaaaaaaaaa", selectedCategory);

    return NextResponse.json(selectedCategory, {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
