import React from 'react';
import { observer } from "mobx-react";
import store from './WhyStore.js';
// import {
//   Button,
// } from 'react-bootstrap';
import $ from "jquery";
import { Button } from 'reactstrap';

const Answers = observer((props) => {

    var $ = require('zepto-browserify').$;

    var getCookie = function(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = $.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    var csrftoken = getCookie('csrftoken');

  const answer_map = (answer, flagAns, getLeaderboard, url) => {
    return (
      <tr key={answer.id} style={{ paddingLeft: "70px" }}>
        <td>
          <Button
            color="link"
            style={{ fontSize: '10px' }}
            onClick={() => {flagAns(answer, {url: url, getLeaderboard: getLeaderboard})}}>
              Flag
          </Button>
        </td>
        <td>
          <span style={{ fontSize: '10px' }}>
            ({answer.flags})
          </span>
        </td>
        <td>
          <span style={{ fontWeight: 'bold' }}>
            {answer.answer}
          </span>
        </td>
      </tr>
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
      <table className="table table-bordered table-striped table-sm">
        <tbody>
          {answers_list}
        </tbody>
      </table>
    )
  } else {
    return (
      <div></div>
    )
  }

})

export default Answers;
