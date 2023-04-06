import { regionDataSet, serverDataSet } from "@/data/WoWServerData";
import { NativeSelect, Space, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import axios from "axios";
import { useEffect, useState } from "react";
import { ReportsTable } from "./ReportsTable/ReportsTable";
import { TableSkeleton } from "./TableSkeleton/TableSkeleton";

type FormProps = {
  region: "US" | "EU";
  serverSlug: string;
  guildName: string;
};

export const FindReports = () => {
  const [reports, setReports] = useState([]);
  const [loadingReports, setLoadingReports] = useState(false);
  const form = useForm<FormProps>({
    initialValues: { region: "US", serverSlug: "whitemane", guildName: "" },
  });

  const [debGuildName] = useDebouncedValue(form.values.guildName, 800);
  const [debRegion] = useDebouncedValue(form.values.region, 800);
  const [debServerSlug] = useDebouncedValue(form.values.serverSlug, 800);

  useEffect(() => {
    if (!debGuildName || !debRegion || !debServerSlug) return;
    const fetchData = async () => {
      const { data } = await axios.post("/api/findReports", {
        region: debRegion,
        guildName: debGuildName,
        serverSlug: debServerSlug,
      });
      setReports(data);
      setLoadingReports(false);
    };
    setLoadingReports(true);
    fetchData();
  }, [debGuildName, debRegion, debServerSlug]);

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextInput
          withAsterisk
          label="Guild Name"
          placeholder="Your Guild"
          {...form.getInputProps("guildName")}
        />
        <Space h="sm" />
        <NativeSelect
          data={regionDataSet}
          label="Server Region"
          radius="xs"
          withAsterisk
          {...form.getInputProps("region")}
        />
        <Space h="sm" />
        <NativeSelect
          data={serverDataSet[form.values.region]}
          label="Server Name"
          radius="xs"
          withAsterisk
          {...form.getInputProps("serverSlug")}
        />
      </form>
      <Space h="sm" />
      {loadingReports && <TableSkeleton />}
      {reports.length > 0 && <ReportsTable reports={reports} />}
    </>
  );
};
