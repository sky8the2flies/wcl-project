import {
  Button,
  Checkbox,
  Flex,
  Pagination,
  Space,
  Table,
} from "@mantine/core";
import moment from "moment";
import { useState } from "react";
import _ from "lodash";
import axios from "axios";

type Report = {
  id: string;
  title: string;
  owner: string;
  start: number;
  end: number;
  zone: number;
};

const MAX_REPORTS_PAGE = 10;

export const ReportsTable = ({ reports }: { reports: Report[] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  return (
    <>
      <Table striped withColumnBorders>
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Title</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(
            (report, idx) =>
              idx >= MAX_REPORTS_PAGE * currentPage - MAX_REPORTS_PAGE &&
              idx < MAX_REPORTS_PAGE * currentPage && (
                <tr key={report.id}>
                  <td>
                    <Checkbox
                      checked={selectedReports.some(
                        (reportId) => reportId === report.id
                      )}
                      onClick={() =>
                        setSelectedReports((oldSelectedReports) =>
                          _.xor(oldSelectedReports, [report.id])
                        )
                      }
                    />
                  </td>
                  <td>{report.id}</td>
                  <td>{report.title}</td>
                  <td>{moment(report.start).format("ddd MMM YYYY")}</td>
                </tr>
              )
          )}
        </tbody>
      </Table>
      <Space h="sm" />
      <Pagination
        value={currentPage}
        onChange={setCurrentPage}
        total={Math.ceil(reports.length / MAX_REPORTS_PAGE)}
      />
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
