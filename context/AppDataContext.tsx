import React, { createContext, useEffect, useState } from "react";
import data from "../data/data.json";
import { AppData, CountableTag, Repository, RepositorySortOrder } from "../types";
import { SortPicker } from "../components/Picker/SortPicker";

const DEFAULT_VALUE: AppData = {
  languages: [],
  repositories: [],
  repositorySortOrder: RepositorySortOrder.NONE,
  tags: [],
  // query: "",
  updateRepositorySortOrder: ()=>{} 
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

  useEffect(() => {
    updateRepositoriesOnQueryChange(query);
  }, [query]);

  const updateRepositorySortOrder = (sortOrder: RepositorySortOrder, searchQuery?: string) => {
    console.log("i am in up")
    if (searchQuery !== undefined) {
      setQuery(searchQuery);
      console.log(searchQuery)
    }

    const isSetToDefaultSort = sortOrder === RepositorySortOrder.NONE;
    console.log(isSetToDefaultSort)
    const shouldDeselect = !isSetToDefaultSort && sortOrder === repositorySortOrder;
    console.log(shouldDeselect)

    const finalSortOrder = shouldDeselect ? RepositorySortOrder.NONE : sortOrder;
    console.log(finalSortOrder)
    console.log(sortOrder)

    setRepositorySortOrder(finalSortOrder);
    updateRepositoriesOnSortChange(finalSortOrder);
    // updateRepositoriesOnQueryChange(query);
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

    // console.log(query)
    if (sortOrder === RepositorySortOrder.CUSTOM) {
      updatedRepositories = [...allRepositories].filter((currentRepository) => {
        return currentRepository.name.toLowerCase().includes(query.toLowerCase());
      });
    }

    setRepositories(updatedRepositories);
  };

  const updateRepositoriesOnQueryChange = (query:any) => {
    let updatedRepositories: Repository[] = [];

    if (query !== "") {
      updatedRepositories = [...allRepositories].filter((currentRepository) => {
        return currentRepository.name.toLowerCase().includes(query.toLowerCase());
      });
    } 

    setRepositories(updatedRepositories);
  }

  const value = {
    languages,
    repositories,
    repositorySortOrder,
    tags,
    query,
    updateRepositorySortOrder
    // updateRepositoriesOnQueryChange,
  };

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
};

export { AppDataContext, AppDataProvider };
