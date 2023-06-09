import { Button, Container, Flex, NavLink } from "@mantine/core";
import Link from "next/link";

export const Navigation = () => {
  return (
    <Container
      fluid
      sx={() => ({
        backgroundColor: "transparent",
        padding: 0,
      })}
    >
      <Flex justify="flex-end">
        <Link href="/">
          <Button style={{ borderRadius: 0 }}>HOME</Button>
        </Link>
      </Flex>
    </Container>
  );
};
