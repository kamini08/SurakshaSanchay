// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// const getItem = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { itemId } = req.query;

//   try {
//     const item = await prisma.inventoryItem.findUnique({
//       where: { itemId: String(itemId) },
//     });

//     if (!item) {
//       return res.status(404).json({ error: 'Item not found' });
//     }

//     return res.status(200).json(item);
//   } catch (error) {
//     return res.status(500).json({ error: 'Failed to fetch item details' });
//   }
// };

// export default getItem;
// 'use client';
// import { NextApiRequest, NextApiResponse } from 'next';

// // API Handler
// export default async function handler(
//   req: NextApiRequest, 
//   res: NextApiResponse
// ) {
//   const { id } = req.query;

//   if (!id) {
//     return res.status(400).json({ error: 'Item ID is required' });
//   }

//   // Simulated data retrieval (replace with actual database query logic)
//   const items = [
//     { itemId: '12345', category: 'Electronics', description: 'Laptop', quantity: 10 },
//     { itemId: '67890', category: 'Furniture', description: 'Chair', quantity: 5 },
//   ];

//   const item = items.find((item) => item.itemId === id);

//   if (item) {
//     res.status(200).json(item);
//   } else {
//     res.status(404).json({ error: 'Item not found' });
//   }
// }

// pages/api/getItemDetails.ts

import type { NextApiRequest, NextApiResponse } from 'next';

const itemDatabase = [
  {
    itemId: '123',
    category: 'Electronics',
    description: 'Laptop',
    quantity: 10,
  },
  {
    itemId: '456',
    category: 'Furniture',
    description: 'Office Chair',
    quantity: 5,
  },
  // Add more mock items here
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  const item = itemDatabase.find(item => item.itemId === id);

  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
}
