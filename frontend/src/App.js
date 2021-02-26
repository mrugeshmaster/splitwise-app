import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import Main from './components/Main.js'

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
