import React from 'react';
import { observer } from "mobx-react";
import store from './WhyStore.js';
import {
  Button,
} from 'react-bootstrap';
import $ from "jquery";


const Answers = observer((props) => {
  const Answer = ({answer}) => {
    return (
      <p><span style={{ fontSize: '10px' }}>({answer.flags})</span> {answer.answer}</p>
    )
  }
  const answer_map = (answer, flagAns, getLeaderboard, url) => {
    return (
      <div key={answer.id}>
        <Answer answer={answer} />
        <Button bsSize='small' bsStyle='info' onClick={() => {flagAns(answer, {url: url, getLeaderboard: getLeaderboard})}}>
          <span style={{ fontSize: '10px' }}>Flag as</span> <span style={{ fontWeight: 'bold' }}>nonesense</span>
        </Button>
      </div>
    )
  }

  const flagAns = (ans, props) => {
    let data = {
      answer_id: ans.id
		}

		$.ajax({
			url: "http://"+props.url+"/flag/",
			type: "POST",
			data: data,
			success: function(data){
				console.log("("+ans.id+") was flagged.");
			},
			error: function(xhr, status, err){
				console.log(xhr);
				console.log(err);
			}
		});
		props.getLeaderboard()
  }

  if(store.open){
    let answers = store.score.answer_set;
    let answers_list = answers.map((answer) => answer_map(answer, flagAns, props.getLeaderboard, props.url))
    return (
      <div>
        {answers_list}
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }

})

export default Answers;