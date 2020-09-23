import React, { useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import styles from "./UserButton.module.scss";

/**
 *
 * @version
 * @author: ambily.tv
 * @create date: 2020-03-10
 *
 * Custom button with loading, disabled on api call.
 */

function UserButton(props) {
  const loading = props.loading;

  useEffect(() => {}, [loading]);

  return (
    <Button
      className={props.className}
      variant={props.variant}
      size={props.size}
      disabled={loading}
      onClick={!loading ? props.onClick : null}
    >
      {props.label}
      {loading ? (
        <Spinner className={styles.userSpinner} animation="border" />
      ) : (
        ""
      )}
    </Button>
  );
}

export default UserButton;
