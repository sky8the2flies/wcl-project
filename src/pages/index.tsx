import { LoadReports } from "@/components/LoadReports/LoadReports";
import { Container, Space } from "@mantine/core";

export default function Home() {
  return (
    <>
      <Space h="xs" />
      <Container>
        <LoadReports />
      </Container>
    </>
  );
}
