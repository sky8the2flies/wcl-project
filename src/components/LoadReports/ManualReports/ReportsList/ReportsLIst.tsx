import { Button, Flex, Text } from "@mantine/core";
import axios from "axios";
import { useState } from "react";

export const ReportsList = ({
  selectedReports,
}: {
  selectedReports: string[];
}) => {
  return (
    <>
      {selectedReports.map((report) => (
        <Text fz="xs">{report}</Text>
      ))}
      <Flex justify="flex-end" align="center">
        <Button
          disabled={selectedReports.length <= 0}
          onClick={async () => {
            const data = await axios.post("/api/generate", {
              reports: selectedReports,
            });
          }}
        >
          Generate Data
        </Button>
      </Flex>
    </>
  );
};
