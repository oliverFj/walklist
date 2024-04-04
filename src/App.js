//app.js
import React, { useState, useEffect } from 'react';
import SpotifyButton from './components/Login/SpotifyButton';
import MapView from './components/MapView/MapView';
import TopBarMessage from './components/common/TopBarMessage';
import RoundedButton from './components/common/RoundedButton';
import WalkListCreator from './components/WalkListCreator/WalkListCreator';
import Recording from './components/WalkListCreator/Recording';
import SaveWalkList from './components/WalkListCreator/SaveWalkList';
import WalkListDetails from './components/WalkListDetails/WalkListDetails';
import WalkListPlaying from './components/WalkListDetails/WalkListPlaying';

// Denne komponent er vores hovedkomponent
// Den styrer hvilken del af applikationen der skal vises
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showTopBarMessage, setShowTopBarMessage] = useState(true);
  const [topBarMessage, setTopBarMessage] = useState('Choose a walk-list');
  const [currentView, setCurrentView] = useState('default');
  const [areMarkersVisible, setAreMarkersVisible] = useState(true);
  const [selectedSongs, setSelectedSongs] = useState([]); 
  const [selectedTitle, setSelectedTitle] = useState(''); 

  // Denne funktion håndtere login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  // Denne funktion håndtere oprettelse af walk-liste 
  const handleCreateWalkList = () => {
    setCurrentView('createWalkList');
    setTopBarMessage('New walk-list'); // Her opdateres topbar beskeden
  };

  const handleViewDetails = () => {
    setCurrentView('viewDetails');
    setTopBarMessage('Viewing walk-list details'); 
  };

  const handleStartRecording = () => {
    setCurrentView('recording'); 
    setTopBarMessage('All of me | John Legend');
  };

  const handleSaveWalkList = () => {
    setCurrentView('saveWalkList');
    setTopBarMessage('Save walk-list');
  }
  // Denne funktion sender os tilbage til default view
  const handleReturnToDefault = () => {
    setCurrentView('default');
    setTopBarMessage('Choose a walk-list'); 
    setAreMarkersVisible(true); //Vis markørerne igen
  }
  // Denne funktion håndtere valg af walk-liste
  // Den tager titlen og sangene fra walk-listen
  const handleMarkerSelect = (title, songs) => {
    setSelectedTitle(title);
    setSelectedSongs(songs);
    setCurrentView('viewDetails');
    setAreMarkersVisible(false); // Gem markørerne når en walk-liste er valgt
  };

  const handlePlayWalkList = () => {
    setCurrentView('walkListPlaying');
    setTopBarMessage('Playing walk-list'); 
  };


  // Denne useEffect bruger escape key press og sender os tilbage til default view
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setCurrentView('default');
        setShowTopBarMessage(true);
        setTopBarMessage('Choose a walk-list'); // Reset the top bar message to default
        setSelectedSongs([]); // Clear selected songs
        setAreMarkersVisible(true); // Show markers again
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);


  // Denne funktion styrer hvilken del af applikationen der skal vises
  const renderCurrentView = () => {
    switch (currentView) {
      case 'createWalkList':
        return <WalkListCreator onStartRecording={handleStartRecording} />;
      case 'viewDetails':
        return <WalkListDetails title={selectedTitle} songs={selectedSongs} onPlayPress={handlePlayWalkList} />;
      case 'recording':
        return <Recording onDoneRecording={handleSaveWalkList} />;
      case 'saveWalkList':
        return <SaveWalkList onSaved={handleReturnToDefault} />;
      case 'walkListPlaying':
        return <WalkListPlaying onDonePlaying={handleReturnToDefault} />;
      default:
        return <RoundedButton text="Create new walk-list" onClick={handleCreateWalkList} />;
    }
  };

  return (
    <div className="app flex flex-col h-screen overflow-hidden">
      {!isLoggedIn ? (
        // Hvis brugeren ikke er logget ind vises login knappen
        // Når brugeren er logget ind vises kortet og walk-listen
        // MapView er en komponent der tager isVisible, onMarkerSelect og isDefaultView som props
        <SpotifyButton onLogin={handleLogin} />
      ) : (
        <>
          {showTopBarMessage && <TopBarMessage text={topBarMessage} />}
          <div className="flex-grow relative z-10">
            <MapView
              onMarkerSelect={handleMarkerSelect}
              isVisible={areMarkersVisible}
              isDefaultView={currentView === 'default'}
            />
            {renderCurrentView()}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
