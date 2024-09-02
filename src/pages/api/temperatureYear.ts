import { NextApiRequest, NextApiResponse } from "next";
import { getTemperatureDataLastYear } from "@/lib/prisma/getTemperatureData";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await getTemperatureDataLastYear();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
