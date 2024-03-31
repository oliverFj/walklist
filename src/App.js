import logo from './logo.svg';
import './App.css';

import React from 'react';
import LoginForm from './components/Login/LoginForm';
import Input from './components/common/Input';

const App = () => {
  return (
    <div className="App">
      <Input />
      <LoginForm />
      {/* Other components will go here */}
    </div>
  );
};

export default App;
