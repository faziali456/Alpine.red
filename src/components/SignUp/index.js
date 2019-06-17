import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const SignUpPage = () => (
  <div>
    <h4  className="t_center signup_h4">SignUp</h4>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  phoneNo: '',
  lastName: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

class SignUpFormBase extends Component {
  
  //class construction
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  //when user press sign up button get all data from input fields and insert into firebase
  onSubmit = event => {
    const { username, phoneNo, lastName, email, passwordOne, isAdmin } = this.state;
    const roles = [];

    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            phoneNo,
            lastName,
            email,
            roles,
          })
          .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
          })
          .catch(error => {
            this.setState({ error });
          });
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      phoneNo,
      lastName,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' || phoneNo === '' ;

    return (
      <form onSubmit={this.onSubmit}>
        <label className="custom_input_label pure-material-textfield-outlined">
          <input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder=""
            className="custom_input_field pure-material-textfield-outlined"
          />
          <span className="field_span font-Bitter">Name</span>
        </label>
        <label className="custom_input_label pure-material-textfield-outlined">
          <input
            name="lastName"
            value={lastName}
            onChange={this.onChange}
            type="text"
            placeholder=""
            className="custom_input_field pure-material-textfield-outlined"
          />
          <span className="field_span font-Bitter">Last Name</span>
        </label>
        <label className="custom_input_label pure-material-textfield-outlined">
          <input
            name="phoneNo"
            value={phoneNo}
            onChange={this.onChange}
            type="text"
            placeholder=""
            className="custom_input_field pure-material-textfield-outlined"
          />
          <span className="field_span font-Bitter">Phone No</span>
        </label>
        <label className="custom_input_label pure-material-textfield-outlined">
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder=""
            className="custom_input_field pure-material-textfield-outlined"
          />
          <span className="field_span font-Bitter">Email</span>
        </label>
        <label className="custom_input_label pure-material-textfield-outlined">
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder=""
            className="custom_input_field pure-material-textfield-outlined"
          />
          <span className="field_span font-Bitter">Password</span>
        </label>
        <label className="custom_input_label pure-material-textfield-outlined">
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder=""
            className="custom_input_field pure-material-textfield-outlined"
          />
          <span className="field_span font-Bitter">Confirm Password</span>
        </label>
        <button 
          disabled={isInvalid}
          type="submit"
          className="btn waves-effect waves-light singup_button_custome font-Bitter">
          Sign Up
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
