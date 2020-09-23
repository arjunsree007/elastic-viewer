import React from "react";
import Filters from "./Filters";
import DataDisplay from "./DataDisplay";

function Data(props) {
  const {
    aggregations,
    toggleFilterStatus,
    resetFilters,
    searchFilters,
    searchkeyword,
    searchLoading,
    totalHits,
    hits,
    getPagedResults,
    recordsPerPage
  } = props;
  return (
    <div className="row">
      {aggregations && aggregations.length > 0 && (
        <div className="col-md-3">
          <Filters
            aggregations={aggregations}
            toggleFilterStatus={toggleFilterStatus}
            resetFilters={resetFilters}
            searchFilters={searchFilters}
          />
        </div>
      )}
      <div
        className={
          aggregations && aggregations.length > 0 ? "col-md-9" : "col-md-12"
        }
      >
        <DataDisplay
          totalHits={totalHits}
          searchkeyword={searchkeyword}
          searchLoading={searchLoading}
          hits={hits}
          getPagedResults={getPagedResults}
          recordsPerPage={recordsPerPage}
        />
      </div>
    </div>
  );
}

export default Data;
