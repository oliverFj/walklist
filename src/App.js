import logo from './logo.svg';
import './App.css';

import React from 'react';
import LoginForm from './components/Login/LoginForm';

const App = () => {
  return (
    <div className="App">
      <LoginForm />
      {/* Other components will go here */}
    </div>
  );
};

export default App;
