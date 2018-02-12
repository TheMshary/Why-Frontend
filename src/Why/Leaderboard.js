import React, { Component } from 'react';
import { observer } from "mobx-react";
import store from './WhyStore.js';
import {
	Button,
	ButtonToolbar,
	// ButtonGroup,
	// Jumbotron,
	Grid,
	Row,
	Col,
	FormGroup,
	// FormControl,
	// InputGroup,
} from 'react-bootstrap';
import uuid from 'uuid';
import $ from "jquery";
import { BrowserRouter, Route } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";


const Leaderboard = observer(class Leaderboard extends Component {
	componentDidMount() {
		this.getLeaderboard()
	}

	getLeaderboard() {
		$.ajax({
			url: "http://"+this.props.url+"/leaderboard/",
			type: "GET",
			dataType: "json",
			success: function(data){
        store.leaderboard = data.top
        console.log(store.leaderboard)
			},
			error: function(xhr, status, err){
				console.log(err);
			}
		});
  }
  
	flagAns(ans) {
		console.log(ans.id)
		let data = {
			answer_id: ans.id
		}

		$.ajax({
			url: "http://"+this.props.url+"/flag/",
			type: "POST",
			dataType: "json",
			data: data,
			success: function(data){
				console.log("flagged.");
			},
			error: function(xhr, status, err){
				console.log(err);
			}
		});
		this.getLeaderboard()
  }
  
	render() {
    let leaderboard = store.leaderboard.map((score) => {
      let i = 0;
      let answers = score.answer_set.map((answer) => {
        i = i + 1;
        return (
          <div key={answer.id+"-"+i}>
            <p>{i}. {answer.answer} (flag: {answer.flags})</p>
            <button onClick={() => {this.flagAns(answer)}}>Flag as false/BS</button>
          </div>
        )
      })
      return (
        <tr key={score.id}>
          <td>{score.nickname}</td>
          <td>{score.score}</td>
          <td>{score.statement}</td>
          <td><LinkContainer exact to={"/"+score.id}><a>Answers</a></LinkContainer></td>
          <td><Route exact path={"/"+score.id} render={()=>{
            return (
              <div>
                {answers}
              </div>
            )
          }} /></td>
        </tr>
      )
  })
		return (
      <div>
        <Row className="show-grid">
          <Col>
            <h3>Leaderboard (Top)</h3>
          </Col>
          <Col>
            <LinkContainer exact to={"/"}>
              <Button bsStyle="primary" bsSize="xsmall">
                Collapse Answers
              </Button>
            </LinkContainer>
          </Col>
        </Row>
        <Row className="show-grid">
          <Col>
            <table>
              <thead>
                <tr>
                  <th>Nickname</th>
                  <th>Score</th>
                  <th>Statement</th>
                  <th>Answers</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard}
              </tbody>
            </table>
          </Col>
        </Row>
      </div>
    )
	}
})

export default Leaderboard;




