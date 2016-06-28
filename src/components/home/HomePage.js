import React from 'react';
import {Link} from 'react-router';

class HomePage extends React.Component {
  render () {
    return (
      <div className="jumbotron">
        <h1>Boilerplate for React-redux using WebEnvStart</h1>
        <p>This is a working example app with routing</p>
        <Link to="todos" className="btn btn-primary btn-lg">Add Todo</Link>
      </div>
    );
  }
}

export default HomePage;
