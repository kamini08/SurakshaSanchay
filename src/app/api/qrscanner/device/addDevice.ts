// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// // Define the types for your incoming request body
// interface AddDeviceRequest {
//   category: 'COMMUNICATION_DEVICES' | 'COMPUTER_AND_IT_EQUIPMENT' | 'NETWORKING_EQUIPMENT' | 'SURVEILLANCE_AND_TRACKING' | 'VEHICLE_AND_ACCESSORIES' | 'PROTECTIVE_GEAR' | 'FIREARMS' | 'FORENSIC' | 'MEDICAL_FIRST_AID' | 'OFFICE_SUPPLIES';
//   type: string;
//   description: string;
//   quantity: number;
//   location: string;
//   userId: string;
// }

// const addDevice = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     const { category, type, description, quantity, location, userId }: AddDeviceRequest = req.body;

//     try {
//       // Ensure you are not passing the `itemId`, as it's auto-generated
//       const newDevice = await prisma.inventoryItem.create({
//         data: {
//           category, // Enum category value directly
//           type,
//           description,
//           quantity,
//           location,
//           userId,
//         },
//       });

//       // Send the newly created item as the response
//       return res.status(201).json(newDevice);
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ error: 'Failed to add the device.' });
//     }
//   } else {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }
// };

// export default addDevice;
// src/app/api/qrscanner/device/addDevice.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const addDevice = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { itemId, category, type, description, quantity, location, condition, acquisitionDate, expiryDate, price, supplier, returnDate, lastInspectionDate, maintenanceSchedule, maintenanceCharge, issuedTo, userId } = req.body;

    try {
      const newDevice = await prisma.inventoryItem.create({
        data: {
          itemId,  // Using provided itemId
          category,
          type,
          description,
          quantity,
          location,
          condition,
          acquisitionDate,
          expiryDate,
          price,
          supplier,
          returnDate,
          lastInspectionDate,
          maintenanceSchedule,
          maintenanceCharge,
          issuedTo,
          userId,
        },
      });

      return res.status(201).json(newDevice);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to add the device.' });
    }
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default addDevice;

