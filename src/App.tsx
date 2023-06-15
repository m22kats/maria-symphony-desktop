import { Fragment } from 'react';
import GlobalStyle from '@styles/global-styles';
import React from 'react';
import RouteList from './routes/Routes';

function App() {
  return (
    <div>
      <React.StrictMode>
        <Fragment>
          <GlobalStyle />
          <RouteList />
        </Fragment>
      </React.StrictMode>
    </div>
  );
}

export default App;
