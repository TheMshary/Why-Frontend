import React from 'react';
import { observer } from "mobx-react";
import store from './WhyStore.js';
import {
  Button,
} from 'react-bootstrap';
import $ from "jquery";


const Answers = observer((props) => {
  const answer_map = (answer, flagAns, getLeaderboard, url) => {
    return (
      <div key={answer.id} style={{ paddingLeft: "70px" }}>
        <Button  bsSize='small' bsStyle='info' style={{ fontSize: '10px' }} onClick={() => {flagAns(answer, {url: url, getLeaderboard: getLeaderboard})}}>Flag</Button>
        <span style={{ fontSize: '10px' }}>({answer.flags})</span> <span style={{ fontWeight: 'bold' }}>{answer.answer}</span>
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