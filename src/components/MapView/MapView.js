// MapView.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapView = () => {
  const position = [55.6861, 12.5701]; // Coordinates for the Botanical Garden in Copenhagen

  return (
    <MapContainer center={position} zoom={20} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          Botanical Garden <br /> Copenhagen.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;