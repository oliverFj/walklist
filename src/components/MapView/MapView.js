import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import CustomMarker from './CustomMarker';
import markersData from './PlaceholderData';

const MapAnimator = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.flyTo(center, map.getZoom());
    }
  }, [center, map]);
  
  return null;
};

const MapView = ({ isVisible, onMarkerSelect, isDefaultView }) => {
  const [markers, setMarkers] = useState(markersData);
  const [visibleTrails, setVisibleTrails] = useState({});
  const [centerPoint, setCenterPoint] = useState(null);

  useEffect(() => {
    if (isDefaultView) {
      setVisibleTrails({});
    }
  }, [isDefaultView]);

  const handleMarkerClick = (title, songs) => {
    console.log(title, songs);
    onMarkerSelect(title, songs);
    toggleTrailVisibility(title);

    const marker = markers.find(marker => marker.title === title);
    if (marker && marker.trail && marker.trail.length > 0) {
      setCenterPoint(marker.trail[0]); // Assuming trail[0] is the first point's [lat, lng]
    }
  };

  const toggleTrailVisibility = (title) => {
    setVisibleTrails(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <MapContainer center={[55.6861, 12.5732]} zoom={20} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapAnimator center={centerPoint} />
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
        const marker = markers.find(marker => marker.title === title);
        if (!marker || !marker.trail || marker.trail.length <= 1) return null;
        return <Polyline key={index} positions={marker.trail} color="red" />;
      })}
    </MapContainer>
  );
};

export default MapView;
