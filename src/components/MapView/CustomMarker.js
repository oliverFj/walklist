//CustomMarker.js
import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import nodeImage from '../Images/MusicNode.png'; // Ensure this path is correct

const customIcon = new L.Icon({
    iconUrl: nodeImage,
    iconSize: [35, 35],
    iconAnchor: [17, 35],
    popupAnchor: [0, -35],
});

const CustomMarker = ({ position, title, description, onButtonClick, songs }) => (
    <Marker position={position} icon={customIcon}>
        <Popup>
            <div className="text-center text-gray-800">
                <strong>{title}</strong> <br /> {description}. <br />
                <button
                    className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => onButtonClick(songs)} // Pass songs here
                >
                    See walklist
                </button>
            </div>
        </Popup>
    </Marker>
);

export default CustomMarker;