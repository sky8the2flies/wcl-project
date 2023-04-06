import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Col,
  Container,
  Form,
  Pagination,
  Row,
  Spinner,
  Stack,
  Table,
} from "react-bootstrap";
import { useDebouncedCallback } from "use-debounce";

const regionDataSet: Array<"US" | "EU"> = ["US", "EU"];

const serverDataSet = {
  US: [
    {
      name: "Whitemane",
      slug: "whitemane",
    },
    {
      name: "Angerforge",
      slug: "angerforge",
    },
    {
      name: "Arugal",
      slug: "arugal",
    },
    {
      name: "Ashkandi",
      slug: "ashkandi",
    },
    {
      name: "Atiesh",
      slug: "atiesh",
    },
    {
      name: "Azuresong",
      slug: "azuresong",
    },
    {
      name: "Benediction",
      slug: "benediction",
    },
    {
      name: "Bloodsail Buccaneers",
      slug: "bloodsail-buccaneers",
    },
    {
      name: "Earthfury",
      slug: "earthfury",
    },
    {
      name: "Eranikus",
      slug: "eranikus",
    },
    {
      name: "Faerlina",
      slug: "faerlina",
    },
    {
      name: "Grobbulus",
      slug: "grobbulus",
    },
    {
      name: "Maladath",
      slug: "maladath",
    },
    {
      name: "Mankrik",
      slug: "mankrik",
    },
    {
      name: "Myzrael",
      slug: "myzrael",
    },
    {
      name: "Old Blanchy",
      slug: "old-blanchy",
    },
    {
      name: "Pagle",
      slug: "pagle",
    },
    {
      name: "Remulos",
      slug: "remulos",
    },
    {
      name: "Skyfury",
      slug: "skyfury",
    },
    {
      name: "Sulfuras",
      slug: "sulfuras",
    },
    {
      name: "Westfall",
      slug: "westfall",
    },
    {
      name: "Windseeker",
      slug: "windseeker",
    },
    {
      name: "Yojamba",
      slug: "yojamba",
    },
  ],
  EU: [
    {
      name: "Amnennar",
      slug: "amnennar",
    },
    {
      name: "Ashbringer",
      slug: "ashbringer",
    },
    {
      name: "Auberdine",
      slug: "auberdine",
    },
    {
      name: "Chromie",
      slug: "chromie",
    },
    {
      name: "Earthshaker",
      slug: "earthshaker",
    },
    {
      name: "Everlook",
      slug: "everlook",
    },
    {
      name: "Firemaw",
      slug: "firemaw",
    },
    {
      name: "Flamegor",
      slug: "flamegor",
    },
    {
      name: "Gehennas",
      slug: "gehennas",
    },
    {
      name: "Giantstalker",
      slug: "giantstalker",
    },
    {
      name: "Golemagg",
      slug: "golemagg",
    },
    {
      name: "Hydraxian Waterlords",
      slug: "hydraxian-waterlords",
    },
    {
      name: "Jin'do",
      slug: "jindo",
    },
    {
      name: "Lakeshire",
      slug: "lakeshire",
    },
    {
      name: "Mandokir",
      slug: "mandokir",
    },
    {
      name: "Mirage Raceway",
      slug: "mirage-raceway",
    },
    {
      name: "Mograine",
      slug: "mograine",
    },
    {
      name: "Nethergarde Keep",
      slug: "nethergarde-keep",
    },
    {
      name: "Patchwerk",
      slug: "patchwerk",
    },
    {
      name: "Pyrewood Village",
      slug: "pyrewood-village",
    },
    {
      name: "Razorfen",
      slug: "razorfen",
    },
    {
      name: "Sulfuron",
      slug: "sulfuron",
    },
    {
      name: "Thekal",
      slug: "thekal",
    },
    {
      name: "Transcendence",
      slug: "transcendence",
    },
    {
      name: "Venoxis",
      slug: "venoxis",
    },
  ],
};

const MAX_REPORTS_PAGE = 13;

