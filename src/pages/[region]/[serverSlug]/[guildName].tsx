import { useRouter } from "next/router";

export default function Test() {
  const router = useRouter();
  const { region, serverSlug, guildName } = router.query as {
    region: string;
    serverSlug: string;
    guildName: string;
  };

  /* query:
    start: unix timestamp
    end: unix timestamp
   */
  console.log(router.query);

  return <>Hello world</>;
}
