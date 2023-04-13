import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type ResData = {
  id: string;
  title: string;
  owner: string;
  start: number;
  end: number;
  zone: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResData[]>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { guildName, serverSlug, region } = req.body;

  const { data } = await axios.get(
    `https://classic.warcraftlogs.com:443/v1/reports/guild/${guildName}/${serverSlug}/${region}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  res.status(200).json(data);
}
