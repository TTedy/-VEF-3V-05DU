import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-streetview/dist/leaflet-streetview.js';
import 'leaflet-streetview/dist/leaflet-streetview.css';
import './App.css';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Initialize Leaflet Street View once the component is mounted
    const mapOptions = {
      center: [37.7749, -122.4194], // Default center (San Francisco)
      zoom: 12, // Default zoom level
    };

    const map = L.map('myMap', mapOptions);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Initialize Leaflet Street View
    const streetViewOptions = {
      position: 'bottomright', // Change the position as needed
    };
    const streetView = L.control.streetview(streetViewOptions).addTo(map);

    return () => {
      // Clean up resources on component unmount
      map.remove();
    };
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div>
      {isMobile ? (
        // Content for mobile
        <>
          <h1>This is a mobile view</h1>
          <div id="myMap" style={{ height: '400px', width: '100%' }}></div>
        </>
      ) : (
        // Content for larger screens
        <h1>This is a desktop view</h1>
      )}
    </div>
  );
}

export default App;
