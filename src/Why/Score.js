import React, { Component } from 'react';
import { observer } from "mobx-react";
import store from './WhyStore.js';
import {
	Button,
} from 'react-bootstrap';

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
    let style = 'info'
    if (store.score != null) {
      if (store.score.id == score.id) {
        style = 'primary'
      }
    }
    return (
      <tr key={score.id}>
        <td>{score.nickname}</td>
        <td>{score.score}</td>
        <td>{score.statement}</td>
        <td>
          <Button bsStyle={style} onClick={this.switch.bind(this, score)}>
            Answers
          </Button>
        </td>
      </tr>
    )
  }
})

export default Score