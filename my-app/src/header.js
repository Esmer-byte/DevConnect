import React from 'react';
import { Link } from 'react-router-dom';

function Header(){
    return(
        <div>
            <ul>
                <li>
                    <Link to="/Login">Login</Link>
                </li>
                <li>
                    <Link to="/Register">Register</Link>
                </li>
            </ul>
        </div>
        
    );
}

export default Header;