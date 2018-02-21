import React, { Component } from 'react';
import { observer } from "mobx-react";
import {
	Grid,
	Row,
	Col,
	FormGroup,
} from 'react-bootstrap';
import uuid from 'uuid';
import $ from "jquery";
import { BrowserRouter } from 'react-router-dom';
import Leaderboard from './Leaderboard';
import Answers from './Answers';
import { Button } from 'reactstrap';


const Main = observer(class Main extends Component {
	constructor() {
		super();
		this.state = {
			answers: [],
			msg: "Enter a statement.",
			score: -1,
			submissionFlag: false,
			statement: "",
			placeholder: "Your statement goes here"
		}
	}

	answer(e) {
		e.preventDefault()
		if(this.refs.answer.value !== "") {
			if(!this.state.submissionFlag) {
				this.setState({
					statement: this.refs.answer.value, 
					placeholder: "Your answer goes here", 
					msg: "Why?", 
					score: this.state.score +1, 
					submissionFlag: true
				}, () => {
					this.refs.answer.value = ""
					}
				)
				return
			}
			let answers = this.state.answers
			let answer = {
				answer: this.refs.answer.value,
				id: uuid.v4(),
			}
			answers.push(answer)
			this.refs.answer.value = ""
			this.setState({answers: answers, msg: "Why?", score: this.state.score +1, submissionFlag: true},
				() => {console.log("ANSWERS: "); console.log(this.state.answers)})
		}
	}

	clearAnswers() {
		this.setState({
			answers: [],
			msg: "Enter a statement.",
			score: -1,
			submissionFlag: false,
			statement: "",
			placeholder: "Your statement goes here",
		})
	}

	submitScore() {
		let nickname = prompt("Enter your nickname please");
		let answers = this.state.answers
		let data = {
			score: this.state.score,
			nickname: nickname === "" ? null : nickname,
			statement: this.state.statement,
			'answer_set': JSON.stringify(this.state.answers)
		};

		$.ajax({
			url: "http://"+this.props.url+"/leaderboard/",
			type: "POST",
			dataType: "json",
			data: data,
			success: function(data){
				console.log("score submitted.");
			},
			error: function(xhr, status, err){
				console.log(err);
			}
		});
		this.clearAnswers()
		this.getLeaderboard()
	}

	getLeaderboard() {
		this.refs.leaderboard.getLeaderboard()
	}

	clrAns = () => {
		if(window.confirm("Are you sure you want to clear ALL your answers?")) {
			this.clearAnswers();
		} else {
			return;
		}
	}

	render() {
		let answers = this.state.answers.map((answer) => {
			return (
				<h5 key={answer.id}>{answer.answer}</h5>
			)
		})

		let answersButtons = <div>
			<Button color="primary" outline onClick={this.submitScore.bind(this)}>
				Give up and submit score to leaderboard
			</Button>
			<br />
			<Button color="link" onClick={this.clrAns.bind(this)} style={{ align: "right" }}>
				Clear Answers
			</Button>
		</div>
		
		return (
			<BrowserRouter>
				<Grid>
					<div style={{ backgroundColor: '#ddd' }}>
						<p>
							v2.0: Revamped Leaderboard UX/UI
						</p>
					</div>
					<Row className="show-grid">
						<Col>
							<h1>{this.state.statement}</h1>
							{answers}
							<h4><strong>{this.state.msg}</strong></h4>
							<h4>{this.state.score}</h4>
							<form onSubmit={this.answer.bind(this)} >
								<FormGroup bsSize="large">
									<input style={{ width:1000 }} type="text" placeholder={this.state.placeholder} ref="answer" />
								</FormGroup>
							</form>
							{this.state.submissionFlag ? answersButtons : null}
							<hr/>
						</Col>
					</Row>
					<table>
						<tbody>
							<tr>
								<td style={{ verticalAlign: 'top' }}>
									<Leaderboard url={this.props.url} ref="leaderboard"/>
								</td>
								<td style={{ paddingLeft: '20px', verticalAlign: 'top' }}>
									<Answers getLeaderboard={() => {this.getLeaderboard()}} url={this.props.url}/>
								</td>
							</tr>
						</tbody>
					</table>
				</Grid>
			</BrowserRouter>
		)
	}
})

export default Main;




