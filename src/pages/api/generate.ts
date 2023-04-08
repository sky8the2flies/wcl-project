// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const {
    body,
  }: {
    body: {
      reports: string[];
    };
  } = req;

  const apiKey = process.env.NEXT_PUBLIC_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_WCL_BASE_URL;
  const wowheadBaseUrl = process.env.NEXT_PUBLIC_WOWHEAD_BASE_URL;

  body.reports.forEach(async (report) => {
    const logID = report;
    const apiKeyString = `?translate=true&api_key=${apiKey}`;
    const urlAllPlayers = `${baseUrl}report/tables/casts/${logID}${apiKeyString}&start=0&end=999999999999`;
    const urlAllFights = `${baseUrl}report/fights/${logID}${apiKeyString}`;
    const urlAllZones = `${baseUrl}zones${apiKeyString}`;
    const allFights = await axios.get(urlAllFights);
    const allZones = await axios.get(urlAllZones);
    const allPlayers = await axios.get(urlAllPlayers);

    // console.log("allPlayers", allPlayers.data.entries[0]);
  });

  res.status(200).json({ name: "John Doe" });
}
