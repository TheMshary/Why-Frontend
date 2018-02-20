import React, { Component } from 'react';
import { observer } from "mobx-react";
import store from './WhyStore.js';
// import {
// 	Button,
// } from 'react-bootstrap';
import { Button } from 'reactstrap';

const Score = observer(class Score extends Component {
  switch(score, e) {
    if (store.score != null) {
      if (store.score.id == score.id) {
        store.open = false
        store.score = null
        return
      }
    }
    store.open = true
    store.score = score
  }

  render() {
    let score = this.props.score;
    let color = 'link'
    if (store.score != null) {
      if (store.score.id == score.id) {
        color = 'primary'
      }
    }
    return (
      <tr key={score.id}>
        <td>{score.nickname}</td>
        <td>{score.score}</td>
        <td>{score.statement}</td>
        <td>
          <Button color={color} outline={color === 'primary'} onClick={this.switch.bind(this, score)}>
            Answers
          </Button>
        </td>
      </tr>
    )
  }
})

export default Score