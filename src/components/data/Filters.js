import React, { useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import styles from "./Filters.module.scss";
import Button from "react-bootstrap/Button";

function Filters(props) {
  const {
    aggregations,
    toggleFilterStatus,
    resetFilters,
    searchFilters
  } = props;

  function handleChange(event, aggr) {
    const { name } = event.target;
    toggleFilterStatus(name, aggr);
  }

  function searchFilterResults(event) {
    event.preventDefault();
    searchFilters();
    window.scrollTo(0, 0);
  }

  function resetFilterList(event) {
    event.preventDefault();
    resetFilters();
    window.scrollTo(0, 0);
  }

  useEffect(() => {}, [aggregations]);

  return (
    <>
      {aggregations && aggregations.length > 0 && (
        <div className="text-center">
          <Button
            className="my-2"
            block
            size="sm"
            variant="primary"
            type="submit"
            onClick={event => searchFilterResults(event)}
          >
            <i className="fas fa-check"> Apply Filters</i>
          </Button>

          <Button
            className="my-2"
            size="sm"
            block
            variant="secondary"
            type="submit"
            onClick={event => resetFilterList(event)}
          >
            <i className="fas fa-times"> Clear Filters</i>
          </Button>
        </div>
      )}
      {aggregations &&
        aggregations.length > 0 &&
        aggregations.map((item, i) => (
          <div className="row mb-2" key={i}>
            <div className="col-md-12">
              <div className=" card card-body">
                <strong className="mb-2">
                  Filter by <i>{item[0]}</i>
                </strong>
                <Form className={styles.filterForm}>
                  {item[1].buckets.length > 0 ? (
                    item[1].buckets.map((bucket, j) => (
                      <Form.Group as={Row} key={j}>
                        <Col>
                          <Form.Check
                            id={bucket.key + "_bucket"}
                            name={bucket.key}
                            type="checkbox"
                            label={bucket.key + " (" + bucket.doc_count + ")"}
                            checked={bucket.checked}
                            onChange={event => handleChange(event, item[0])}
                          />
                        </Col>
                      </Form.Group>
                    ))
                  ) : (
                    <Form.Group as={Row}>
                      <Col>
                        {" "}
                        <Form.Label>No filters found</Form.Label>
                      </Col>
                    </Form.Group>
                  )}
                </Form>
              </div>
            </div>
          </div>
        ))}

      {aggregations && aggregations.length > 0 && (
        <div className="text-center">
          <Button
            className="my-2"
            block
            size="sm"
            variant="primary"
            type="submit"
            onClick={event => searchFilterResults(event)}
          >
            <i className="fas fa-check"> Apply Filters</i>
          </Button>

          <Button
            className="my-2"
            block
            size="sm"
            variant="secondary"
            type="submit"
            onClick={event => resetFilterList(event)}
          >
            <i className="fas fa-times"> Clear Filters</i>
          </Button>
        </div>
      )}
    </>
  );
}

export default Filters;
