import React from "react";
import SearchBar from "./../searchBar/SearchBar";
import Data from "../data/Data";

function Search(props) {
  const {
    editConfiguration,
    resetSearch,
    searchList,
    aggregations,
    toggleFilterStatus,
    resetFilters,
    searchFilters,
    searchkeyword,
    searchLoading,
    fetchData,
    setSearchValues,
    totalHits,
    hits,
    getPagedResults,
    recordsPerPage
  } = props;

  return (
    <div>
      <SearchBar
        editConfiguration={editConfiguration}
        resetSearch={resetSearch}
        searchList={searchList}
        fetchData={fetchData}
        setSearchValues={setSearchValues}
      />
      <Data
        searchLoading={searchLoading}
        searchkeyword={searchkeyword}
        aggregations={aggregations}
        toggleFilterStatus={toggleFilterStatus}
        resetFilters={resetFilters}
        searchFilters={searchFilters}
        totalHits={totalHits}
        hits={hits}
        getPagedResults={getPagedResults}
        recordsPerPage={recordsPerPage}
      />
    </div>
  );
}

export default Search;
