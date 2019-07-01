import React, { Component } from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
//Init State
const INITIAL_STATE = {
  username: '',
  phoneNo: '',
  city: '',
  state: '',
  zipCode: '',
  alpineActivities: '',
  bio: '',
  photoUrl: '',
  error: null,
  isInvalid: true,
  loading: false
};

class PasswordChangeForm extends Component {
  //Init State with user profile
  constructor(props) {
    super(props);
    
    this.state ={
      INITIAL_STATE
    }
    this.FileList=null;
    this.getSetData();
  }

  //Init Field
  getSetData = () => {
    this.props.firebase
     .user(this.props.uid).once('value', snapshot => {
      const state = snapshot.val();
      if(state){
        this.setState(state);  
      }      
    });
  }

  //submit Handler
  onSubmit = event => {
    
    const uploadTask = this.props.firebase.image().child(this.FileList[0].name).put(this.FileList[0]);
    
    this.setState({ isInvalid: true });
    
    uploadTask
    .then(uploadTaskSnapshot => {
        return uploadTaskSnapshot.ref.getDownloadURL();
    })
    .then(photoUrl  => {
      this.setState({
        photoUrl
      });

      this.updateProfile();        
    }).then(() => {
      // this.setState({ 
      //   ...INITIAL_STATE, });
      alert('Profile Updated');
      this.setState({ isInvalid: false });
    })
    .catch(error => {
      this.setState({ error });
    });
    event.preventDefault();
  };

  //change listener on every fields 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChange = SelectorFiles =>
  { 
    if(SelectorFiles){
      this.FileList=SelectorFiles;
      this.setState({
        photoUrl: URL.createObjectURL(this.FileList[0])
      });
      console.log(URL.createObjectURL(this.FileList[0]));
    }
  };

  updateProfile = () => {
    const { username, phoneNo, city, state, zipCode, alpineActivities, bio,photoUrl } = this.state;
    this.props.firebase
            .user(this.props.uid)
            .set({
              username,
              phoneNo,
              city,
              state,
              zipCode,
              alpineActivities,
              bio,
              photoUrl
            })
    
  } 

  //Mian 
  render() {
    const { username, phoneNo, city, state, zipCode, alpineActivities, bio,photoUrl, error, isUploading,progress } = this.state;
    if(this.state.isInvalid) { // if your component doesn't have to wait for an async action, remove this block 
      return (
        <div style={{textAlign:"center"}}><img src="/asset/images/Loading.gif" width="140px" style={{paddingTop:"180px"}}/></div>
      ); // render null when app is not ready
    }
    
    return (
      <div className="container justify-content-center d-flex">
        <div className="signup_form border p-3 mt-5">
          <h4 className="t_center" style={{ color: '#16ABE4'}}>Update Profile</h4> 
          <div style={{textAlign: 'center'}}>
          <img src={photoUrl} alt="Logo" width="150px"/>
          </div>
          <form onSubmit={this.onSubmit}>
          <div className="file-field input-field">
            <div className="btn blue darken-1">
              <span>Change Profile Picture</span>
              <input type="file" onChange={ (e) => this.handleChange(e.target.files) } />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
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
                name="phoneNo"
                value={phoneNo}
                onChange={this.onChange}
                type="Number" 
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
            <button type="submit" className=""  disabled={this.state.isInvalid}> Update Profile</button>
            {error && <p>{error.message}</p>}
          </form>			
        </div>
      </div>
    );
  }
}

export default withFirebase(PasswordChangeForm);
