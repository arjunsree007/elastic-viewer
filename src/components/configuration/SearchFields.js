import React, { useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import styles from "./Fields.module.scss";

function SearchFields(props) {
  const { searchList, selectAllSearches, changeSearchConfig } = props;

  function handleChange(event) {
    const { name } = event.target;

    changeSearchConfig(name);
  }

  useEffect(() => {}, [props.searchList]);

  return (
    <>
      {searchList.length > 0 && (
        <Form.Group as={Row}>
          <Col>
            <Form.Check
              name="selectAll"
              className="text-muted"
              type="checkbox"
              id={"selectAll_search"}
              label="Select All"
              checked={selectAllSearches}
              onChange={event => handleChange(event)}
            />
          </Col>
        </Form.Group>
      )}
      <Form className={styles.fieldsForm}>
        {searchList.length > 0 &&
          searchList.map((item, i) => (
            <Form.Group as={Row} key={i}>
              <Col>
                <Form.Check
                  name={item[0].field}
                  type="checkbox"
                  id={item[0].field + "_search"}
                  label={item[0].field}
                  checked={item[1].checked}
                  onChange={event => handleChange(event)}
                />
              </Col>
            </Form.Group>
          ))}
      </Form>
    </>
  );
}

export default SearchFields;
