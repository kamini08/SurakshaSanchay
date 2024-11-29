// import { NextApiRequest, NextApiResponse } from 'next';
// // import prisma from '@/lib/prisma'; // Assuming you have this setup

// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { itemId } = req.query; // Access dynamic route parameter

//   if (!itemId || typeof itemId !== 'string') {
//     return res.status(400).json({ error: 'Invalid itemId' });
//   }

//   switch (req.method) {
//     case 'GET':
//       try {
//         const device = await prisma.inventoryItem.findUnique({
//           where: {
//             itemId: itemId, // Query using the itemId
//           },
//           include: {
//             communicationDevice: true, // Include related models as needed
//           },
//         });

//         if (!device) {
//           return res.status(404).json({ error: 'Device not found' });
//         }
//         res.status(200).json(device);
//       } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//       }
//       break;

//     default:
//       res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }
// src/app/api/qrscanner/device/[itemId].ts
'use client';
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { itemId } = req.query;

  if (req.method === 'GET') {
    try {
      const item = await prisma.inventoryItem.findUnique({
        where: { itemId: String(itemId) },  // Find item based on itemId
      });

      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }

      return res.status(200).json(item);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to retrieve item details' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
