import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Test = () => (
  <Router>
    <div>
      <Route path="" component={Topics} />
    </div>
  </Router>
);

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`/rendering`}>Rendering with React</Link>
      </li>
      <li>
        <Link to={`/components`}>Components</Link>
      </li>
      <li>
        <Link to={`/props-v-state`}>Props v. State</Link>
      </li>
    </ul>

    <Route path={`/:topicId`} component={Topic} />
    <Route
      exact
      path={match.url}
      render={() => <h3>Please select a topic.</h3>}
    />
  </div>
);

const Topic = ({ match }) => {
  console.log(match);
  return (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  );
}


export default Test;