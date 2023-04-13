// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Raid } from "@/types/raid";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const blacklistZones = [
  1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012,
  1013, 1014, 1500, 1501, 1502, 1503, 1504, 1505, 1506, 1507,
];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Raid[]>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_WCL_BASE_URL;
  const apiKeyString = `?translate=true&api_key=${apiKey}`;
  const urlAllZones = `${baseUrl}zones${apiKeyString}`;
  const allZones = await axios.get<Raid[]>(urlAllZones);

  const filteredZones = allZones.data.filter(
    (raid) => !blacklistZones.includes(raid.id)
  );

  res.status(200).json(filteredZones);
}
