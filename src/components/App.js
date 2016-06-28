import React, {PropTypes} from 'react';
import Header from './shared/Header'
// React router will pass in the childcomponent as props to this component
class App extends React.Component {
  render () {
    return (
      <div className="container-fluid">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
