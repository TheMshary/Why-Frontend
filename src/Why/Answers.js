import React, { Component } from 'react';
import { observer } from "mobx-react";
import store from './WhyStore.js';

const Answer = ({answer}) => {
  return (
    <p>{answer.answer}</p>
  )
}

const answer_map = (answer) => {
  return (
    <div>
      <Answer answer={answer} />
      {/* <button onClick={() => {this.flagAns(answer)}}>Flag as false/BS</button> */}
    </div>
  )
}

const Answers = observer(class Answers extends Component {
  render() {
    if(store.open){
      let answers = store.score.answer_set;
      let answers_list = answers.map(answer_map)
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
  }

})

export default Answers;