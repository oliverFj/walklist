// MapView.js
import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import CustomMarker from './CustomMarker';
import markersData from './PlaceholderData'; // Update the import path as necessary

const MapView = () => {
  const [markers, setMarkers] = useState(markersData);
  const [showPath, setShowPath] = useState(false);

  const togglePathVisibility = () => {
    setShowPath(!showPath);
    // Logic to dynamically hide markers or show the path
  };

  return (
    <MapContainer center={[55.6861, 12.5732]} zoom={20} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers.map((marker, index) => (
        <CustomMarker
          key={index}
          position={marker.position}
          title={marker.title}
          description={marker.description}
          onButtonClick={togglePathVisibility}
        />
      ))}
      {/* Conditionally render path here based on `showPath` */}
    </MapContainer>
  );
};

export default MapView;

