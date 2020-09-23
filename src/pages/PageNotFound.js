import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound(){
    return(
        <div className="userform">
            <img className="logo" src="/images/logos/MCLogo.png" alt="logo" />
            <h2>Hey! the page that you are looking is not found</h2>
            <div className="form-footer">
                <span>Click here to back to</span>
                <Link to="/login"> Login</Link>
            </div>
        </div>
    )
}

export default PageNotFound;