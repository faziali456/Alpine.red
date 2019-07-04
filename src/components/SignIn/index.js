import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MButton from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

//Custom Styling
const Styles = theme => ({
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
});
const SignInPage = ( props) => (
  <div className="container">
    <br />
    <h2 className="login-title">Sign In</h2>
    <SignInForm props={props}/>
    <SignInAll />      
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
    console.log(props)
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <form onSubmit={this.onSubmit} style={{margin: '0px 30px 0 30px'}}>
        <TextField
                required
                id="outlined-required"
                label="Email"
                placeholder="email..."
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                name="email"
                value={email}
                onChange={this.onChange}
                InputProps={{
                  classes: {
                    notchedOutline: this.props.props.classes.notchedOutline
                  }
                }} />
          <TextField 
            required
            id="outlined-required"
            label="Password"
            placeholder="password..."
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            type="password"
            name="password"
            value={password}
            onChange={this.onChange}
            InputProps={{
              classes: {
                notchedOutline: this.props.props.classes.notchedOutline
              }
            }} />
        <MButton type="submit" variant="contained" color="primary">
          Sign In
        </MButton>

        {error && <p>{error.message}</p>}
        <br />
        <h2 className="horizontal-line-with-words"><span className="word-span-horizontal-line">or</span></h2>
      </form>
    );
  }
}

class SignInTwitterGoogleFBBase extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null};
    this.addUser = this.addUser.bind(this);
  }
  
  checkUserExist = (socialAuthUser,provider) =>{
    this.props.firebase.user(socialAuthUser.user.uid).once('value', function(snapshot) {
      if(snapshot.val() !== null){
        console.log(socialAuthUser.user.uid + "----------------User Exist------------------------");
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
      }else{
        try {
          this.addUser(socialAuthUser,provider);  
        } catch (err) {
          console.log(err)
        }
        
      }
    }.bind(this));
  }

  addUser = (socialAuthUser, provider) => {
    console.log(socialAuthUser.user.uid + "----------------User Not Exist------------------------");
    if(provider===1){
      this.props.firebase
        .user(socialAuthUser.user.uid)
        .set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.uid,
          photoUrl: socialAuthUser.user.photoURL,
          phoneNo: '',
          lastName: '',
          city: '',
          state: '',
          zipCode: '',
          alpineActivities: '',
          bio: '',
          roles: [],
        })
        .then(() => {
          this.setState({ error: null });
          this.props.history.push(ROUTES.HOME);
          window.location.reload();
        })
        .catch(error => {
          this.setState({ error });
        });
    }
    else if(provider===2){
      this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.additionalUserInfo.profile.name,
            email: socialAuthUser.additionalUserInfo.profile.email,
            photoUrl: socialAuthUser.additionalUserInfo.profile.picture.data.url,
            phoneNo: '',
            lastName: '',
            city: '',
            state: '',
            zipCode: '',
            alpineActivities: '',
            bio: '',
            roles: [], 
          })          
        .then(() => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.HOME);
        window.location.reload();
        }).catch(error => {
            console.log("User Creation Eror "+error);           
          });
    }
    else if(provider===3){
      this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            photoUrl: socialAuthUser.user.photoURL,
            phoneNo: '',
            lastName: '',
            city: '',
            state: '',
            zipCode: '',
            alpineActivities: '',
            bio: '',
            roles: [],
          })
          .then(() => {
            this.setState({ error: null });
            this.props.history.push(ROUTES.HOME);
            window.location.reload();
          })
          .catch(error => {
            this.setState({ error });
          });
    }  
  }

  submittTwitter = event => {
    this.props.firebase
      .doSignInWithTwitter()
      .then(socialAuthUser => {
        this.checkUserExist(socialAuthUser,1);
      })
      .catch(error => {
        this.setState({ error });
      });
      event.preventDefault();
  }

  submittFB = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        this.checkUserExist(socialAuthUser,2);
      })
      .catch(error => {
        this.setState({ error });
      });
      event.preventDefault();
  }

  submittGoogle = event => {
    
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        this.checkUserExist(socialAuthUser,3);  
      })
      .catch(error => {
        this.setState({ error });
      });
      event.preventDefault();
  }

  render() {
    const { error } = this.state;
    return (
      <div>
        <div className="social-icon-box center-align">
          <div className="margin-right">
            <Fab 
              color="primary" 
              aria-label="Add" 
              onClick={this.submittFB}
              style={{
                borderRadius:'10px',
              }}>
            <i className="fa fa-facebook font-size-30"></i>
            </Fab>
          </div>
          <div className="margin-right">
            <Fab 
              aria-label="Add" 
              onClick={this.submittGoogle}
              style={{
                backgroundColor: "#DC4E41",
                borderRadius:'10px',
              }}>
              <i className="fa fa-google-plus font-size-30"></i>
            </Fab>
          </div>
          <div className="margin-right">
            <Fab 
              aria-label="Add"
              onClick={this.submittTwitter}
              style={{
                backgroundColor: "#33AAF3",
                borderRadius:'10px',
              }}>
              <i className="fa fa-twitter font-size-30"></i>
            </Fab>
          </div>
       	</div>
        {error && <p>{error.message}</p>}
      </div>
    );
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

const SignInAll = compose(
  withRouter,
  withFirebase,
)(SignInTwitterGoogleFBBase);

SignInPage.propTypes = {
  label: PropTypes.string,
  fieldProps: PropTypes.object,
  classes: PropTypes.object.isRequired
}

export default withStyles(Styles)(SignInPage);

export { SignInForm,  SignInAll };
