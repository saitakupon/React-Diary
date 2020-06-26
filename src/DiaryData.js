import React from "react";
import CardShow from "./CardShow";
import {firestore} from "./Firebase";
import {DIARIES_TABLE_NAME} from "./constants";

class DiaryData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            diaries:[]
        };
    }

    async getData(){
        const snapshot = await firestore.collection(DIARIES_TABLE_NAME).orderBy("date","desc").get();
        const diariesData = snapshot.docs.map(d=>d.data());
        this.setState({
            diaries:diariesData
        })
    }

    render(){
        this.getData()
        return(
            <div>
                {this.state.diaries.map((data)=>{
                    return(
                        <CardShow
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