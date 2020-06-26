import React from "react";
import {Card, CardContent, Typography} from '@material-ui/core';


class CardShow extends React.Component {
    render(){
        return(
            <div className="CardShow">
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h10" color="primary">
                            {`${this.props.date} \n`}
                        </Typography>
                        <Typography variant="h8" >
                            {this.props.content}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default CardShow;