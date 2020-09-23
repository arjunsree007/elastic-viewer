import React from "react";
import { Route } from "react-router-dom";
import Header from "../components/header/Header";
import Snackbar from "../components/snackbar/Snackbar";
import Footer from "./../components/Footer/Footer";
import styles from "./DefaultLayout.module.scss";

const DefaultLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <div>
          <div className="p-2 px-md-4  bg-white border-bottom shadow-sm">
            <Header />
          </div>

          <div style={{minHeight: "70vh"}} className="container-xl">
          <Component {...matchProps} />
          </div>
          <Snackbar />
          <div className={styles.bgTheme}>
          <Footer />
          </div>
        </div>
      )}
    />
  );
};

export default DefaultLayout;
