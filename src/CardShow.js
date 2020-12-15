import React from "react";
import {Card, CardContent, Typography, IconButton} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

class CardShow extends React.Component {
    render(){
        return(
            <div className="CardShow">
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="caption" color="inherit">
                            {`${this.props.date}`}
                        </Typography>
                        <IconButton aria-label="delete" onClick={()=>{
                            this.props.delMethod(this.props.id)
                        }}>
                            <DeleteIcon color="action" fontSize="inherit" />
                        </IconButton>
                        <Typography variant="subtitle2" >
                            {this.props.content}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default CardShow;
