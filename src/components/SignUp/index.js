import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MButton from '@material-ui/core/Button';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import { withFirebase } from '../Firebase';
import { SignInAll } from '../SignIn'
//Static Initial States Bydefault
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

//Custom Styling
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  notchedOutline: {
    borderColor: "#2196f3 !important"
  }
}));

//begin:: sign up form with firebase integration 
function SignUpFormBase(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    ...INITIAL_STATE
  });

  //trigger this method when input field change its state and this method update input field state   
  const onChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });    
  };

  //when user press register my account button get all data from input fields and insert into firebase
  const onSubmit = event => {
    event.preventDefault();
    const { username, phoneNo, email, passwordOne, isAdmin } = values;
    const roles = [];

    if (isAdmin) {
      roles.push(ROLES.ADMIN);
    }

    props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            phoneNo,
            email,
            roles,
          })
          .then(() => {
            setValues({ ...INITIAL_STATE });
            props.history.push(ROUTES.HOME); 
          })
          .catch(error => {
            setValues({ ...values, error });
          });
      })
      .catch(error => {
        setValues({ ...values, error });  
      });
    
  };

  return (
   
    <form onSubmit={onSubmit} style={{margin: '0px 30px 0 30px'}}>
        <h2 className="horizontal-line-with-words"><span className="word-span-horizontal-line">or</span></h2>
        <TextField
          id="outlined-full-width"
          label="Username"
          placeholder="Please enter username..."
          fullWidth
          margin="normal"
          variant="outlined"
          name="username"
          onChange={onChange}
          value={values.username}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline
            }
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          placeholder="Please enter email (Required)..."
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          name="email"
          onChange={onChange}
          value={values.email}
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline
            }
          }}
        />
        <TextField
          id="outlined-full-width"
          label="Phone"
          placeholder="Please enter phone no..."
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          name="phoneNo"
          onChange={onChange}
          value={values.phoneNo}
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline
            }
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Password"
          placeholder="Please enter password here (Required)..."
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          name="passwordOne"
          type="password"
          value={values.passwordOne}
          onChange={onChange}
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline
            }
          }}
        />
        <TextField
          required
          id="outlined-required"
          label="Confirm Password"
          placeholder="Please re-enter password (Required)..."
          fullWidth
          margin="normal"
          variant="outlined"
          InputLabelProps={{
            shrink: true,
          }}
          value={values.passwordTwo}
          name="passwordTwo"
          type="password"
          onChange={onChange}
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline
            }
          }}
        />
        <MButton type="submit" variant="contained" color="primary">
          Register my account
        </MButton>

        {values.error && <p>{values.error.message}</p>}
      </form> 
    );
}
//end:: sign up from with firebase integration

//Sign Up Page for Routing
const SignUpPage = () => (
    <div>
        <h2 className="login-title">SignUp</h2>
        <SignInAll />
        <SignUpForm />
    </div>
  );

const SignUpForm = withRouter(withFirebase(SignUpFormBase));
export default SignUpPage;
