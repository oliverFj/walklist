import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import CustomMarker from './CustomMarker';
import markersData from './PlaceholderData';

//MapView er en komponent der tager isVisible, onMarkerSelect og isDefaultView som props
const MapView = ({ isVisible, onMarkerSelect, isDefaultView }) => {
  const [markers, setMarkers] = useState(markersData);
  const [visibleTrails, setVisibleTrails] = useState({});

  //Denne useEffect styre hvilke stier der er synlige

  useEffect(() => {
    if (isDefaultView) {
      setVisibleTrails({});
    }
  }, [isDefaultView]);
  //Denne funktion håndterer klik på markører
  //Den tager titlen og sangene fra markøren og sender dem videre til App.js
  const handleMarkerClick = (title, songs) => {
    console.log(title, songs);
    onMarkerSelect(title, songs);
    toggleTrailVisibility(title);
  };
  //Denne funktion håndterer synligheden af stierne
  //den bruger titlen på stien til at finde den rigtige sti og skifter synligheden
  const toggleTrailVisibility = (title) => {
    setVisibleTrails((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  //Denne funktion returnere kortet med markører og stier
  //Den bruger isVisible til at styre om markørerne skal vises
  //Den bruger også visibleTrails til at styre om stierne skal vises
  //Den bruger handleMarkerClick til at håndtere klik på markører og handleMarkerSelect til at sende data videre
  return (
    <MapContainer center={[55.6861, 12.5732]} zoom={20} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {isVisible &&
        markers.map((marker, index) => (
          //CustomMarker er en komponent der tager position, titel, beskrivelse og sange som props
          <CustomMarker
            key={index}
            position={marker.position}
            title={marker.title}
            description={marker.description}
            songs={marker.songs}
            onButtonClick={() => handleMarkerClick(marker.title, marker.songs)}
          />
        ))}
      {Object.entries(visibleTrails).map(([title, isVisible], index) => {
        if (!isVisible) return null;
        const marker = markers.find((marker) => marker.title === title);
        if (!marker || !marker.trail || marker.trail.length <= 1) return null;
        return <Polyline key={index} positions={marker.trail} color="red" />;
      })}
    </MapContainer>
  );
};

export default MapView;
