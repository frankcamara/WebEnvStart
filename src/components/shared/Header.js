import React from 'react';
import {Link} from 'react-router';

const Header = () => {
  return (
    <nav>
      <Link to="/" activeClassName="active">Home</Link>
      {" "}
      <Link to="/todos" activeClassName="active">Todos</Link>
    </nav>
  );
};

export default Header;
