import React, { Component } from "react";
import { Link } from 'react-router-dom';
import M from "materialize-css/dist/js/materialize.min.js";
import { BrowserRouter, Route } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import * as ROUTES from '../../../constants/routes';

class Sidebar extends Component {
    componentDidMount() {
        var elem = document.querySelector(".sidenav");
        var instance = M.Sidenav.init(elem, {
            edge: "left",
            inDuration: 250
        });
    }

    render() {
        return (
            <div>
                <ul id="slide-out" className="sidenav">
                    <li>
                        <Link to={ROUTES.SIGN_UP} >Sign Up</Link>
                    </li>
                    <li>
                        <Link to="/signin">Sign In</Link>
                    </li>
                </ul>
                <a href="#" data-target="slide-out" className="sidenav-trigger">
                    <i className="material-icons">menu</i>
                </a>
            </div>
        );
    }
}

export default Sidebar;
