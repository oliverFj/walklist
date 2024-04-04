import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import CustomMarker from './CustomMarker';
import markersData from './PlaceholderData';

const MapView = ({ isVisible, onMarkerSelect, isDefaultView }) => {
  const [markers, setMarkers] = useState(markersData);
  const [visibleTrails, setVisibleTrails] = useState({});

  useEffect(() => {
    if (isDefaultView) {
      // Reset visible trails when returning to default view
      setVisibleTrails({});
    }
  }, [isDefaultView]); // Listen for changes to isDefaultView

  const handleMarkerClick = (title, songs) => {
    console.log(title, songs);
    onMarkerSelect(title, songs);
    toggleTrailVisibility(title);
  };

  const toggleTrailVisibility = (title) => {
    setVisibleTrails((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <MapContainer center={[55.6861, 12.5732]} zoom={20} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {isVisible &&
        markers.map((marker, index) => (
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
