import React, { Fragment } from 'react';
// import logo from './logo.svg';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import routes from './routes';

function App() {

  return (
    <Fragment>
      <Router>
        {routes.map((scr, index) => {
          const { screen, ...rest } = scr;
          const comp = require(`./screens/${screen}`).default;
          return <Route key={index} component={comp} {...rest} />
        })}
      </Router>
    </Fragment>
  );
}

export default App;
