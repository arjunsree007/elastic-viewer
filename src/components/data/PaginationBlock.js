import React, { useEffect, useState } from "react";
import { Pagination, Row, Col } from "react-bootstrap";
import classNames from "classnames";

function PaginationBlock(props) {
  const { totalHits, hits, getPagedResults, recordsPerPage } = props;

  const pagesToBeDiplayed = recordsPerPage / 2;
  const navigateHalf = Math.floor(pagesToBeDiplayed / 2);

  const totalPages = Math.ceil(totalHits / recordsPerPage);
  const endPage =
    totalPages - pagesToBeDiplayed + 1 > 0
      ? totalPages - pagesToBeDiplayed + 1
      : totalPages;

  const [startIndex, setStartIndex] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(1);

  function navigateHalfLeft(event) {
    const localStartIndex = startIndex - navigateHalf;
    if (selectedIndex - pagesToBeDiplayed < 1) {
      setStartIndex(1);
      setSelectedIndex(1);
      getPagedResults(0);
      event.preventDefault();
    } else {
      setStartIndex(localStartIndex);
      setSelectedIndex(localStartIndex + navigateHalf);
      getPagedResults((localStartIndex + navigateHalf - 1) * 10);
    }
  }

  function navigateHalfRight(event) {
    const localStartIndex = startIndex + navigateHalf;
    if (selectedIndex + pagesToBeDiplayed >= totalPages) {
      setStartIndex(endPage);
      setSelectedIndex(totalPages);
      getPagedResults((totalPages - 1) * 10);
      event.preventDefault();
    } else {
      setStartIndex(localStartIndex);
      setSelectedIndex(localStartIndex + navigateHalf);
      getPagedResults((localStartIndex + navigateHalf - 1) * 10);
    }
  }

  function navigateStartPage(event) {
    if (selectedIndex - navigateHalf < 1) {
      event.preventDefault();
    } else {
      setStartIndex(1);
      setSelectedIndex(1);
      getPagedResults(0);
    }
  }

  function navigateEndPage(event) {
    if (selectedIndex + navigateHalf >= totalPages) {
      event.preventDefault();
    } else {
      setStartIndex(endPage);
      setSelectedIndex(totalPages);
      getPagedResults((totalPages - 1) * 10);
    }
  }

  function setSelectedIndexResults(index) {
    if (index - navigateHalf < 1) {
      setStartIndex(1);
    } else if (index + navigateHalf > totalPages) {
      setStartIndex(endPage);
    } else {
      setStartIndex(index - navigateHalf);
    }
    setSelectedIndex(index);
    getPagedResults((index - 1) * 10);
  }

  useEffect(() => {
    setStartIndex(1);
  }, [totalHits]);

  return (
    <div className="bg-light card card-body mb-2">
      
      <div className="container-xl">

      <Row>
        <Col>
          <p className="mt-2">
            Showing {selectedIndex}-
            {hits.length < recordsPerPage
              ? hits.length
              : selectedIndex + recordsPerPage - 1}{" "}
            of {totalHits} hits
          </p>
        </Col>
        <Col>
          <Pagination className="justify-content-end">
            <Pagination.First onClick={event => navigateStartPage(event)} />
            <Pagination.Prev onClick={event => navigateHalfLeft(event)} />
            {Array.from(
              Array(
                pagesToBeDiplayed < totalPages ? pagesToBeDiplayed : totalPages
              ),
              (e, i) => (
                <Pagination.Item
                  key={i}
                  className={classNames(
                    selectedIndex === startIndex + i ? "font-weight-bold" : null
                  )}
                  onClick={() => setSelectedIndexResults(startIndex + i)}
                >
                  {startIndex + i}
                </Pagination.Item>
              )
            )}

            <Pagination.Next onClick={event => navigateHalfRight(event)} />
            <Pagination.Last onClick={event => navigateEndPage(event)} />
          </Pagination>
        </Col>
      </Row>

      </div>
      
   
    </div>
  );
}

export default PaginationBlock;
