import React from 'react';
import {Link} from 'react-router-dom';

function NotFound() {
    return (
        <div>
            <h1>Oops ! Error 404</h1>
            <h2>Page Not Found</h2>
            <h6>Go Back To <Link to="/">Home</Link></h6>
        </div>
    )
}

export default NotFound
