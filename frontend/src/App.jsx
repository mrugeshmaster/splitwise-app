/* eslint-disable linebreak-style */
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Main from './components/Main';

function App() {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
