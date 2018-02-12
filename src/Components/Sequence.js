import React, { Component } from 'react';
// import logo from './logo.svg';
// import "material-components-web/material-components-web.scss";
import { observer } from "mobx-react";
import {
	Button,
	// ButtonGroup,
	ButtonToolbar,
	ToggleButtonGroup,
	ToggleButton,
} from 'react-bootstrap';

import store from '../Store.js'

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
import Upgrade from './Upgrade.js'
import AnimatedNumber from 'react-animated-number';

const Sequence = observer(class Sequence extends Component {
	constructor() {
		super();
		this.timer = setInterval(this.SPS.bind(this), 20)
		this.increment = this.increment.bind(this)
		this.state = {
			SPACEBAR_KEYCODE: 32,
			notation: 0,
		}
	}

	_handleKeyDown = (e) => {
	    switch( e.keyCode ) {
	        case this.state.SPACEBAR_KEYCODE:
	        	this.increment(this);
	            break;
	        default: 
	            break;
	    }
	}


	componentWillMount(){
	    // BannerDataStore.addChangeListener(this._onchange);
	    document.addEventListener("click", this._handleDocumentClick, false);
	    document.addEventListener("keydown", this._handleKeyDown.bind(this));
	}


	componentWillUnmount() {
	    // BannerDataStore.removeChangeListener(this._onchange);
	    document.removeEventListener("click", this._handleDocumentClick, false);
	    document.removeEventListener("keydown", this._handleKeyDown.bind(this));
	}

	// Calculates the Sequence per second and updates the store accordingly.
	SPS() {
		const sps = store.SPS
		const seque = store.sequence
		store.sequence = seque + sps/50
	}

	// The core function that updates the play state.
	update(seque, clicc, sequePS, SPSC) {
		store.sequence = store.sequence + seque
		store.click = store.click + clicc
		store.SPS = store.SPS + sequePS
		store.SPScost = store.SPScost + SPSC
		store.error = "Click away!"
	}

	// Increments the Sequence by the appropriate amount in the store.
	increment(e) {
		this.update(store.click, 0, 0, 0)
	}

	// Buys a SPS upgrade.
	SPSbuy() {
		if(store.sequence < store.SPScost) {
			store.error = "Not enough sequence!"
		} else {
			this.update(store.SPScost*-1, 0, store.SPSupgrade, 0)
			store.SPScost = Math.ceil(store.SPScost*1.15)
		}
	}

	// Upgrade to double SPS.
	doubleSPS() {
		if(store.sequence < store.SPSupgradeCost) {
			store.error = "Not enough sequence!"
		} else {
			// this.update(store.SPScost*-1, 0, 1, 0)
			// store.SPScost = Math.ceil(store.SPScost*1.15)
			store.SPS = store.SPS * 2
			store.SPSupgrade = store.SPSupgrade * 2
			store.sequence = store.sequence - store.SPSupgradeCost
			store.SPSupgradeCost = Math.ceil(store.SPSupgradeCost*2.27)
		}
	}

	// Buys the upgrade that increases Sequence per click.
	plusclick() {
		if(store.sequence < store.cost) {
			store.error = "Not enough sequence!"
		} else {
			this.update(store.cost*-1, store.clickUpgrade, 0, 0)
			store.cost = Math.ceil(store.cost*1.05)
		}
	}

	// Upgrade to double SPC
	doubleClick() {
		if(store.sequence < store.clickUpgradeCost) {
			store.error = "Not enough sequence!"
		} else {
			// this.update(store.cost*-1, 1, 0, 0)
			// store.cost = Math.ceil(store.cost*1.05)
			store.click = store.click * 2
			store.clickUpgrade = store.clickUpgrade * 2
			store.sequence = store.sequence - store.clickUpgradeCost
			store.clickUpgradeCost = Math.ceil(store.clickUpgradeCost*2.27)
		}
	}

	toNumber(number, e) {
		// console.log(this.state.notation)
		return (number > 999999 && this.state.notation) ? number.toExponential() : number.toLocaleString(navigator.language, { maximumFractionDigits: 0 })
	}

	toggleNotation(notate, e) {
		this.setState({
			notation: notate
		})
	}

	render() {
		const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };

		const buttonsInstance = (
			<div className="well" style={wellStyles}>
				<Button bsStyle="primary" bsSize="large" block onClick={this.increment.bind(this)}>Add link to sequence</Button>
			</div>
		);

				// <p style={{textAlign: 'center', fontSize: 100}}>{this.toNumber(store.sequence)}</p>
		const error = <p>{store.error}</p>
		return (
			<div>
				<AnimatedNumber component="p" value={store.sequence}
					style={{
						transition: '1s ease-out',
						fontSize: 48,
						textAlign: 'center'
					}}
					frameStyle={perc => (
						perc === 100 ? {} : {}
					)}
					duration={300}
					formatValue={n => this.toNumber(n)}
				/>
				{buttonsInstance}
				<ButtonToolbar>
					<ToggleButtonGroup
						type="radio"
						name="options"
						defaultValue={0}
						onChange={this.toggleNotation.bind(this)}
					>
						<ToggleButton value={0}>
							Normal
						</ToggleButton>
						<ToggleButton value={1}>
							Scientific notation
						</ToggleButton>
					</ToggleButtonGroup>
				</ButtonToolbar>
				{error}
				<Upgrade
					toNumber={this.toNumber.bind(this)}
					plusclick={this.plusclick.bind(this)}
					SPSbuy={this.SPSbuy.bind(this)}
					doubleClick={this.doubleClick.bind(this)}
					doubleSPS={this.doubleSPS.bind(this)}
				/>
			</div>
		)
		
	}
})

// const styles = {
// 	plus: {
// 		width: 200,
// 		height: 200
// 	},
// 	sequence: {
// 		fontSize: 30
// 	},
// 	cost: {
// 		color: '#ff0000'
// 	},
// 	click: {
// 		color: '#00dd00'
// 	},
// 	buy: {
// 		width: 40,
// 		height: 40,
// 		fontSize: 17
// 	}
// }
export default Sequence;









