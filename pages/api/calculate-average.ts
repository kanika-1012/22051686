import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST method allowed' });
  }
  const { numbers } = req.body;
  if (!Array.isArray(numbers) || numbers.length === 0) {
    return res.status(400).json({ error: '"numbers" must be a non-empty array' });
  }
  const sum = numbers.reduce((acc: number, curr: number) => acc + curr, 0);
  const average = sum / numbers.length;
  res.status(200).json({ average });
}
