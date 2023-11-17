// App.js

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
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

  return (
    <div>
      {isMobile ? (
        // Content for mobile
        <>
          <h1>This is a mobile view</h1>
          <div className="mobile-view">
            <MapContainer
              center={[64.09, -21.8652]} // Centered on Reykjavik
              zoom={12}
              className="mapContainer"
              dragging={true} // Allow dragging
            >
              <TileLayer
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© OpenStreetMap contributors'
              />

              <div>
                {[1].map((item, index) => (
                  <div
                    key={item}
                    className="mapButton"
                    style={{
                      top: `${10 + index * 60}px`, // Adjust the vertical position
                    }}
                  >
                    <a className="buttonLink" href="#">
                      <img className='' src='/menuicon.svg' alt="Menu Icon" />
                    </a>
                  </div>
                ))}
              </div>
              <div className="mapMainButtonContainer">
              <div className="mapMainButton">
                <a className="buttonLink" href="#">
                  Select
                </a>
              </div>
            </div>
            
            </MapContainer>
          </div>
        </>
      ) : (
        // Content for larger screens
        <div className="desktop-view">
          <h1>This is a desktop view</h1>
        </div>
      )}
    </div>
  );
}

export default App;
