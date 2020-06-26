import React from 'react';
import {AppBar, Toolbar, Typography} from "@material-ui/core";
//import useScrollTrigger from '@material-ui/core/useScrollTrigger';

class Header extends React.Component {
    render() {
        return (
            <div className='header'>
                <AppBar position="'fixed'" color="primary">
                    <Toolbar>
                        <Typography variant="h6">
                            DIARY
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Header;