import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

let signInBtnDesign={
  marginRight: '10px'
};
const SignInPage = () => (
  <div>
    <h4 className="t_center signup_h4">SignIn</h4>
    <p>Please sign in</p>
    <SignInForm />
    <div className="or d_center">
        <h6 className="text-center or_div">OR Sign in With</h6>
    </div>
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
      <form onSubmit={this.onSubmit}>
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
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder=""
            className="custom_input_field pure-material-textfield-outlined"
          />
          <span className="field_span font-Bitter">Password</span>
        </label>
        <button disabled={isInvalid} type="submit" className="btn waves-effect waves-light singup_button_custome font-Bitter">
          Sign In
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            roles: [],
          })
          .then(() => {
            this.setState({ error: null });
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

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Google</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.additionalUserInfo.profile.name,
            email: socialAuthUser.additionalUserInfo.profile.email,
            roles: [],
          })
          .then(() => {
            this.setState({ error: null });
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

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Facebook</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInTwitterBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithTwitter()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.additionalUserInfo.profile.name,
            email: socialAuthUser.additionalUserInfo.profile.email,
            roles: [],
          })
          .then(() => {
            this.setState({ error: null });
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
  submittTwitter = () => {
    alert('Twitter');
  }
  submittFB = () => {
    alert('FB');
  }
  submittGoogle = () => {
    alert('Google');
  }
  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <button type="submit">Sign In with Twitter</button>
        {error && <p>{error.message}</p>}
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
        <div className="w-50 social py-4">
				<div className="social_links justify-content-around d-flex">
					<i className="fab fa-facebook-square" onClick={this.submittFB} style={signInBtnDesign}></i>
					<i className="fab fa-google-plus-square" onClick={this.submittGoogle} style={signInBtnDesign}></i>
					<i className="fab fa-twitter-square" onClick={this.submittTwitter} ></i>
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

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

const SignInFacebook = compose(
  withRouter,
  withFirebase,
)(SignInFacebookBase);

const SignInTwitter = compose(
  withRouter,
  withFirebase,
)(SignInTwitterBase);

const SignInAll = compose(
  withRouter,
  withFirebase,
)(SignInTwitterGoogleFBBase);

export default SignInPage;

export { SignInForm, SignInGoogle, SignInFacebook, SignInTwitter };
