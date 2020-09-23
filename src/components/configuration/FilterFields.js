import React, { useEffect,useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import styles from "./Fields.module.scss";

function FilterFields(props) {
  const { filterList, changeFilterConfig } = props;
  const [totalCheck, setTotalCheck] = useState(0);

  function handleChange(event) {
    const { name } = event.target;

   // if (name.checked && totalCheck < 5) {
      changeFilterConfig(name);
    //}


  }

  const isDisabled = (item) =>  {
    if(item.checked) {
      return false
    } else if ( totalCheck >= 5) {
      return true
    } else {
      return false
    }
   
  }

  useEffect(() => {
    var totalChecked = 0;

    filterList.forEach((item) => {

      item.forEach((row) => {
        if(row.checked) {
          totalChecked++;
        }
       });
    });

    setTotalCheck(totalChecked);

  }, [filterList]);

  return (
    <>
      {filterList.length > 0 && (
        <Form.Group as={Row}>
          <Col>
            {" "}
            <small className="text-primary form-text">
              <i className="fas fa-lightbulb"></i> Select upto 5 filters.
            </small>
          </Col>
        </Form.Group>
      )}
      <Form className={styles.fieldsForm}>
        {filterList.length > 0 &&
          filterList.map((item, i) => (
            <Form.Group as={Row} key={i}>
              <Col>
                <Form.Check
                  name={item[0].field}
                  type="checkbox"
                  id={item[0].field + "_filter"}
                  label={item[0].field}
                  checked={item[1].checked}
                  disabled={isDisabled(item[1])}
                  onChange={event => handleChange(event)}
                />
              </Col>
            </Form.Group>
          ))}
      </Form>
    </>
  );
}

export default FilterFields;
