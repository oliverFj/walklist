// TrailAnimation.js
import React, { useState, useEffect, useRef } from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { Howl } from 'react-howler';

const TrailAnimation = ({ trail, mp3Url, isPlaying, onEnd }) => {
  const [currentPointIndex, setCurrentPointIndex] = useState(0);
  const howlerRef = useRef(null);

  // Create a custom icon for the marker
  const blueDotIcon = new L.Icon({
    iconUrl: 'path/to/blue-dot-icon.png',
    iconSize: [25, 25],
    iconAnchor: [12.5, 12.5],
  });

  useEffect(() => {
    if (isPlaying) {
      // Play the MP3 file
      if (howlerRef.current) {
        howlerRef.current.play();
      }

      // Start or resume the animation
      const intervalId = setInterval(() => {
        setCurrentPointIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex >= trail.length) {
            clearInterval(intervalId);
            onEnd(); // Call the onEnd callback when the animation finishes
            return prevIndex; // Keep the last index to avoid going out of bounds
          }
          return nextIndex;
        });
      }, 1000); // Adjust the interval time based on your trail and audio length

      return () => clearInterval(intervalId);
    } else {
      // Pause the animation and the MP3 file
      if (howlerRef.current) {
        howlerRef.current.pause();
      }
    }
  }, [isPlaying, trail.length, onEnd]);

  return (
    <>
      {trail.length > 0 && (
        <Marker
          position={trail[currentPointIndex]}
          icon={blueDotIcon}
        />
      )}
      <Howl
        ref={howlerRef}
        src={[mp3Url]}
        playing={isPlaying}
        onEnd={() => onEnd()}
      />
    </>
  );
};

export default TrailAnimation;
