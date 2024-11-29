// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'PUT') {
//     const { itemId, newLocation } = req.body;

//     try {
//       const updatedDevice = await prisma.inventoryItem.update({
//         where: { itemId },
//         data: { location: newLocation },
//       });

//       res.status(200).json(updatedDevice);
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ error: 'Failed to update location.' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }
// src/app/api/qrscanner/device/updateLocation.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const updateLocation = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    const { itemId, newLocation } = req.body;

    try {
      const updatedDevice = await prisma.inventoryItem.update({
        where: { itemId },
        data: { location: newLocation },
      });

      return res.status(200).json(updatedDevice);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to update location.' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default updateLocation;
