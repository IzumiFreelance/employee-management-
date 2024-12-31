import React, { useEffect, useState } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { initializeStorage, getCurrentUser } from './utils/localStorage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    initializeStorage();
    setIsLoggedIn(!!getCurrentUser());
  }, []);

  return isLoggedIn ? (
    <Dashboard onLogout={() => setIsLoggedIn(false)} />
  ) : (
    <Login onLogin={() => setIsLoggedIn(true)} />
  );
}

export default App;