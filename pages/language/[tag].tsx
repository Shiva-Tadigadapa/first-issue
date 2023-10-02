import Head from "next/head";
import { RepositoryList } from "../../components/Repository/RepositoryList";
import { useAppData } from "../../hooks/useAppData";
import { useRouter } from "next/router"; // Import useRouter to get the tag from the route

export default function Language() {
  const { repositories } = useAppData();
  const router = useRouter();
  const { tag } = router.query; // Get the tag from the route parameters

  return (
    <>
      <Head>
        <title>First Issue | {tag} Language</title>
      </Head>
      <RepositoryList
        repositories={repositories} // Use filtered repositories directly
      />
    </>
  );
}
