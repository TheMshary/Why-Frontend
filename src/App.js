import React, { Component } from 'react';
import "material-components-web/material-components-web.scss";
import { observer } from "mobx-react";
import {
	Button,
	ButtonGroup,
	ButtonToolbar,
	ToggleButtonGroup,
	ToggleButton,
	Nav,
	Navbar,
	NavItem,
} from 'react-bootstrap';
import store from './Store.js';
import Upgrade from './Components/Upgrade.js';
import Sequence from './Components/Sequence.js';
import Why from './Components/Why.js';
import AnimatedNumber from 'react-animated-number';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { LinkContainer } from "react-router-bootstrap";

const App = observer(class App extends Component {
	render() {
		const wellStyles = { maxWidth: 400, margin: '0 auto 10px' };

		return (
			<BrowserRouter>
				<div>
					<Route path="/sequence" render={()=><Sequence />} />
					<Route path="/why" render={()=><Why />} />
					<div className="well" style={wellStyles}>
						<Button href="/sequence" bsStyle="primary" bsSize="large" block>Sequence</Button>
						<Button href="/why" bsStyle="primary" bsSize="large" block>Why?</Button>
					</div>
				</div>
			</BrowserRouter>
		)
	}
})
export default App;









