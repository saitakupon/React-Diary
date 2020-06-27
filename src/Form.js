import React from 'react';
import {Button,TextField} from '@material-ui/core';
import {firestore} from "./Firebase";
import {DIARIES_TABLE_NAME} from "./constants";
import DiaryData from "./DiaryData";


class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checkFlag:"false",
			content:'',
			diaries:[]
		};
	}

	handleContentChange(event){
		const inputValue=event.target.value;
		this.setState({
			content: inputValue
		})
	}

	async getDiaryData(){
		const snapshot = await firestore.collection(DIARIES_TABLE_NAME).orderBy("date","asc").get();
		const diariesData = snapshot.docs.map(d=>d.data());
		this.setState({
			diaries:diariesData
		})
	}

	checkLoad(){
		this.setState({
			checkFlag:"true"
		});
	}

	setContentToFirestore(content){
		const data = { date: new Date().toLocaleString(), user: "saito", content: content };
		firestore.collection(DIARIES_TABLE_NAME).add(data);
		this.getDiaryData();
	}

	render() {
		if(this.state.checkFlag==="false"){
			this.checkLoad()
			this.getDiaryData()
		}
		let sendText = (
			<TextField
				label="How are you?"
				variant="outlined"
				color="textSecondary"
				value={this.state.content}
				onChange={(event)=>{this.handleContentChange(event)}}
				fullWidth
				multiline
				onKeyPress={e =>{
					if (e.key === 'Enter' && e.shiftKey) {
						e.preventDefault()
						this.setContentToFirestore(this.state.content)
						this.setState({content:''});
					}
				}
			}
			/>
			);
		let sendButton = (
			<Button variant="contained" color="primary" onClick={() => {
				this.setContentToFirestore(this.state.content)
				this.setState({content:''});
			}}>
				SEND
				(Shift+Enter)
			</Button>
		)
		return (
			<div>
				<DiaryData
					diaries={this.state.diaries}
				/>
				<div className='sendText'>
					{sendText}
				</div>
				<div className='sendButton'>
					{sendButton}
				</div>
			</div>
		);
	}
}

export default Form;
