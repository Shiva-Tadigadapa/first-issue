import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useAppData } from "../hooks/useAppData"; // Import useAppData
import { RepositorySortOrder } from "../types";


export const SearchBar = ( ) => {
  const [query, setQuery] = useState<string>("");
  const { updateRepositorySortOrder } = useAppData();

  return (
    <div className="relative mt-4 flex  rounded-md">
      <input
        type="text"
        className="block w-full rounded-l-md px-4 py-3 pl-11 text-sm text-secondary"
        onChange={(e) => {
          setQuery(e.target.value);
          updateRepositorySortOrder(RepositorySortOrder.CUSTOM, e.target.value);
        }}
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-4">
        <FontAwesomeIcon icon={faSearch} className={"text-secondary"} />
      </div>

      {query && query !== "" ? (
        <button
          type="button"
          className="text-whitetransition-all inline-flex w-20 flex-shrink-0 items-center justify-center rounded-r-md border border-primary px-4 py-3 text-sm font-semibold transition-all hover:bg-primary"
          onClick={() => {
            updateRepositorySortOrder(RepositorySortOrder.CUSTOM);
          }}
        >
          Search
        </button>
      ) : (
        <button
          type="button"
          className="text-whitetransition-all inline-flex w-20 flex-shrink-0 items-center justify-center rounded-r-md border border-primary px-4 py-3 text-sm font-semibold transition-all hover:bg-primary"
          onClick={() => (
            // updateRepositorySortOrder(RepositorySortOrder.NONE)
            <></>
          )}
        >
          Search
        </button>
      )}
    </div>
  );
};
