import React from 'react';
import {AppBar, Toolbar, Typography} from "@material-ui/core";

class Header extends React.Component {
    render() {
        return (
            <div className='header'>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h5">
                            DIARY
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Header;