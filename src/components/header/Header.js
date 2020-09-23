import React from "react";

/**
 *
 * @version
 * @author: sandeep_k
 * @create date: 2020-02-03
 * @modified by: ambily.tv
 * @modified date:  2020-02-10
 *
 * Header with Elastic UI logo
 */

export default function Header() {
  return (
    <div className="container-xl d-flex flex-column  flex-md-row align-items-center ">
      <h5 className="my-0 mr-md-auto font-weight-normal">
        <img
          style={{ width: "30%" }}
          src={process.env.PUBLIC_URL + "/images/logos/MCLogo2016.png"}
          alt="logo"
        />
        <img
          src={process.env.PUBLIC_URL + "/images/logos/ElasticUiLogo.png"}
          alt="logo"
        />
        Elastic Browsing{" "}
      </h5>

      <nav className="my-2 my-md-0 mr-md-3">
        <a className="p-2 text-dark" href="#">
          Features
        </a>
        <a className="p-2 text-dark" href="#">
          Docs
        </a>
        <a className="p-2 text-dark" href="#">
          FAQ
        </a>
        <a className="p-2 text-dark" href="#">
          Contact us
        </a>
      </nav>
    </div>
  );
}
