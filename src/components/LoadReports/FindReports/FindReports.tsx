import { regionDataSet, serverDataSet } from "@/data/WoWServerData";
import {
  Button,
  Flex,
  Loader,
  NativeSelect,
  Space,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDebouncedValue } from "@mantine/hooks";
import axios from "axios";
import { forwardRef, useEffect, useState } from "react";
import { resolve } from "../../../helpers/functions";
import Link from "next/link";
import { Raid } from "@/types/raid";
import { useRaids } from "@/context/RaidContext";

type FormProps = {
  region: "US" | "EU";
  serverSlug: string;
  guildName: string;
  zones: Raid[];
};

type MultiSelectRaid = {
  label: string;
  value: string;
  group: string;
};

export const FindReports = () => {
  const form = useForm<FormProps>({
    initialValues: {
      region: "US",
      serverSlug: "whitemane",
      guildName: "",
      zones: [],
    },
  });

  const { state: raidsState } = useRaids();

  const [isValidSelection, setIsValidSelection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [availableRaids, setAvailableRaids] = useState<MultiSelectRaid[]>([]);

  const [debGuildName] = useDebouncedValue(form.values.guildName, 500);
  const [debRegion] = useDebouncedValue(form.values.region, 200);
  const [debServerSlug] = useDebouncedValue(form.values.serverSlug, 200);

  useEffect(() => {
    setIsValidSelection(false);
  }, [form.values.region, form.values.serverSlug, form.values.guildName]);

  useEffect(() => {
    if (!debGuildName || !debRegion || !debServerSlug) return;
    setIsLoading(true);
    const fetchData = async () => {
      const { error } = await resolve(
        axios.post("/api/reports", {
          region: debRegion,
          guildName: debGuildName,
          serverSlug: debServerSlug,
        })
      );
      setIsLoading(false);
      if (error != null) {
        form.setFieldError(
          "guildName",
          "Unable to find guild in region and server"
        );
        return;
      }
      setIsValidSelection(true);
    };
    fetchData();
  }, [debGuildName, debRegion, debServerSlug]);

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <TextInput
          withAsterisk
          label="Guild Name"
          placeholder="Your Guild"
          rightSection={isLoading && <Loader size="xs" />}
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
        <Space h="sm" />
      </form>
      <Space h="sm" />

      <Flex justify="flex-end">
        {isValidSelection ? (
          <Link
            href={{
              pathname: `/${debRegion}/${debServerSlug}/${debGuildName}`,
              query: {},
            }}
          >
            <Button>Generate Data</Button>
          </Link>
        ) : (
          <Button disabled>Generate Data</Button>
        )}
      </Flex>
    </>
  );
};
