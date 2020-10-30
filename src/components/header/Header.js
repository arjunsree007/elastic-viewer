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
    <div className=" d-flex flex-column  flex-md-row align-items-center ">
      <h5 className="my-0 mr-md-auto font-weight-normal">
        <img
          src={process.env.PUBLIC_URL + "/images/logos/ElasticUiLogo.png"}
          alt="elastic-logo"
        />
        Elastic Browsing{" "}
      </h5>
      <a
        className="text-dark h5"
        target="_blank"
        rel="noopener noreferrer"
        href="http://www.molecularconnections.com"
      >
        {" "}
        <img
          src={process.env.PUBLIC_URL + "/images/logos/MCLogo2016.png"}
          alt="mc-logo"
        />
      </a>
    </div>
  );
}
