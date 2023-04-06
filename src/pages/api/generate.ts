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
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const {
    body,
  }: {
    body: {
      reports: {
        id: string;
        title: string;
        owner: string;
        start: number;
        end: number;
        zone: number;
      }[];
    };
  } = req;

  const baseUrl = "https://classic.warcraftlogs.com:443/v1/";
  const wowheadBaseUrl = "https://wowhead.com/wotlk/item=";
  const apiKey = "API_KEY";
  body.reports.forEach(async (report) => {
    const logID = report.id;
    const apiKeyString = `?translate=true&api_key=${apiKey}`;
    const urlAllPlayers = `${baseUrl}report/tables/casts/${logID}${apiKeyString}&start=0&end=999999999999`;
    const urlAllFights = `${baseUrl}report/fights/${logID}${apiKeyString}`;
    const urlAllZones = `${baseUrl}zones${apiKeyString}`;
    const allFights = await axios.get(urlAllFights);
    const allZones = await axios.get(urlAllZones);
    const allPlayers = await axios.get(urlAllPlayers);
  });

  // console.log("allZones", allZones.data);
  res.status(200).json({ name: "John Doe" });
}
