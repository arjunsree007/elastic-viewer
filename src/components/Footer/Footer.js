import React from "react";

/**
 *
 * @version
 * @author: sandeep_k
 * @create date: 2020-01-028
 *
 * Admin page footer with copyright info
 */

export default function Footer() {
  return (
    <footer className="container-xl text-white p-5">
      <div className="row">
        <div className="col-md-4">
          <h4 className="mb-3">Contact Us</h4>

          <div className="text-white mb-3">
            <p>
              # 5, Brigade Seshamahal, Vani Vilas Road, Basavanagudi, Bengaluru
              560004, India
            </p>

            <span>Tel: +91 80 40939957, +91 80 40939693</span>
            <br />
            <span>Email: info@molecularconnections.com</span>

            <div className="mt-3">
              Follow us on
              <a
                className="text-white ml-3 h5"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/company/molecular-connections"
              >
                <i className="fab fa-linkedin" aria-hidden="true"></i>
              </a>
              <a
                className="text-white ml-3 h5"
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/mc_innohub?lang=en"
              >
                <i className="fab fa-twitter" aria-hidden="true"></i>
              </a>
              <a
                className="text-white ml-3 h5"
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.youtube.com/channel/UCaaFJNOH8i91vZXZKPR-u5A"
              >
                <i className="fab fa-youtube" aria-hidden="true"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="row col-md-8">
          <div className="col-md-4">
            <h4 className="mb-3">Services</h4>
            <ul className="list-unstyled text-small">
              <li>
                <a
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://www.molecularconnections.com/?page_id=14326"
                >
                  Literature Curation
                </a>
              </li>
              <li>
                <a
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://www.molecularconnections.com/?page_id=13631"
                >
                  Publishing
                </a>
              </li>
              <li>
                <a
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://www.molecularconnections.com/?page_id=13714"
                >
                  Technology &amp; Big Data
                </a>
              </li>
              <li>
                <a
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://mcresearch.co.in"
                >
                  IP Research
                </a>
              </li>
              <li>
                <a
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://rwe.molecularconnections.com/services/index.php/home"
                >
                  Real World Evidence
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4 className="mb-3">Products</h4>

            <ul className="list-unstyled text-small">
              <li>
                <a
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://www.molecularconnections.com/?page_id=18511#life-sciences12"
                >
                  Life Sciences
                </a>
              </li>
              <li>
                <a
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://www.molecularconnections.com/?page_id=18511#publishing12"
                >
                  Publishing
                </a>
              </li>
              <li>
                <a
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://www.molecularconnections.com/?page_id=18511#ip-research12"
                >
                  IP Research
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4 className="mb-3">Resources</h4>

            <ul className="list-unstyled text-small">
              <li>
                <a
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://www.molecularconnections.com/?page_id=14740"
                >
                  Press Releases
                </a>
              </li>
              <li>
                <a
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://www.molecularconnections.com/?page_id=13915"
                >
                  Case Studies
                </a>
              </li>
              <li>
                <a
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://www.molecularconnections.com/?page_id=13921"
                >
                  Research Publications
                </a>
              </li>
              <li>
                <a
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://www.molecularconnections.com/?page_id=13918"
                >
                  White Papers
                </a>
              </li>
              <li>
                <a
                  className="text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="http://www.molecularconnections.com/?page_id=19861"
                >
                  Events
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
