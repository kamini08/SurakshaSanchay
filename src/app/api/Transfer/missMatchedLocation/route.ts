
// //  NOT REQUIRED NOW!

import { FaWpexplorer } from "react-icons/fa";

// import { db } from "@/lib/db";
// import { auth } from "../../../../../auth";

// export async function PUT(req: Request) {
//     try {
//         const session = await auth();
//         const user = session?.user;

//         const locationUser = await db.user.findUnique({
//             where: { id: user?.id },
//             select: { location: true, govId: true }
//         })
//         const issuedTo = await db.inventoryItem.findUnique({
//             where: { AND: [{ location: locationUser?.location }, { NOT: [{issuedTo: locationUser?.govId,}] },] },
//             select: { issuedTo: true }
//         })
//         const falseLocation = await db.user.findUnique({
//             where: { govId: issuedTo?.issuedTo },
//             select: { location: true }
//         }
//     });

//     const mismatchedItems = await db.inventoryItem.findMany({
//         where: {
//             AND: [
//                 {
//                     location: {
//                         not: null, // Ensures current location exists
//                     },
//                 },
//                 {
//                     issuedTo: {
//                         not: null, // Ensures issuedTo exists
//                     },
//                 },
//                 {
//                     NOT: {
//                         falseLocation: { equals: locationUser.location },
//                     }
//                 },
//             ],
//         },
//     });
//     return new Response(JSON.stringify(mismatchedItems), { status: 200 });
// } catch (error) {
//     console.error("Error fetching mismatched locations:", error);
//     return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
//         status: 500,
//     });
// }
// }


// const res = await fetch(`${process.env.DOMAIN}/api/Transfer/updateIssuedTo`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(updatedItems),
//     });

export async function GET(req: Request) {
    return new Response("Mismatched Location Data");
}
