import { Group, Skeleton } from "@mantine/core";

export const TableSkeleton = () => {
  return (
    <>
      <Skeleton height={30} radius="sm" />
      <Skeleton height={15} mt={10} radius="sm" />
      <Skeleton height={15} mt={10} radius="sm" />
      <Skeleton height={15} mt={10} radius="sm" />
      <Skeleton height={15} mt={10} radius="sm" />
      <Skeleton height={15} mt={10} radius="sm" />
      <Skeleton height={15} mt={10} radius="sm" />
      <Skeleton height={15} mt={10} radius="sm" />
      <Skeleton height={15} mt={10} radius="sm" />
      <Skeleton height={15} mt={10} radius="sm" />
      <Group>
        <Skeleton width={30} height={25} mt={10} radius="sm" />
        <Skeleton width={30} height={25} mt={10} radius="sm" />
        <Skeleton width={30} height={25} mt={10} radius="sm" />
        <Skeleton width={30} height={25} mt={10} radius="sm" />
        <Skeleton width={30} height={25} mt={10} radius="sm" />
        <Skeleton width={30} height={25} mt={10} radius="sm" />
      </Group>
    </>
  );
};