export default function Home() {
  const [guildName, setGuildName] = useState("");
  const [region, setRegion] = useState<"US" | "EU">("US");
  const [serverSlug, setServerSlug] = useState("whitemane");

  const [reports, setReports] = useState<{
    data:
      | null
      | {
          id: string;
          title: string;
          owner: string;
          start: number;
          end: number;
          zone: number;
        }[];
    loading: boolean;
  }>({ data: null, loading: false });
  const [reportsPage, setReportsPage] = useState(1);

  const [selectedReports, setSelectedReports] = useState<
    {
      id: string;
      title: string;
      owner: string;
      start: number;
      end: number;
      zone: number;
    }[]
  >([]);

  const getReports = useDebouncedCallback(async () => {
    setReports({ data: null, loading: true });
    setReportsPage(1);
    setSelectedReports([]);
    const { data } = await axios.get(
      `https://classic.warcraftlogs.com:443/v1/reports/guild/${guildName}/${serverSlug}/${region}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    setReports({ data, loading: false });
  }, 1000);

  useEffect(() => {
    if (!guildName || !region || !serverSlug) return;
    getReports();
  }, [guildName, region, serverSlug]);

  const getPaginationItems = () => {
    let arr = [];
    const lastPage = Math.ceil((reports.data?.length || 1) / MAX_REPORTS_PAGE);
    if (reportsPage >= 3) {
      arr.push(<Pagination.First onClick={() => setReportsPage(1)} />);
    }
    let startingNum = reportsPage - 3;
    if (startingNum < 0) startingNum = 0;
    let endingNum = reportsPage <= 3 ? 5 : reportsPage + 2;
    if (endingNum > lastPage) endingNum = lastPage;
    if (endingNum > lastPage - 1 && lastPage - 5 > 0)
      startingNum = lastPage - 5;
    for (let i = startingNum; i < endingNum; i++) {
      arr.push(
        <Pagination.Item
          onClick={() => {
            if (reportsPage !== i + 1) {
              setReportsPage(i + 1);
            }
          }}
          active={i + 1 === reportsPage}
        >
          {i + 1}
        </Pagination.Item>
      );
    }
    if (reportsPage <= lastPage - 3) {
      arr.push(<Pagination.Last onClick={() => setReportsPage(lastPage)} />);
    }
    return arr;
  };

  return (
    <Container className="justify-content-center">
      <Row>
        <Col>
          <Container>
            <Form onSubmit={(e) => e.preventDefault()}>
              <Form.Group>
                <Form.Label>Guild Name</Form.Label>
                <Form.Control
                  onChange={(e) => setGuildName(e.target.value)}
                  type="text"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Server Region</Form.Label>
                <Form.Select>
                  {regionDataSet.map((region) => (
                    <option key={region} onClick={() => setRegion(region)}>
                      {region}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Server Name</Form.Label>
                <Form.Select>
                  {serverDataSet[region].map((server) => (
                    <option
                      key={server.name + server.slug}
                      onClick={() => setServerSlug(server.slug)}
                      value={server.slug}
                    >
                      {server.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Container>

          <Container className="mt-3">
            {reports.loading && (
              <Stack gap={3} direction="horizontal">
                <Spinner animation="border" role="status" />
                <span>Loading reports...</span>
              </Stack>
            )}
            {reports.data && (
              <>
                <Row>
                  <Col>
                    <span>
                      <Button
                        variant="link"
                        onClick={() => setSelectedReports([])}
                        className="mb-0 pb-0 ps-1"
                      >
                        Deselect All
                      </Button>
                    </span>
                  </Col>
                  <Col className="d-flex justify-content-end align-items-end">
                    <Badge
                      bg={selectedReports.length >= 3 ? "danger" : "primary"}
                      className="me-1 mb-1"
                    >
                      {selectedReports.length}/3 Reports selected
                    </Badge>
                  </Col>
                </Row>
                <Table striped bordered size="sm">
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.data.map(
                      (report, idx) =>
                        idx >=
                          MAX_REPORTS_PAGE * reportsPage - MAX_REPORTS_PAGE &&
                        idx < MAX_REPORTS_PAGE * reportsPage && (
                          <tr key={report.id}>
                            <td>
                              <Form.Check
                                checked={selectedReports.some(
                                  (selectedReport) =>
                                    selectedReport.id === report.id
                                )}
                                disabled={
                                  !selectedReports.some(
                                    (selectedReport) =>
                                      selectedReport.id === report.id
                                  ) && selectedReports.length >= 3
                                }
                                type={"checkbox"}
                                onClick={() => {
                                  if (
                                    selectedReports.some(
                                      (selectedReport) =>
                                        selectedReport.id === report.id
                                    )
                                  ) {
                                    setSelectedReports((oldReports) =>
                                      oldReports.filter(
                                        (r) => r.id !== report.id
                                      )
                                    );
                                  } else {
                                    if (selectedReports.length >= 3) {
                                      return;
                                    }
                                    setSelectedReports((oldReports) => [
                                      report,
                                      ...oldReports,
                                    ]);
                                  }
                                }}
                              />
                            </td>
                            <td>{report.id}</td>
                            <td>{report.title}</td>
                            <td>
                              {moment(report.start).format("ddd MMM YYYY")}
                            </td>
                          </tr>
                        )
                    )}
                  </tbody>
                </Table>
                <Row>
                  <Col>
                    <Pagination>{getPaginationItems()}</Pagination>
                  </Col>
                  <Col>
                    <div className="d-flex justify-content-end">
                      <Button
                        onClick={async () => {
                          const data = await axios.post("/api/generate", {
                            reports: selectedReports,
                          });
                        }}
                        disabled={selectedReports.length <= 0}
                      >
                        Generate Data
                      </Button>
                    </div>
                  </Col>
                </Row>
              </>
            )}
          </Container>
        </Col>
      </Row>
    </Container>
  );
}
