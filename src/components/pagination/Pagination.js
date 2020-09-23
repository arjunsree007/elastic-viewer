import React, { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./Pagination.module.scss";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

function Pagination(props) {
  const recordsPerPage = props.recordsPerPage;
  const pagesToBeDiplayed = recordsPerPage / 2;
  const navigateHalf = Math.floor(pagesToBeDiplayed / 2);

  const totalRecords = props.totalRecords;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const endPage =
    totalPages - pagesToBeDiplayed + 1 > 0
      ? totalPages - pagesToBeDiplayed + 1
      : totalPages;

  const [startIndex, setStartIndex] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [startRecord, setStartRecord] = useState(1);

  function navigateStartPage(event) {
    if (selectedIndex - navigateHalf < 0) {
      event.preventDefault();
    } else {
      setStartIndex(1);
      setSelectedIndex(1);
      setStartRecord(1);
      props.getSelectedIndex(0);
    }
  }

  function navigateEndPage(event) {
    if (selectedIndex + navigateHalf - 1 > totalPages) {
      event.preventDefault();
    } else {
      setStartIndex(endPage);
      setSelectedIndex(totalPages);
      setStartRecord((totalPages - 1) * 10 + 1);
      props.getSelectedIndex((totalPages - 1) * 10);
    }
  }

  function setSelectedIndexResults(event, index) {
    if (index > 0 && index <= totalPages) {
      if (index - navigateHalf < 0) {
        setStartIndex(1);
        setSelectedIndex(1);
        setStartRecord(1);
        props.getSelectedIndex(0);
      } else {
        if (index - navigateHalf === 0) {
          setStartIndex(1);
        } else if (index + navigateHalf > totalPages) {
          setStartIndex(endPage);
        } else {
          setStartIndex(index - navigateHalf);
        }
        setSelectedIndex(index);
        setStartRecord((index - 1) * 10 + 1);
        props.getSelectedIndex((index - 1) * 10);
      }
    }
  }

  useEffect(() => {
    setStartIndex(1);
    setStartRecord(1);
    setSelectedIndex(1);
  }, [totalRecords]);

  return (
    totalRecords !== 0 && (
      <div className="bg-light card card-body mb-2">
        <Row>
          <Col>
            Showing {startRecord} to{" "}
            {startRecord + recordsPerPage - 1 < totalRecords
              ? startRecord + recordsPerPage - 1
              : totalRecords}{" "}
            of {totalRecords} results
          </Col>
          <Col>
            <div
              className={classNames(styles.pagination, "justify-content-end")}
            >
              <i
                className="fa fa-angle-double-left"
                onClick={event => navigateStartPage(event)}
              ></i>
              <i
                className="fa fa-angle-left"
                onClick={event =>
                  setSelectedIndexResults(event, selectedIndex - 1)
                }
              ></i>
              {Array.from(
                Array(
                  pagesToBeDiplayed < totalPages
                    ? pagesToBeDiplayed
                    : totalPages
                ),
                (e, i) => (
                  <span
                    key={i}
                    className={classNames(
                      "px-2",
                      selectedIndex === startIndex + i
                        ? ("font-weight-bold", styles.active)
                        : null
                    )}
                    onClick={event =>
                      setSelectedIndexResults(event, startIndex + i)
                    }
                  >
                    {startIndex + i}
                  </span>
                )
              )}
              <i
                className="fa fa-angle-right"
                onClick={event =>
                  setSelectedIndexResults(event, selectedIndex + 1)
                }
              ></i>
              <i
                className="fa fa-angle-double-right"
                onClick={event => navigateEndPage(event)}
              ></i>
            </div>
          </Col>
        </Row>
      </div>
    )
  );
}

export default Pagination;
