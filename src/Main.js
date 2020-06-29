import React from 'react';
import {Button} from '@material-ui/core';
import firebase from "firebase";
import Form from './Form';


class Main extends React.Component {
    state = {
        user: null
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({ user })
        })
    }
    login() {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(provider)
    }
    logout() {
        firebase.auth().signOut()
    }

    render() {
        let authScene;
        this.state.user ? (
            authScene = (
                <div>
                    <Form luser = {this.state.user && this.state.user.email} />
                    <div className="AuthOut">
                        <Button variant="contained" color="default" onClick={this.logout}>Logout</Button>
                    </div>
                </div>
            )
        ) : (
            authScene = (
                <div className="AuthIn">
                    <Button variant="contained" color="default" onClick={this.login} >Login</Button>
                </div>
            )
        )
        return (
            <div className="main">
                {authScene}
            </div>
        );
    }
}

export default Main;
