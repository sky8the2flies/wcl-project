import { Button, Flex, Grid, Space, TextInput } from "@mantine/core";
import _ from "lodash";
import { useState } from "react";
import { ReportsList } from "./ReportsList/ReportsLIst";

export const ManualReports = () => {
  const [newLog, setNewLog] = useState("");
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  return (
    <>
      <Grid>
        <Grid.Col sm={12} lg={10}>
          <TextInput
            value={newLog}
            onChange={(event) => setNewLog(event.currentTarget.value)}
            label="Log url"
            placeholder="https://classic.warcraftlogs.com/reports/<id>"
          />
        </Grid.Col>
        <Grid.Col sm={12} lg={2}>
          <Flex style={{ height: "100%" }} justify="flex-end" align="flex-end">
            <Button
              disabled={!newLog}
              onClick={() => {
                setSelectedReports((oldSelectedReports) =>
                  _.xor(oldSelectedReports, [newLog])
                );
                setNewLog("");
              }}
              style={{ width: "100%" }}
            >
              Add report
            </Button>
          </Flex>
        </Grid.Col>
      </Grid>
      <Space h="sm" />
      <ReportsList selectedReports={selectedReports} />
    </>
  );
};
