import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { ParsedUrlQuery } from "querystring";

import { useEffect, useState } from "react";
import { RepositoryList } from "../../components/Repository/RepositoryList";
import data from "../../data/data.json";
import { useAppData } from "../../hooks/useAppData";
import { Repository } from "../../types";

interface Params extends ParsedUrlQuery {
  tag: string;
}

type TagProps = {
  tag: Params["tag"];
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  return {
    paths: data.tags.map((tag) => ({
      params: { tag: tag.id }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<TagProps, Params> = async ({
  params = {} as Params
}) => {
  return {
    props: { tag: params.tag }
  };
};

export default function Tag({ tag }: TagProps) {
  const { tags, filterByTag } = useAppData();
  const activeTag = tags.find((t) => t.id === tag);
  const pageTitle = `First Issue | Tag ${activeTag?.display}`;
  const [filteredRepositories, setFilteredRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    // Filter repositories when the component mounts or when the tag changes
    if (tag) {
      const filtered = filterByTag(tag);
      setFilteredRepositories(filtered);
    }
  }, [tag]);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <RepositoryList repositories={filteredRepositories} />
    </>
  );
}
