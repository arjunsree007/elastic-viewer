import React, { useState, useEffect } from "react";
import { Tabs, Tab, Form, Col, Button, Spinner } from "react-bootstrap";
import SearchFields from "./SearchFields";
import DisplayFields from "./DisplayFields";
import FilterFields from "./FilterFields";

function DataConfiguration(props) {
  const {
    loadingConnection,
    displayList,
    selectAllDisplays,
    changeDisplayConfig,
    filterList,
    changeFilterConfig,
    searchList,
    selectAllSearches,
    changeSearchConfig,
    saveDataConfiguration
  } = props;

  const [key, setKey] = useState("displayConfiguration");

  function saveConfiguration(event) {
    event.preventDefault();
    saveDataConfiguration();
  }

  useEffect(() => {}, [props]);

  return (
    <div className="mt-2">
      {loadingConnection ? (
        <div className="p-5 text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Tabs id="configurationTabs" activeKey={key} onSelect={k => setKey(k)}>
          <Tab eventKey="displayConfiguration" title="Display Configuration">
            <div className="border-left border-right border-bottom p-4">
              <DisplayFields
                displayList={displayList}
                selectAllDisplays={selectAllDisplays}
                changeDisplayConfig={changeDisplayConfig}
              />
            </div>
          </Tab>
          <Tab eventKey="filterConfiguration" title="Filter Configuration">
            <div className="border-left border-right border-bottom p-4">
              <FilterFields
                filterList={filterList}
                changeFilterConfig={changeFilterConfig}
              />
            </div>
          </Tab>
          <Tab eventKey="searchConfiguration" title="Search Configuration">
            <div className="border-left border-right border-bottom p-4">
              <SearchFields
                searchList={searchList}
                selectAllSearches={selectAllSearches}
                changeSearchConfig={changeSearchConfig}
              />
            </div>
          </Tab>
        </Tabs>
      )}
      <Form>
        <Form.Group className="text-center" controlId="formButton">
          <Col sm="12">
            <Button
              className="mt-2"
              size="lg"
              variant="primary"
              type="submit"
              onClick={event => saveConfiguration(event)}
            >
              Submit
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default DataConfiguration;
