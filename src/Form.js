import React from 'react';
import {AppBar, IconButton, TextField, Toolbar} from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import {firestore} from "./Firebase";
import DiaryData from "./DiaryData";


class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			checkFlag: false,
			content: '',
			diaries: []
		};
	}

	handleContentChange(event) {
		const inputValue = event.target.value;
		this.setState({
			content: inputValue
		})
	}

	async getDiaryData() {
		const snapshot = (await firestore.collection(this.props.luser).orderBy("date", "asc").get());
		const diariesData = snapshot.docs.map(d => d.data());
		this.setState({
			diaries: diariesData
		})
	}

	checkLoad() {
		this.setState({
			checkFlag: true
		});
	}

	async setContentToFirestore(content) {
		let data = {
			id: "",
			date: new Date().toLocaleString(),
			content: content
		};
		const setD = firestore.collection(this.props.luser).doc()
		await setD.set({
			id: setD.id,
			date: data.date,
			content: data.content
		})
		await this.getDiaryData();
	}

	deleteContentFromFirestore = async (id) => {
		await firestore.collection(this.props.luser).doc(id).delete();
		await this.getDiaryData();
	}

	render() {
		if (this.state.checkFlag === false) {
			this.checkLoad()
			this.getDiaryData().then()
		}
		let sendText = (
			<TextField
				fullWidth
				label="How are you?"
				variant="standard"
				color="secondary"
				value={this.state.content}
				onChange={(event) => {
					this.handleContentChange(event)
				}}
				multiline
				onKeyPress={async (e) => {
					if (e.key === 'Enter' && e.shiftKey) {
						e.preventDefault()
						await this.setContentToFirestore(this.state.content)
						this.setState({content: ''});
					}
				}
				}
			/>
		);
		let sendButton = (
			<IconButton aria-label="sendButton" size="medium" color="secondary" style={{marginLeft: "auto"}}
						onClick={async () => {
							await this.setContentToFirestore(this.state.content)
							this.setState({content: ''});
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
				<Toolbar position="static" color="inherit" style={{top: "auto", bottom: 0, padding: 0}}>
				</Toolbar>
				<AppBar position="fixed" color="inherit" style={{top: "auto", bottom: 0, padding: 0}}>
					<Toolbar>
						{sendText}{sendButton}
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default Form;
