import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import './App.css';
import parkstadi from './parkstadi.json'; // Import JSON file directly

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [geojsonData, setGeojsonData] = useState(null);

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
    // Set GeoJSON data from the imported file
    setGeojsonData(parkstadi);
  }, []);

  useEffect(() => {
    // Fetch GeoJSON data from the file
    const fetchGeoJSON = async () => {
      try {
        // const response = await fetch('./parkstadi.json');
        const response = await fetch("parkstadi.json");
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setGeojsonData(data);
        console.log('GeoJSON data loaded:', data);
      } catch (error) {
        console.error('Error fetching GeoJSON data:', error);
      }
    };

    fetchGeoJSON();

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

              {/* Render GeoJSON data */}
              {geojsonData && <GeoJSON data={geojsonData} />}
              
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
              
              

              <div class="pin1"></div>
              <div class="button">
                <a href="#">PARK</a>
              </div>
            


            </MapContainer>
          </div>
        </>
      ) : (
        // Content for larger screens (Desktop view)
        <div className="desktop-view">
          <h1>This is a desktop view</h1>
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

              {/* Render GeoJSON data */}
              {geojsonData && <GeoJSON data={geojsonData} />}
            
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

              

              
              <div class="pin1"></div>
              
              <div class="button">
                <a href="#">PARK</a>
              </div>
  


            </MapContainer>
        </div>
      )}
    </div>
  );
}

export default App;