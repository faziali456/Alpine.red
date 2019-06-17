import React from 'react';
import SignUpForm from '../../SignUp';
import SignInForm from '../../SignIn';
import { SignUpLink } from '../../SignUp';
import Modal from 'react-modal';
let closeBtn={
    float: 'right'
};
class SignInLink extends React.Component{

    constructor () {
        super();

        this.state = {
          showSignInModal: false,
          showSignUpModal: false
        };
        
        this.handleLogin = this.handleLogin.bind(this);
        this.registerHandler = this.registerHandler.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
        this.closeSignInOpenSignUpForm = this.closeSignInOpenSignUpForm.bind(this);
    }

    handleLogin () {
        this.setState({ showSignInModal: true });
    }
    registerHandler () {
        this.setState({ showSignUpModal: true });
    }
    handleCloseModal () {
        this.setState({ 
            showSignInModal: false,
            showSignUpModal: false
         });
    }
    closeSignInOpenSignUpForm () {
        this.setState({ 
            showSignInModal: false,
            showSignUpModal: true
         });
    }
    render(){
        return (
            <div>
                <ul className="right hide-on-med-and-down">
                    <li><button onClick={this.handleLogin} className="btn btn-dafault">Sign In</button></li>
                    <li><button onClick={this.registerHandler} className="btn btn-default">Sign Up</button></li>
                </ul>
                <Modal
                isOpen={this.state.showSignUpModal}
                contentLabel="Sign Up"
                className="signup_form"
                >
                    <button className="btn-floating btn-small waves-effect waves-light red" onClick={this.handleCloseModal} style={closeBtn}><i className="material-icons">close</i></button>
                    <SignUpForm /> 
                </Modal>
                <Modal
                isOpen={this.state.showSignInModal}
                contentLabel="Sign In"
                className="signup_form"
                >
                    <button className="btn-floating btn-small waves-effect waves-light red" onClick={this.handleCloseModal} style={closeBtn}><i className="material-icons">close</i></button>
                    <SignInForm /> 
                    <p>
                        Don't have an account? <a onClick={this.closeSignInOpenSignUpForm}>Sign Up</a>
                    </p>
                </Modal>
               
            </div>
            
        )
    }
}

export default SignInLink