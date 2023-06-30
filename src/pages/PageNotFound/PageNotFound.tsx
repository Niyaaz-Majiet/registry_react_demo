import React from 'react';
import "./PageNotFound.css"


function PageNotFound() {
    return (
        <div className="page-not-found-container">
            <label className="error-text">UNABLE TO LOAD PAGE</label>
            <p className="description">Seems like this page doesnt exist, if you experience any further problems please
                contact our admin team.</p>
        </div>
    );
}

export default PageNotFound;
