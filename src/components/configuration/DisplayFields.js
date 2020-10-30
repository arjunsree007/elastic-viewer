import React, { useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import styles from "./Fields.module.scss";

function DisplayFields(props) {
  const { displayList, selectAllDisplays, changeDisplayConfig } = props;

  function handleChange(event) {
    const { name } = event.target;
    changeDisplayConfig(name);
  }

  useEffect(() => {}, [props.displayList]);

  return (
    <>
      {displayList.length > 0 && (
        <Form.Group as={Row}>
          <Col>
            <Form.Check
              name="selectAll"
              className="text-muted"
              type="checkbox"
              id={"selectAll_display"}
              label="Select All"
              checked={selectAllDisplays}
              onChange={event => handleChange(event)}
            />
          </Col>
        </Form.Group>
      )}
      <Form className={styles.fieldsForm}>
        {displayList.length > 0 &&
          displayList.map((item, i) => (
            <Form.Group as={Row} key={i}>
              <Col>
                <Form.Check
                  name={item[0]}
                  type="checkbox"
                  id={item[0] + "_display"}
                  label={item[0]}
                  checked={item[2].checked}
                  onChange={event => handleChange(event)}
                />
              </Col>
            </Form.Group>
          ))}
      </Form>
    </>
  );
}

export default DisplayFields;
