import React, { createContext, useEffect, useState } from "react";
import data from "../data/data.json";
import { AppData, CountableTag, Repository, RepositorySortOrder } from "../types";

const DEFAULT_VALUE: AppData = {
  languages: [],
  repositories: [],
  repositorySortOrder: RepositorySortOrder.NONE,
  tags: [],
  updateRepositorySortOrder: () => {},
  filterByTag: (tag: any) => [],
  filterByLanguage: (tag: any) => []
};

const AppDataContext = createContext<AppData>(DEFAULT_VALUE);

const AppDataProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    repositories: allRepositories,
    languages,
    tags
  }: {
    repositories: Repository[];
    languages: CountableTag[];
    tags: CountableTag[];
  } = data;

  const [repositories, setRepositories] = useState<Repository[]>(allRepositories);
  const [repositorySortOrder, setRepositorySortOrder] = useState<RepositorySortOrder>(
    RepositorySortOrder.NONE
  );
  const [query, setQuery] = useState<string>("");
  // console.log(repositorySortOrder);

  useEffect(() => {
    if (query !== "") {
      updateRepositoriesOnQueryChange(query);
    } else {
      updateRepositoriesOnSortChange(repositorySortOrder);
    }
  }, [query]);

  const updateRepositorySortOrder = (sortOrder: RepositorySortOrder, searchQuery?: string) => {
    if (searchQuery !== undefined) {
      setQuery(searchQuery);
    }

    const isSetToDefaultSort = sortOrder === RepositorySortOrder.NONE;

    const shouldDeselect = !isSetToDefaultSort && sortOrder === repositorySortOrder;

    const finalSortOrder = shouldDeselect ? RepositorySortOrder.NONE : sortOrder;

    setRepositorySortOrder(finalSortOrder);
    updateRepositoriesOnSortChange(finalSortOrder);
  };

  const updateRepositoriesOnSortChange = (sortOrder: RepositorySortOrder) => {
    let updatedRepositories: Repository[] = [];

    if (sortOrder === RepositorySortOrder.MOST_STARS) {
      updatedRepositories = [...allRepositories].sort((currentRepository, nextRepository) => {
        return nextRepository.stars - currentRepository.stars;
      });
    }
    if (sortOrder === RepositorySortOrder.LEAST_STARS) {
      updatedRepositories = [...allRepositories].sort((currentRepository, nextRepository) => {
        return currentRepository.stars - nextRepository.stars;
      });
    }

    if (sortOrder === RepositorySortOrder.NONE) {
      updatedRepositories = allRepositories;
    }

    if (sortOrder === RepositorySortOrder.CUSTOM) {
      updatedRepositories = [...allRepositories].filter((currentRepository) => {
        return currentRepository.name.toLowerCase().includes(query.toLowerCase());
      });
    }

    setRepositories(updatedRepositories);
  };

  const updateRepositoriesOnQueryChange = (query: any) => {
    let updatedRepositories: Repository[] = [];

    if (query !== "") {
      updatedRepositories = [...allRepositories].filter((currentRepository) => {
        return currentRepository.name.toLowerCase().includes(query.toLowerCase());
      });
    }
    setRepositories(updatedRepositories);
  };

  const filterByTag = (tag: any) => {
    let filteredRepos: Repository[] = [];
    filteredRepos = [...allRepositories].filter((repository) => {
      return repository.tags?.some((t) => t.id === tag);
    });
    return filteredRepos;
  };

  const filterByLanguage = (tag: any) => {
    let filteredRepos: Repository[] = [];
    filteredRepos = [...allRepositories].filter((repository) => {
      return repository.language.id === tag;
    });
    return filteredRepos;
  };

  const value = {
    languages,
    repositories,
    repositorySortOrder,
    tags,
    query,
    updateRepositorySortOrder,
    filterByTag,
    filterByLanguage
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export { AppDataContext, AppDataProvider };
