import React, { useState } from "react";
import Filters from "./Filters";
import DataDisplay from "./DataDisplay";
import Button from "react-bootstrap/Button";
import ExportModal from "./../modals/ExportModal";

function Data(props) {
  const {
    aggregations,
    toggleFilterStatus,
    resetFilters,
    searchFilters,
    searchkeyword,
    searchLoading,
    totalHits,
    core,
    headers,
    exportHeaders,
    getExportData,
    hits,
    exportLoading,
    exportHits,
    getPagedResults,
    recordsPerPage
  } = props;
  const [showFilters, setShowFilters] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalpages, setTotalPages] = useState(0);

  function setPageNum(pageNo) {
    setPage(pageNo);
  }

  function closeFilterPanel() {
    setShowFilters(false);
  }

  function handleExportModalOpen(event) {
    event.preventDefault();
    //	fetchCores(formValues.url, formValues.username, formValues.password);
    setExportModal(true);
  }

  function handleExportModalClose() {
    setExportModal(false);
  }

  return (
    <div className="row">
      {aggregations && aggregations.length > 0 && (
        <div className="col-md-2">
          {!showFilters && (
            <Filters
              aggregations={aggregations}
              toggleFilterStatus={toggleFilterStatus}
              resetFilters={resetFilters}
              searchFilters={searchFilters}
              showFilters={showFilters}
              closeFilterPanel={closeFilterPanel}
            />
          )}
        </div>
      )}
      <div
        className={
          !showFilters && aggregations && aggregations.length > 0
            ? "col-md-10"
            : "col-md-12"
        }
      >
        {aggregations && aggregations.length ? (
          <Button
            className="mr-2 mt-2 mb-2"
            size="sm"
            variant="info"
            type="submit"
            onClick={() => setShowFilters(!showFilters)}
          >
            {!showFilters ? (
              <i className="fas fa-angle-double-left"> Hide Filters</i>
            ) : (
              <i className="fas fa-angle-double-right"> Show Filters</i>
            )}
          </Button>
        ) : (
          ""
        )}

        {hits && hits.length ? (
          <>
            <Button
              className="mt-2 mb-2"
              size="sm"
              variant="primary"
              type="submit"
              onClick={event => handleExportModalOpen(event)}
            >
              <i className="fas fa-file-download"> Export</i>
            </Button>
            <ExportModal
              openModal={exportModal}
              title={"Export (Core: " + core + ")"}
              core={core}
              page={page}
              exportHeaders={exportHeaders}
              hits={hits}
              exportLoading={exportLoading}
              exportHits={exportHits}
              getExportData={getExportData}
              totalHits={totalHits}
              handleModalClose={handleExportModalClose}
            ></ExportModal>
          </>
        ) : (
          ""
        )}

        <DataDisplay
          totalHits={totalHits}
          searchkeyword={searchkeyword}
          searchLoading={searchLoading}
          headers={headers}
          hits={hits}
          getPagedResults={getPagedResults}
          recordsPerPage={recordsPerPage}
          setPageNum={setPageNum}
        />
      </div>
    </div>
  );
}

export default Data;
