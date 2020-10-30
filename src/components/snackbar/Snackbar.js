import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { closeSnackbar } from "../../store/actions/SnackbarActions";
import classNames from "classnames";
import styles from "./Snackbar.module.scss";

/**
 *
 * @version
 * @author: sandeep_k
 * @create date: 2020-02-03
 *
 * Snackbar - popup messages -successs and error message popups - edit, add, delete subscription, user, ip details
 */

function Snackbar() {
  const dispatch = useDispatch();
  const message = useSelector(state => state.snackbar.message);
  const snackbarType = useSelector(state => state.snackbar.snackbarType);

  useEffect(() => {
    setTimeout(() => {
      dispatch(closeSnackbar());
    }, 3000);
  }, [message]);

  return message ? (
    <div className={classNames(styles[snackbarType], styles.snackbar)}>
      {snackbarType === "default" ? null : (
        <i className="material-icons">
          {snackbarType === "success" ? "done" : snackbarType}
        </i>
      )}
      {message}
    </div>
  ) : null;
}

export default Snackbar;
