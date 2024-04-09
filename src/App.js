//////
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


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showTopBarMessage, setShowTopBarMessage] = useState(true);
  const [topBarMessage, setTopBarMessage] = useState('Choose a walk-list');
  const [currentView, setCurrentView] = useState('default');
  const [areMarkersVisible, setAreMarkersVisible] = useState(true);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [isWalkListPlaying, setIsWalkListPlaying] = useState(false);
  const [mapCenterPoint, setMapCenterPoint] = useState(null);
  const [animationControl, setAnimationControl] = useState('resume');


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

  const handleReturnToDefault = () => {
    setCurrentView('default');
    setTopBarMessage('Choose a walk-list');
    setAreMarkersVisible(true);
    setIsWalkListPlaying(false); 
  };

  const handleMarkerSelect = (title, songs, trail) => {

    if (trail && trail.length > 0) {
      setMapCenterPoint(trail[0]);
    }
    setSelectedTitle(title);
    setSelectedSongs(songs);
    setCurrentView('viewDetails');
    setAreMarkersVisible(false); 
  };

  const handlePlayWalkList = () => {
    setCurrentView('walkListPlaying');
    setTopBarMessage('Playing walk-list');
    setIsWalkListPlaying(true);
  };


  const handlePauseAnimation = () => {
    setAnimationControl('pause');
  };

  const handleResumeAnimation = () => {
    setAnimationControl('resume');
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setCurrentView('default');
        setShowTopBarMessage(true);
        setTopBarMessage('Choose a walk-list'); 
        setSelectedSongs([]); 
        setAreMarkersVisible(true); 
        setIsWalkListPlaying(false); 
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
          return <WalkListPlaying onDonePlaying={handleReturnToDefault} onResume={handleResumeAnimation} onPause={handlePauseAnimation} />;
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
            <MapView
              onMarkerSelect={handleMarkerSelect}
              isVisible={areMarkersVisible}
              isDefaultView={currentView === 'default'}
              isWalkListPlaying={isWalkListPlaying}
              mapCenterPoint={mapCenterPoint} // New prop
              animationControl={animationControl}
            />
            {renderCurrentView()}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
