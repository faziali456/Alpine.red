////////////////////////Import for Menu//////////////////////////////////
import React from 'react';
import { withRouter } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
/////////////////////////////Import for Side Bar////////////////////////
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
///////////////////////////////////////For Dialog//////////////////////////
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SignUpForm from '../../SignUp';
import SignInForm from '../../SignIn';
import TextField from '@material-ui/core/TextField';

/////////////////////////////Start Rendering//////////////////////////////////////
import { TransitionProps } from '@material-ui/core/transitions';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    paper: { 
      borderRadius: 30
     },
     sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: '#3399ff',
    },
  }),
);
function ButtonAppBar(props: any) {
  const classes = useStyles();
  const closeImg = {
      cursor:'pointer',
      float:'right', 
      marginTop: '5px',
    } as React.CSSProperties;
  
  //Set State for controlling sidebar "show/hide" functionality 
  const [state, setState] = React.useState({
    isOpenSidebar: false,
    });

  
  //Set State for controlling Dialog "show/hide" & sizes functionality   
  const [OpenDialog, setOpenDialog] = React.useState(false);
  const [OpenSIDialog, setOpenSIDialog] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps['maxWidth']>('sm');
  
  //funtion to change sidebar state
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    
    setState({ ...state, isOpenSidebar: open });
  }; 

  //this function contain sidebar list
  const sideList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer( false)}
      onKeyDown={toggleDrawer(false)}
    >
      
      <List 
          subheader={
                  <ListSubheader component="div" id="nested-list-subheader">
                    Account
                  </ListSubheader>
                }>
        <ListItem button key="SignIn" onClick={redirectToSignIn}>
            <ListItemIcon>{2 % 2 === 0 ? <Icon>https </Icon> : <MenuIcon />}</ListItemIcon>
            <ListItemText primary="Sign In" />
        </ListItem>
        <ListItem button key="SignUp" onClick={redirectToSignUp}>
          <ListItemIcon>{2 % 2 === 0 ? <Icon>how_to_reg </Icon> : <MenuIcon />}</ListItemIcon>
          <ListItemText primary="Sign Up" />
        </ListItem>
      </List >
      <Divider />
    </div>
  );
  
  //Show and hide dialoge box
  const toggleDialog= (open: boolean)  => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    setOpenDialog(open);
  }
  const toggleSIDialog= (open: boolean)  => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    setOpenSIDialog(open);
  }
  function redirectToSignUp(){
    props.history.push('/signup');
  }

  function redirectToSignIn(){
    props.history.push('/signin');
  }

  //render top nav bar
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <div className={classes.sectionMobile}>
              <IconButton
                aria-label="Show more"
                aria-haspopup="true"
                onClick={toggleDrawer(true)}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </div>
          <Typography variant="h6" className={classes.title}>
            Alpine<span style={{color:'red'}}>.red</span>
          </Typography>
          <div className={classes.sectionDesktop}>
            <Button color="inherit" onClick={toggleDialog(true)}>Sign Up</Button>
            <Button color="inherit" onClick={toggleSIDialog(true)}>Sign In</Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer open={state.isOpenSidebar} onClose={toggleDrawer(false)}>
        {sideList()}
      </Drawer>
      <Dialog
        open={OpenDialog}
        onClose={toggleDialog(false)}
        TransitionComponent={Transition}
        aria-labelledby="sign-up-dialog-title"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        classes={{ 
          paper: classes.paper 
        }}
      >
        <DialogContent>
          <DialogContentText>
          <IconButton aria-label="Close" className={classes.closeButton} onClick={toggleDialog(false)}>
            <CloseIcon />
          </IconButton>
          <SignUpForm />      
          </DialogContentText>
        </DialogContent>
      </Dialog>
      <Dialog
        open={OpenSIDialog}
        onClose={toggleSIDialog(false)}
        TransitionComponent={Transition}
        aria-labelledby="sign-up-dialog-title"
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        classes={{ 
          paper: classes.paper 
        }}
      >

        <DialogContent>
          <DialogContentText>
          <IconButton aria-label="Close" className={classes.closeButton} onClick={toggleSIDialog(false)}>
            <CloseIcon />
          </IconButton>
          <SignInForm />      
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withRouter(ButtonAppBar);
