import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import './App.css';
import parkstadi from './parkstadi.json';
import { getDatabase } from "firebase/database";

export const db = getDatabase(app);



function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  const [geojsonData, setGeojsonData] = useState(null);
  const [showDiv, setShowDiv] = useState(false);
  const myElement = document.getElementById('marker');
  const handleMarkerClick = () => {
    console.log('Marker pressed!');
  };
  

  const toggleShowDiv = () => setShowDiv(!showDiv);
  const confirmChoice = () => {
    setShowDiv(false);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setGeojsonData(parkstadi);
  }, []);

  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const response = await fetch("parkstadi.json");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setGeojsonData(data);
        console.log('GeoJSON data loaded:', data);
      } catch (error) {
        console.log('Error fetching GeoJSON data:', error);
      }
    };

    fetchGeoJSON();
  }, []);

  useEffect(() => {
    const handleMarkerClick = () => {
      // Perform actions when the marker is pressed
      console.log('Marker pressed!');
      // Add your custom logic here
    };

    if (myElement) {
      myElement.addEventListener('click', handleMarkerClick);
    }

    return () => {
      // Cleanup the event listener when the component unmounts
      if (myElement) {
        myElement.removeEventListener('click', handleMarkerClick);
      }
    };
  }, [myElement]);

  return (
    <div>
      {isMobile ? (
        <>
          <h1>This is a mobile view</h1>
          <div className="mobile-view">
            {/* ... (your existing mobile view JSX code) */}
            <MapContainer
              center={[64.09, -21.8652]}
              zoom={12}
              showDiv={showDiv}
              onToggleShowDiv={toggleShowDiv}
              onConfirmChoice={confirmChoice}
              geojsonData={geojsonData}
              style={{ height: '100vh' }}
            >
              <TileLayer
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© OpenStreetMap contributors'
              />
              {/* ... (other map components) */}
              <Marker id="marker" onClick={handleMarkerClick}>
                {geojsonData && <GeoJSON data={geojsonData} />}
                <Popup>
                </Popup>
              </Marker>
              {/* ... (your existing MapContainer JSX code) */}
              <div>
                {showDiv ? (
                  <div className="parkmenu container">
                    {/* ... (your existing mobile view parkmenu JSX code) */}
                  </div>
                ) : (
                  <div
                    className="button"
                    id="park-button"
                    onClick={toggleShowDiv}
                  >
                    <a href="#">PARK</a>
                  </div>
                )}
              </div>
            </MapContainer>
          </div>
        </>
      ) : (
        <div className='container'>
          <div className="desktop-view flex flex-row" id="map">
            {/* ... (your existing desktop view JSX code) */}
            <MapContainer
              center={[64.09, -21.8652]}
              zoom={12}
              className="mapContainer"
            >
              <TileLayer
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© OpenStreetMap contributors'
              />
              {geojsonData && <GeoJSON data={geojsonData} />}
            </MapContainer>
            {/* ... (your existing desktop view JSX code) */}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;