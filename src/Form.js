import React from 'react';
import {IconButton,TextField} from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import {firestore} from "./Firebase";
import DiaryData from "./DiaryData";


class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checkFlag:false,
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
		const snapshot = await firestore.collection(this.props.luser).orderBy("date","asc").get();
		const diariesData = snapshot.docs.map(d=>d.data());
		this.setState({
			diaries:diariesData
		})
	}

	checkLoad(){
		this.setState({
			checkFlag:true
		});
	}

	setContentToFirestore(content){
		let data = {
			id:"",
			date: new Date().toLocaleString(),
			content: content
		};
		const setD = firestore.collection(this.props.luser).doc()
		setD.set({
			id:setD.id,
			date:data.date,
			content:data.content
		})
		this.getDiaryData();
	}

	deleteContentFromFirestore = async (id)=>{
		await firestore.collection(this.props.luser).doc(id).delete();
		await this.getDiaryData();
	}

	render() {
		if(this.state.checkFlag===false){
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
			<IconButton aria-label="sendButton" color="primary" onClick={() => {
				this.setContentToFirestore(this.state.content)
				this.setState({content:''});
			}}>
				<Send/>
			</IconButton>
		)
		return (
			<div>
				<DiaryData
					delMethod={this.deleteContentFromFirestore}
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
