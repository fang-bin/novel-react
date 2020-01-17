import React from 'react';
import { HashRouter as Router, Route, } from 'react-router-dom';
import routes from './routes';

const App: React.FC = () => {
  return (
      <Router>
        {
          routes.map(
            ({ exact, path, component, }, index) => 
              <Route key={index} path={path} component={component} exact={exact} />
          )
        }
      </Router>
  );
}

export default App;
