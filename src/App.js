import React, { useState, useEffect } from 'react';
import SpotifyButton from './components/Login/SpotifyButton';
import MapView from './components/MapView/MapView';
import TopBarMessage from './components/common/TopBarMessage';
import RoundedButton from './components/common/RoundedButton';
import WalkListCreator from './components/WalkListCreator/WalkListCreator';
import Recording from './components/WalkListCreator/Recording';
import SaveWalkList from './components/WalkListCreator/SaveWalkList';
import WalkListDetails from './components/WalkListDetails/WalkListDetails';

// ...other imports

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showTopBarMessage, setShowTopBarMessage] = useState(true);
  const [topBarMessage, setTopBarMessage] = useState('Choose a walk-list'); // New state for managing top bar message
  const [currentView, setCurrentView] = useState('default');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleCreateWalkList = () => {
    setCurrentView('createWalkList');
    setTopBarMessage('New walk-list'); // Update the top bar message accordingly
  };

  const handleViewDetails = () => {
    setCurrentView('viewDetails');
    setTopBarMessage('Viewing walk-list details'); // Update the top bar message accordingly
  };

  const handleStartRecording = () => {
    setCurrentView('recording'); // Add this new case
    setTopBarMessage('All of me | John Legend'); // Optional: Update the top bar message accordingly
  };

  const handleSaveWalkList = () => {
    setCurrentView('saveWalkList');
    setTopBarMessage('Save walk-list'); // Update the top bar message accordingly
  }

  const handleReturnToDefault = () => {
    setCurrentView('default');
    setTopBarMessage('Choose a walk-list'); // Reset the top bar message to default
  }

  // Add a new useEffect hook to listen for the 'Escape' key
  // This will reset the current view to default when the 'Escape' key is pressed
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        // Reset to default state
        setCurrentView('default');
        setShowTopBarMessage(true);
        setTopBarMessage('Choose a walk-list'); // Reset the top bar message to default
      }
    };

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);

    // Clean up event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  // Update the renderCurrentView function to include the new view
  // This function will render the appropriate view based on the current view state
  const renderCurrentView = () => {
    switch (currentView) {
      case 'createWalkList':
        return <WalkListCreator onStartRecording={handleStartRecording} />;
      case 'viewDetails':
        return <WalkListDetails />;
      case 'recording':
        return <Recording onDoneRecording={handleSaveWalkList}/>;
      case 'saveWalkList':
        return <SaveWalkList onSaved={handleReturnToDefault}/>;
      default:
        return <RoundedButton text="Create new walk-list" onClick={handleCreateWalkList} />;
    }
  };

  return (
    <div className="app flex flex-col h-screen overflow-hidden">
      {!isLoggedIn ? (
        <SpotifyButton onLogin={handleLogin} />
      ) : (
        <>
          {showTopBarMessage && <TopBarMessage text={topBarMessage} />}
          <div className="flex-grow relative z-10">
            <MapView />
            {renderCurrentView()}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
