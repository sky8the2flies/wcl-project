import { Tabs } from "@mantine/core";
import { FindReports } from "./FindReports/FindReports";
import { ManualReports } from "./ManualReports/ManualReports";

export const LoadReports = () => {
  return (
    <Tabs variant="outline" defaultValue="find-reports">
      <Tabs.List>
        <Tabs.Tab value="find-reports">Find Reports</Tabs.Tab>
        <Tabs.Tab value="manual-reports">Manual Reports</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="find-reports" pt="xs">
        <FindReports />
      </Tabs.Panel>

      <Tabs.Panel value="manual-reports" pt="xs">
        {/* <ManualReports /> */}
        TODO
      </Tabs.Panel>
    </Tabs>
  );
};
