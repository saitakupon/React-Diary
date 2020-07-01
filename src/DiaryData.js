import React from "react";
import CardShow from "./CardShow";

class DiaryData extends React.Component {
    render(){
        return(
            <div>
                {this.props.diaries.map((data)=>{
                    return(
                        <CardShow
                            user={data.user}
                            id={data.id}
                            date={data.date}
                            content={data.content}
                            delMethod={this.props.delMethod}
                        />
                    )
                })}
            </div>
        );
    }
}

export default DiaryData;
