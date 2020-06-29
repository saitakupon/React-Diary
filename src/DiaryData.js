import React from "react";
import CardShow from "./CardShow";

class DiaryData extends React.Component {
    render(){
        return(
            <div>
                {this.props.diaries.map((data)=>{
                    return(
                        <CardShow
                            id={data.id}
                            date={data.date}
                            content={data.content}
                        />
                    )
                })}
            </div>
        );
    }
}

export default DiaryData;