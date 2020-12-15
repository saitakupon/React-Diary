import React from 'react';
import {AppBar, Button, Toolbar, Typography} from '@material-ui/core';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import firebase from "firebase";
import Form from './Form';


class Main extends React.Component {
    state = {
        user: null
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({user})
        })
    }

    login() {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(provider).then()
    }

    logout() {
        firebase.auth().signOut().then()
    }

    render() {
        let authScene;
        let form;
        this.state.user ? (
            authScene = (
                <Button style={{marginLeft: "auto", textTransform: 'none',}} variant="outlined" color="inherit"
                        onClick={this.logout}>Logout</Button>
            )
        ) : (
            authScene = (
                <Button style={{marginLeft: "auto", textTransform: 'none',}} variant="outlined" color="inherit"
                        onClick={this.login}>Login</Button>
            )
        )
        this.state.user ? (
            form = (
                <div>
                    <Form luser={this.state.user && this.state.user.email}/>
                </div>
            )
        ) : (
            form = (
                <div>
                    <Typography style={{textAlign: "center", marginTop: 100}} variant="body1" color={"secondary"}>
                        Please Login with your Google account.
                    </Typography>
                </div>
            )
        )
        return (
            <div className='header'>
                <AppBar position="fixed" color="secondary">
                    <Toolbar>
                        <Typography variant="h5">
                            <BookmarksIcon />
                            DIARY
                        </Typography>
                        {authScene}
                    </Toolbar>
                </AppBar>
                <Toolbar position="static" color="inherit">
                </Toolbar>
                {form}
            </div>
        );
    }
}

export default Main;
