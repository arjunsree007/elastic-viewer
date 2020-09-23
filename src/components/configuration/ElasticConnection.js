import React, { useState, useEffect } from "react";
import { Form, Col } from "react-bootstrap";
import CoreListModal from "../../components/modals/CoreListModal";
import UserButton from "../customButtons/UserButton";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function ElasticConnection(props) {
  const {
    fetchCores,
    loadingCoreList,
    connectUrl,
    loadingConnection,
    coreList,
    url,
    password,
    userName,
    core
  } = props;

  const [coreListModal, setCoreListModal] = useState(false);
  const [disableCoreInput, setDisableCoreInput] = useState(true);
  const validUrlRegex = RegExp("https?://.+");
  const [formValues, setFormValues] = useState({
    url: url,
    username: userName,
    password: password,
    core: core
  });
  const [formErrors, setFormErrors] = useState({
    url: "",
    core: ""
  });

  function handleEgClick(event) {
    event.preventDefault();
    setFormValues({ ...formValues, url: "http://139.162.210.220:9201/" });
  }

  function handleChange(event) {
    event.preventDefault();
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });

    switch (name) {
      case "url":
        setFormErrors({
          ...formErrors,
          url:
            value.length > 0
              ? validUrlRegex.test(value.toLowerCase())
                ? ""
                : "Url pattern is wrong"
              : "Url is required."
        });
        value.length > 0
          ? setDisableCoreInput(false)
          : setDisableCoreInput(true);
        break;
      case "core":
        setFormErrors({
          ...formErrors,
          core: value.length > 0 ? "" : "Core is required."
        });
        break;
      default:
        break;
    }
  }

  function validateForm() {
    let urlError = "";
    let coreError = "";

    let valid = false;

    urlError = formValues.url.length === 0 ? "Url is required" : "";
    coreError = formValues.core.length === 0 ? "Core is required" : "";

    if (urlError.length === 0 && coreError.length === 0) valid = true;

    setFormErrors({
      url: urlError,
      core: coreError
    });

    return valid;
  }

  function handleCoreListModalOpen(event) {
    event.preventDefault();
    fetchCores(formValues.url, formValues.username, formValues.password);
    setCoreListModal(true);
  }

  function handleCoreListModalClose() {
    setCoreListModal(false);
  }

  function setCoreToConfigure(val) {
    setFormValues({ ...formValues, core: val });
    setFormErrors({
      ...formErrors,
      core: ""
    });
    setDisableCoreInput(false);
    setCoreListModal(false);
  }

  function connect(event) {
    event.preventDefault();
    if (formErrors.url.length === 0 && formErrors.core.length === 0) {
      if (validateForm()) {
        connectUrl(
          formValues.url,
          formValues.username,
          formValues.password,
          formValues.core
        );
      }
    }
  }

  useEffect(() => {}, []);

  return (
    <div className="bg-light card mt-2 card-body">
      <Form>
        <Form.Row>
          <Form.Group as={Col} md="3" controlId="url">
            <Form.Label>
              Elastic Url<span className="text-danger"> *</span>
            </Form.Label>
            <Form.Control
              name="url"
              size="sm"
              type="url"
              placeholder="Enter Url"
              value={formValues.url}
              onChange={event => handleChange(event)}
            />
            <Form.Text
              className={formErrors.url === "" ? "text-muted " : "text-danger"}
            >
              {formErrors.url === ""
                ? "Url to connect. (format: url:port)"
                : formErrors.url}
            </Form.Text>
            <Form.Label>
              <Link
                style={{ fontSize: "12px" }}
                to="/"
                onClick={event => handleEgClick(event)}
              >
                <i className="fas fa-lightbulb"></i> Try an Example
              </Link>
            </Form.Label>
          </Form.Group>

          <Form.Group as={Col} md="2" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              size="sm"
              type="text"
              placeholder="Enter username"
              value={formValues.username}
              onChange={event => handleChange(event)}
            />
            <Form.Text className="text-muted ">(Optional)</Form.Text>
          </Form.Group>

          <Form.Group as={Col} md="2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              size="sm"
              type="password"
              placeholder="Enter password"
              value={formValues.password}
              onChange={event => handleChange(event)}
            />
            <Form.Text className="text-muted ">(Optional)</Form.Text>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="core">
            <Form.Label>
              Core name<span className="text-danger"> *</span>
            </Form.Label>
            <Form.Control
              name="core"
              size="sm"
              type="text"
              placeholder="Enter core"
              value={formValues.core}
              onChange={event => handleChange(event)}
              disabled={disableCoreInput}
            />
            <Form.Text
              className={formErrors.core === "" ? "text-muted " : "text-danger"}
            >
              {formErrors.core === ""
                ? "Enter core name or choose from the list"
                : formErrors.core}
            </Form.Text>
            <Form.Label>
              <Link to="/" onClick={event => handleCoreListModalOpen(event)}>
                List of cores
              </Link>{" "}
              {loadingCoreList && (
                <Spinner animation="border" variant="primary" size="sm" />
              )}
            </Form.Label>
          </Form.Group>
          <Form.Group
            className="text-center"
            as={Col}
            md="2"
            controlId="submitButton"
          >
            <UserButton
              variant="primary"
              className="mt-4"
              size="lg"
              label="Connect"
              loading={loadingConnection}
              onClick={event => connect(event)}
            />
          </Form.Group>
        </Form.Row>
      </Form>
      {coreList && coreList.length > 0 && (
        <CoreListModal
          openModal={coreListModal}
          title="Available Cores"
          setCoreToConfigure={setCoreToConfigure}
          handleModalClose={handleCoreListModalClose}
          coreList={coreList}
        ></CoreListModal>
      )}
    </div>
  );
}

export default ElasticConnection;
