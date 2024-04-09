import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polyline, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import CustomMarker from './CustomMarker'; // Assuming CustomMarker is correctly implemented.
import markersData from './PlaceholderData'; // Static data for markers

// A utility function to delay execution, already well defined.
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));



const MapAnimator = ({ center, trail, isWalkListPlaying, animationControl }) => {
  const map = useMap();
  const stopAnimation = useRef(false);
  const currentFrameRef = useRef({ segment: 0, frame: 0 }); // Define currentFrameRef here

  useEffect(() => {
    const animateTrail = async () => {
      if (!isWalkListPlaying || trail.length < 2) return;

      const FRAME_DURATION = 2000;
      const FRAMES = 20;
      const { segment: startSegment, frame: startFrame } = currentFrameRef.current;

      for (let i = startSegment; i < trail.length - 1; i++) {
        const start = trail[i];
        const end = trail[i + 1];
        if (!start || !end) continue;

        for (let frame = startFrame; frame <= FRAMES; frame++) {
          if (stopAnimation.current) return;
          if (animationControl === 'pause') {
            currentFrameRef.current = { segment: i, frame };
            return;
          }

          const lat = start[0] + (end[0] - start[0]) * (frame / FRAMES);
          const lng = start[1] + (end[1] - start[1]) * (frame / FRAMES);
          if (isFinite(lat) && isFinite(lng)) {
            map.panTo([lat, lng], { animate: true });
            await sleep(FRAME_DURATION / FRAMES);
          }
        }

        currentFrameRef.current = { segment: i + 1, frame: 0 };
      }

      currentFrameRef.current = { segment: 0, frame: 0 };
      stopAnimation.current = false;
    };


    if (center) {
      map.flyTo(center, map.getZoom());
    }

    if (animationControl === 'resume' && isWalkListPlaying) {
      stopAnimation.current = false;
      animateTrail();
    }

    return () => {
      stopAnimation.current = true;
    };
  }, [center, map, trail, isWalkListPlaying, animationControl]);

  return null;
};


const MapView = ({ isVisible, onMarkerSelect, isDefaultView, isWalkListPlaying, mapCenterPoint, animationControl }) => {
  const [markers] = useState(markersData);
  const [visibleTrails, setVisibleTrails] = useState({});
  const [selectedTrail, setSelectedTrail] = useState([]);

  useEffect(() => {
    if (isDefaultView) {
      setVisibleTrails({});
      setSelectedTrail([]);
    }
  }, [isDefaultView]);

  const handleMarkerClick = (title, songs, trail) => {
    onMarkerSelect(title, songs, trail);
    toggleTrailVisibility(title);
    setSelectedTrail(trail); // Consider ensuring this triggers animation start.
  };

  const toggleTrailVisibility = (title) => {
    setVisibleTrails(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <MapContainer center={[55.6861, 12.5732]} zoom={20} style={{ height: '100%', width: '100%' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapAnimator
        center={mapCenterPoint}
        trail={selectedTrail}
        isWalkListPlaying={isWalkListPlaying}
        animationControl={animationControl}
      />
      {isVisible && markers.map((marker, index) => (
        <CustomMarker
          key={index}
          position={marker.position}
          title={marker.title}
          description={marker.description}
          songs={marker.songs}
          onButtonClick={() => handleMarkerClick(marker.title, marker.songs, marker.trail)}
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
