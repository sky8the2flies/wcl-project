export type Raid = {
  id: number;
  name: string;
  frozen: boolean;
  encounters: {
    id: number;
    name: string;
  }[];
  brackets: {
    min: number;
    max: number;
    bucket: number;
    type: string;
  };
  partitions: {
    name: string;
    compact: string;
    default?: boolean;
  }[];
};
