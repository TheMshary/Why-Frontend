import React, { Component } from 'react';
import { observer } from "mobx-react";
// import {
// 	Card,
// 	CardHeader,
// 	CardTitle,
// 	CardSubtitle,
// 	CardActions,
// 	CardText,
// 	Button
// } from 'react-mdc-web/lib';

// import { Card, Icon, Image } from 'semantic-ui-react'
import store from '../Store.js';
import {
	Button,
	ButtonGroup,
} from 'react-bootstrap';

const Upgrade = observer(class Upgrade extends Component {
	
	constructor() {
		super();
		this.state = {
			links: 0,
			connectors: 0,
			chains: 0,
			sequences: 0,
		}
	}

	buttonClicked(i, e) {
		switch(i){
			case 0:
				this.props.plusclick();
				break;
			case 1:
				this.props.SPSbuy();
				break;
			case 2:
				this.props.doubleClick();
				break;
			case 3:
				this.props.doubleSPS();
				break;
			default:
				break;
		}
	}

	render() {
		return (
			<ButtonGroup>
				<ButtonGroup vertical>
					<Button disabled style={styles.click}>
						{this.props.toNumber(store.click)}
					</Button>
					<Button disabled style={styles.click}>
						{this.props.toNumber(store.SPS)}
					</Button>
					<Button disabled></Button>
					<Button disabled>
						{this.props.toNumber(store.clickUpgrade)}
					</Button>
					<Button disabled>
						{this.props.toNumber(store.SPSupgrade)}
					</Button>
				</ButtonGroup>
				<ButtonGroup vertical>
					<Button onClick={this.buttonClicked.bind(this, 0)}>
						Per click
					</Button>
					<Button onClick={this.buttonClicked.bind(this, 1)}>
						Per second
					</Button>
					<Button disabled></Button>
					<Button onClick={this.buttonClicked.bind(this, 2)}>
						Per click x2
					</Button>
					<Button onClick={this.buttonClicked.bind(this, 3)}>
						Per second x2
					</Button>
				</ButtonGroup>
				<ButtonGroup vertical>
					<Button disabled style={styles.cost}>
						{this.props.toNumber(store.cost)}
					</Button>
					<Button disabled style={styles.cost}>
						{this.props.toNumber(store.SPScost)}
					</Button>
					<Button disabled></Button>
					<Button disabled style={styles.cost}>
						{this.props.toNumber(store.clickUpgradeCost)}
					</Button>
					<Button disabled style={styles.cost}>
						{this.props.toNumber(store.SPSupgradeCost)}
					</Button>
				</ButtonGroup>
			</ButtonGroup>
		)
		
	}
})
const styles = {
	plus: {
		width: 200,
		height: 200
	},
	sequence: {
		fontSize: 30
	},
	cost: {
		color: '#cc0000'
	},
	click: {
		color: '#00aa00'
	},
	buy: {
		width: 40,
		height: 40,
		fontSize: 17
	}
}
export default Upgrade;









