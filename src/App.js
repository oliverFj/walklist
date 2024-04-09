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


// Denne funktion styrer hvilken dele af applikationen der skal vises
// Delene er diverse komponenter der bliver loaded ind efter behov.
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


  // Denne funktion åbner login komponenten (hvis der var en forbindelse til spotifys api)
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  // Denne funktion åbner komponenten til oprettelse af walk-lister
  const handleCreateWalkList = () => {
    setCurrentView('createWalkList');
    setTopBarMessage('New walk-list'); // Her opdateres topbar beskeden
  };

  const handleViewDetails = () => {
    setCurrentView('viewDetails');
    setTopBarMessage('Viewing walk-list details');
  };

  // Denne funktion åbner komponenten der indeholder optageknappen.
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

 // Her har jeg en komponent der håndterer markørerne.
 // Hvert element i markørlisten bliver automatisk placeret på kortet ud fra deres start koordinater.
 // Den tager elementer som titlen og sangene fra walk-listen samt ruten som er en array af koordinater.
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

  // TODO: Det her virker ikke korrekt.
  const handlePauseAnimation = () => {
    setAnimationControl('pause');
  };

  const handleResumeAnimation = () => {
    setAnimationControl('resume');
  };

  // esc knappen vender tilbage til default view.
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
  // og hvilke interaktive elementer (knapper) der er adgang til.
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
            {/* Her bliver Mapview loaded. Det gør den seperat fra andre componenter, sådan at 
            den ikke skal reloades hver gang et komponent skiftes ud. */}
            <MapView
              onMarkerSelect={handleMarkerSelect}
              isVisible={areMarkersVisible}
              isDefaultView={currentView === 'default'}
              isWalkListPlaying={isWalkListPlaying}
              mapCenterPoint={mapCenterPoint}
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
