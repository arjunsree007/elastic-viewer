import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { CSVLink } from "react-csv";

import Select from "react-select";

function Export(props) {
  const {
    core,
    page,
    headers,
    hits,
    exportLoading,
    exportHits,
    totalHits,
    getExportData
  } = props;
  const [pages, setPages] = useState("");
  const [fromPage, setFromPage] = useState(0);
  const [toPage, setToPage] = useState(0);
  const [pageType, setPageType] = useState("currentPage");
  const [format, setFormat] = useState("csv");
  const [separator, setSeparator] = useState(",");
  const [file, setFile] = useState(core + "_" + page);
  const [filename, setFilename] = useState("");
  const [headerArr, setHeaderArr] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);

  function handleChange(event) {
    const { value } = event.target;
    if (value === "currentPage" || value === "pageWise") {
      setPageType(value);
      if (value === "currentPage") {
        setFromPage(0);
        setToPage(0);
      }
    } else if (value === "csv" || value === "tsv") {
      setFormat(value);
      if (value === "csv") {
        setSeparator(",");
      } else {
        setSeparator("\t");
      }
    }
  }

  function handlePageChange(event) {
    const { name, value } = event.target;
    if (pageType === "pageWise") {
      if (name === "fromPage") {
        setFromPage(value);
      } else if (name === "toPage") {
        setToPage(value);
      }
    } else {
      setFromPage(0);
      setToPage(0);
    }
  }

  const handleMultipleSelect = e => {
    setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
  };

  useEffect(() => {
    if (pageType === "pageWise" && fromPage > 0 && toPage > 0) {
      setPages(fromPage + "-" + toPage);
    } else {
      setPages(String(page));
    }
  }, [page, pageType, fromPage, toPage]);

  useEffect(() => {
    var fromIndex = 0;
    var count = 0;
    if (pageType === "pageWise" || selectedValue.length) {
      if (fromPage > 0 && toPage > 0) {
        fromIndex = (fromPage - 1) * 10;
        count =
          toPage * 10 < totalHits
            ? toPage * 10 - fromIndex
            : totalHits - fromIndex;
      }
      getExportData(fromIndex, count, selectedValue);
    }
  }, [pageType, fromPage, toPage, selectedValue]);

  useEffect(() => {
    setFile(core + "_" + pages);
  }, [core, pages]);

  useEffect(() => {
    if (format === "csv") {
      setFilename(file + ".csv");
    } else {
      setFilename(file + ".tsv");
    }
  }, [format, file]);

  useEffect(() => {
    var headerList = [];
    headers.forEach(function(item) {
      headerList.push({ value: item, label: item });
    });
    setHeaderArr(headerList);
  }, [headers]);

  return (
    <div>
      <Form>
        <fieldset>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2}>
              Page
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="Current page"
                value="currentPage"
                name="currentPage"
                id="formHorizontalRadios1"
                checked={pageType === "currentPage"}
                onChange={event => handleChange(event)}
              />
              <Form.Check
                type="radio"
                label="Page wise"
                value="pageWise"
                name="pageWise"
                id="formHorizontalRadios2"
                checked={pageType === "pageWise"}
                onChange={event => handleChange(event)}
              />
            </Col>
          </Form.Group>
        </fieldset>
        <Form.Group as={Row}>
          <Col sm={2}></Col>
          <Col sm={2}>
            <Form.Control
              size="sm"
              type="text"
              name="fromPage"
              value={fromPage > 0 ? fromPage : ""}
              onChange={event => handlePageChange(event)}
            />
          </Col>
          <Form.Label column sm={1} className="pr-0">
            to
          </Form.Label>
          <Col sm={2} className="pl-0">
            <Form.Control
              className="pl-0"
              size="sm"
              type="text"
              name="toPage"
              value={toPage > 0 ? toPage : ""}
              onChange={event => handlePageChange(event)}
            />
          </Col>
        </Form.Group>
        <fieldset>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2}>
              Format
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                type="radio"
                label="CSV"
                value="csv"
                name="csv"
                id="formHorizontalRadios1"
                checked={format === "csv"}
                onChange={event => handleChange(event)}
              />
              <Form.Check
                type="radio"
                label="TSV"
                value="tsv"
                name="tsv"
                id="formHorizontalRadios2"
                checked={format === "tsv"}
                onChange={event => handleChange(event)}
              />
            </Col>
          </Form.Group>
        </fieldset>
        <Form.Group as={Row} controlId="formHorizontalSelect">
          <Form.Label as="legend" column sm={2}>
            Columns
          </Form.Label>
          <Col sm={6}>
            <Select
              className="dropdown"
              placeholder="All"
              value={headerArr.filter(obj => selectedValue.includes(obj.value))} // set selected values
              options={headerArr} // set list of the data
              onChange={handleMultipleSelect} // assign onChange function
              isMulti
              isClearable
            />
          </Col>
          <Form.Label as="legend" column sm={4}>
            Multiselect (Column list)
          </Form.Label>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 5 }}>
            <CSVLink
              className="btn btn-primary"
              data={
                exportHits.length &&
                (pageType === "pageWise" || selectedValue.length)
                  ? exportHits
                  : hits
              }
              headers={selectedValue.length ? selectedValue : headers}
              separator={separator}
              filename={filename}
            >
              Download
            </CSVLink>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Export;
