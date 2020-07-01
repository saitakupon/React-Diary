import React from "react";
import {Card, CardContent, Typography, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

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
                        <IconButton aria-label="delete" onClick={()=>{
                            this.props.delMethod(this.props.id)
                        }}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default CardShow;
