import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Why from './Why/Main';
// import Sequence from './Components/Sequence';
import registerServiceWorker from './registerServiceWorker';
// import { Router, Route, hashHistory } from 'react-router';
// import Test from './Test';

let production = false;



let url;
if(production) {
	url = "159.89.12.116"
} else {
	url = "127.0.0.1:8000"
}

ReactDOM.render(
	// <Test />,
	<Why url={url}/>,
	document.getElementById('root')
);
registerServiceWorker();
