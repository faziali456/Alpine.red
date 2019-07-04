import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MButton from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  control: {
    padding: theme.spacing(2),
  },

});

class PasswordChangeForm extends Component {
  //Init State with user profile
  constructor(props) {
    super(props);
    this.state ={
      INITIAL_STATE,
    }
    this.FileList=null;
    this.getSetData();
    console.log(props);
}
  
  handleClickOpen =() => {
    
  }

  handleClose = () => {
    
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
      alert("profile updated");

      this.setState({ isInvalid: false, });
    })
    .catch(error => {
      this.setState({ error });
    });
    event.preventDefault();
  };

  onFileButtonClick = (inputValue) => {
    document.getElementById("fileInput").click()
  }

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
    if(this.state.isInvalid) { 
      // if your component doesn't have to wait for an async action, remove this block 
      return (
        <div style={{textAlign:"center"}}><img src="/asset/images/Loading.gif" width="140px" style={{paddingTop:"180px"}}/></div>
      ); // render null when app is not ready
    }
    
    return (
      <div className={this.props.classes.root}>
        <h2 className="login-title">Update Profile</h2>
        <div style={{textAlign: 'center'}}>
          <img src={photoUrl} alt="Logo" width="150px" style={{borderRadius: "55%"}}/>
          <a style={{ position: 'relative', right: '26px'}} href="#" onClick={(event) => this.onFileButtonClick(event)}>edit</a>
        </div>
        
        <input type="file" id="fileInput" onChange={ (e) => this.handleChange(e.target.files) } style={{display:"none"}}/>
        <form onSubmit={this.onSubmit}>
          <Grid container>
              <Grid item xs={12} sm={6}>
                <div style={{padding: '0 22px 0 22px'}}>
                <TextField 
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text" 
                    label="Username"
                    placeholder="Please enter username..."
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      classes: {
                        notchedOutline: this.props.classes.notchedOutline
                      }
                    }}
                    />
                  <TextField 
                    name="phoneNo"
                    value={phoneNo}
                    onChange={this.onChange}
                    type="Number" 
                    label="Phone No"
                    placeholder="phone no..."
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      classes: {
                        notchedOutline: this.props.classes.notchedOutline
                      }
                    }}
                    />      
                  
                  <TextField
                    name="alpineActivities"
                    value={alpineActivities}
                    onChange={this.onChange}
                    type="text"
                    label="Alpine Activities"
                    placeholder="alpine activities..."
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      classes: {
                        notchedOutline: this.props.classes.notchedOutline
                      }
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={12} sm={6}>
                <div style={{padding: '0 22px 0 22px'}}>
                <TextField
                    name="city"
                    value={city}
                    onChange={this.onChange}
                    type="text"
                    label="City"
                    placeholder="city..."
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      classes: {
                        notchedOutline: this.props.classes.notchedOutline
                      }
                    }}
                  />
                <TextField
                    name="state"
                    value={state}
                    onChange={this.onChange}
                    type="text"
                    label="State"
                    placeholder="state..."
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      classes: {
                        notchedOutline: this.props.classes.notchedOutline
                      }
                    }}
                  />
                <TextField
                    name="zipCode"
                    value={zipCode}
                    onChange={this.onChange}
                    type="number"
                    label="Zip Code"
                    placeholder="zipcode..."
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      classes: {
                        notchedOutline: this.props.classes.notchedOutline
                      }
                    }}
                  />
                  <TextField
                  name="bio"
                  value={bio}
                  onChange={this.onChange}
                  type="text"
                  label="Bio"
                  placeholder="bio..."
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    classes: {
                      notchedOutline: this.props.classes.notchedOutline
                    }
                  }}
                />
                </div>
              </Grid>
          </Grid>
          <MButton type="submit" variant="contained" color="primary" style={{marginLeft: '22px'}}>
            Save changes
          </MButton>
          {error && <p>{error.message}</p>}
        </form>
        <Dialog
        open={false}
        keepMounted
        onClose={this.handleClose()}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Confirmation Dialoge"}</DialogTitle>          
          <DialogActions>
            <MButton onClick={this.handleClose()} color="primary">
              Close
            </MButton>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

PasswordChangeForm.propTypes = {
  label: PropTypes.string,
  fieldProps: PropTypes.object,
  classes: PropTypes.object.isRequired
}

export default withFirebase(withStyles(Styles)(PasswordChangeForm));
