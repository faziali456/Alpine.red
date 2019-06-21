import React, { Component } from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  username: '',
  phoneNo: '',
  lastName: '',
  city: '',
  state: '',
  zipCode: '',
  alpineActivities: '',
  bio: '',
  photoUrl: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      ...INITIAL_STATE
    }
     this.props.firebase
     .user(this.props.uid).on('value', snapshot => {
      const Object = snapshot.val();
      
      if (Object) {
        this.setState({
          username: Object.username.val,
          phoneNo: Object.phoneNo.val,
          lastName: Object.lastName.val,
          city: Object.city.val,
          state: Object.state.val,
          zipCode: Object.zipCode.val,
          alpineActivities: Object.alpineActivities.val,
          bio: Object.bio.val,        });        
  
      } else {
      }
    });
  }

  onSubmit = event => {
    const { passwordOne,username, phoneNo, lastName, city, state, zipCode, alpineActivities, bio, } = this.state;
    
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.props.firebase
          .user(this.props.uid)
          .set({
            username,
            phoneNo,
            lastName,          
            city,
            state,
            zipCode,
            alpineActivities,
            bio,
          })
          .then(() => {
            this.setState({ 
              ...INITIAL_STATE, });
            
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

  render() {
    const { passwordOne, passwordTwo,username, phoneNo, lastName, city, state, zipCode, alpineActivities, bio,photoUrl, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';
    return (
      <div className="container justify-content-center d-flex">
        <div className="signup_form border p-3 mt-5">
          <h4 className="t_center signup_h4">Update Profile</h4>          
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
              <span className="field_span">Name</span>
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
              <span className="field_span">Last Name</span>
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
              <span className="field_span">Phone</span>
            </label>            
            <label className="custom_input_label pure-material-textfield-outlined">
              <input
                name="city"
                value={city}
                onChange={this.onChange}
                type="text"
                placeholder=""
                className="custom_input_field pure-material-textfield-outlined"
              />
              <span className="field_span font-Bitter">City</span>
            </label>
            <label className="custom_input_label pure-material-textfield-outlined">
              <input
                name="state"
                value={state}
                onChange={this.onChange}
                type="text"
                placeholder=""
                className="custom_input_field pure-material-textfield-outlined"
              />
              <span className="field_span font-Bitter">State</span>
            </label>
            <label className="custom_input_label pure-material-textfield-outlined">
              <input
                name="zipCode"
                value={zipCode}
                onChange={this.onChange}
                type="text"
                placeholder=""
                className="custom_input_field pure-material-textfield-outlined"
              />
              <span className="field_span font-Bitter">Zip Code</span>
            </label>
            <label className="custom_input_label pure-material-textfield-outlined">
              <input
                name="alpineActivities"
                value={alpineActivities}
                onChange={this.onChange}
                type="text"
                placeholder=""
                className="custom_input_field pure-material-textfield-outlined"
              />
              <span className="field_span font-Bitter">Interesting Alpine Activities</span>
            </label>
            <label className="custom_input_label pure-material-textfield-outlined">
              <input
                name="bio"
                value={bio}
                onChange={this.onChange}
                type="text"
                placeholder=""
                className="custom_input_field pure-material-textfield-outlined"
              />
              <span className="field_span font-Bitter">Bio</span>
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
              <span className="field_span">New Password</span>
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
              <span className="field_span">Confirm Password</span>
            </label>
            <button type="submit" className="btn btn-block btn-primary"  disabled={isInvalid}>Update</button>
            {error && <p>{error.message}</p>}
          </form>			
        </div>
      </div>
    );
  }
}

export default withFirebase(PasswordChangeForm);
