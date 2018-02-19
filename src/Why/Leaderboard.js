import React, { Component } from 'react';
import { observer } from "mobx-react";
import store from './WhyStore.js';
import Score from './Score.js';
import {
	Row,
	Col,
} from 'react-bootstrap';
import $ from "jquery";



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
			},
			error: function(xhr, status, err){
				console.log(err);
			}
		});
  }

	render() {
    let id = 0
    let leaderboard = store.leaderboard.map((score) => {
      id++
      return (
        <Score key={id} score={score} />
      )
  })
		return (
      <div>
        <Row className="show-grid">
          <Col>
            <h3>Leaderboard (Top)</h3>
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




