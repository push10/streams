import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends Component {



    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '473248300525-mfqn40s5kvbsq9c491jomvp5ni2jb89t.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange( this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            })
        })
    }
    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }
    renderAuthButtun() {
        if (this.props.isSignedIn === null) {
            return <div>I dont know if I am signed </div>
        } else if (this.props.isSignedIn) {
            return <button className='ui red google button' onClick={this.onSignOutClick}>
                <i className='google icon'> </i>Sign Out
            </button>
        } else {
            return <button className='ui green google button' onClick={this.onSignInClick}>
                <i className='google icon'></i> Sign In with Google
            </button>
        }
    }
    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }
    render() {
        return (
            <div> {this.renderAuthButtun()} </div>
        );
    }
}
const mapStateToProp = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}
export default connect(mapStateToProp, { signIn, signOut })(GoogleAuth);