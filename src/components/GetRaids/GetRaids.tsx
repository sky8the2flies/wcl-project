import { Raid } from "@/types/raid";
import axios from "axios";
import { useEffect } from "react";
import { resolve } from "@/helpers/functions";
import { useRaids } from "@/context/RaidContext";

export const GetRaids = () => {
  const { dispatch } = useRaids();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await resolve<Raid[]>(axios.get("/api/zones"));
      if (data == null) return;
      dispatch({ type: "set", payload: data });
    };
    fetchData();
  }, []);

  return <></>;
};
