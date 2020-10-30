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
    core,
    hits,
    exportLoading,
    exportHits,
    getExportData,
    headers,
    exportHeaders,
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
        core={core}
        headers={headers}
        exportHeaders={exportHeaders}
        getExportData={getExportData}
        hits={hits}
        exportLoading={exportLoading}
        exportHits={exportHits}
        getPagedResults={getPagedResults}
        recordsPerPage={recordsPerPage}
      />
    </div>
  );
}

export default Search;
