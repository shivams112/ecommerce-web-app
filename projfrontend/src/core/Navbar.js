import React from 'react';
import {Link, withRouter} from 'react-router-dom';

const currentTab = (history, path) => {
    if(history.location.pathname === path) {
        return {background: "#FDC006"};
    }
    
}

const Navbar = ({history}) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-green ">
                <li className="nav-item">
                    <Link className="nav-link text-black" style={currentTab(history,"/")} to="/">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-black" style={currentTab(history,"/cart")} to="/cart">
                        Cart
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-black" style={currentTab(history,"/user/dashboard")} to="/user/dashboard">
                        Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-black" style={currentTab(history,"/admin/dashboard")} to="/admin/dashboard">
                        A. Dashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-black" style={currentTab(history,"/signup")} to="/signup">
                        Signup
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-black" style={currentTab(history,"/signin")} to="/signin">
                        Sign In
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-black" style={currentTab(history,"/signout")} to="/signout">
                        Signout
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default withRouter(Navbar);
