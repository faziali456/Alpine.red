import React from 'react';
import { Link } from 'react-router-dom';
import SignOutLinks from './HeaderLinks/signOutLink';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

//if user loggin it see these links
const NavigationAuth = ({ authUser }) => (
  <div>
    <nav className="nav-wrapper blue darken-2">
      <div className="container">
          <div className="brand-logo">Alpine.<span style={{color: 'red'}}>red</span></div>
          <ul className="right hide-on-med-and-down">
            <li>
              <Link to={ROUTES.LANDING}>Landing</Link>
            </li>
            <li>
              <Link to={ROUTES.HOME}>Home</Link>
            </li>
            <li>
              <Link to={ROUTES.ACCOUNT}>Account</Link>
            </li>
            {authUser.roles.includes(ROLES.ADMIN) && (
              <li>
                <Link to={ROUTES.ADMIN}>Admin</Link>
              </li>
            )}
            <li>
              <SignOutButton />
            </li>
          </ul>
      </div>
    </nav>
    <ul class="sidenav" id="mobile-demo">
        <li>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        {authUser.roles.includes(ROLES.ADMIN) && (
          <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
          </li>
        )}
        <li>
          <SignOutButton />
        </li>
    </ul>
  </div>
);
//if user not loggin or by default see these links
const NavigationNonAuth = () => (
  <div>
    <nav className="nav-wrapper blue darken-2">
      <div className="container">
          <div className="brand-logo">Alpine.<span style={{color: 'red'}}>red</span></div>
          <SignOutLinks></SignOutLinks>
      </div>
    </nav>
  </div>
);

export default Navigation;
