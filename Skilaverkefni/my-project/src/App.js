import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import parkstadi from './parkstadi.json';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [geojsonData, setGeojsonData] = useState(null);
  const [showDiv, setShowDiv] = useState(false);
  const [pinCoords, setPinCoords] = useState([64.09, -21.8652]);
  const [markerPosition, setMarkerPosition] = useState(pinCoords);

  const toggleShowDiv = () => setShowDiv(!showDiv);

  const handleMarkerDrag = (event) => {
    setMarkerPosition(event.target.getLatLng());
  };

  const handleMapMove = (e) => {
    const center = e.target.getCenter();
    setPinCoords([center.lat, center.lng]);
  };

  const handleResize = () => setIsMobile(window.innerWidth <= 768);

  const confirmChoice = () => setShowDiv(false);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    console.log('pincords', pinCoords);
  }, [pinCoords]);

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

  return (
    <div>
      {isMobile ? (
        <>
          <h1>This is a mobile view</h1>
          <div className="mobile-view">
            <MapContainer center={[64.09, -21.8652]} zoom={12} className="mapContainer" dragging={true}>
              <TileLayer
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© OpenStreetMap contributors'
              />

              {geojsonData && <GeoJSON data={geojsonData} />}

              {showDiv ? null : <div className="pin1"></div>}

              <div>
                {showDiv ? (
                  <div className="parkmenu container">
                    <div className="" id="time"><a href="#">time</a></div>
                    <div className="" id="date"><a href="#">date</a></div>
                    <div className="" id="cancel" onClick={() => setShowDiv(false)}><a href="#">cancel</a></div>
                    <div className="" id="confirm" onClick={confirmChoice}><a href="#">confirm</a></div>
                  </div>
                ) : (
                  <div className="button" id="park-button" onClick={toggleShowDiv}><a href="#">PARK</a></div>
                )}
              </div>
            </MapContainer>
          </div>
        </>
      ) : (
        <div className="desktop-view">
          <h1>This is a desktop view</h1>
          <MapContainer
            center={[64.09, -21.8652]}
            zoom={12}
            className="mapContainer"
            dragging={true}
            onmoveend={(e) => {
              const center = e.target.getCenter();
              setPinCoords([center.lat, center.lng]);
            }}
          >
            <TileLayer
              url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© OpenStreetMap contributors'
            />

            {geojsonData && <GeoJSON data={geojsonData} />}

            <Marker position={pinCoords} draggable={true} onDrag={handleMarkerDrag} >
              <Popup>A popup!</Popup>
            </Marker>

            <div>
              {showDiv ? (
                <div className="parkmenu container">
                  <h1>viltu leggja við?</h1>
                  <div className="" id="time"><a href="#">time</a></div>
                  <div className="" id="date"><a href="#">date</a></div>
                  <div className="" id="cancel" onClick={() => setShowDiv(false)}><a href="#">cancel</a></div>
                  <div className="" id="confirm" onClick={confirmChoice}><a href="#">confirm</a></div>
                </div>
              ) : (
                <div className="button" id="park-button" onClick={toggleShowDiv}><a href="#">PARK</a></div>
              )}
            </div>
          </MapContainer>
        </div>
      )}
    </div>
  );
}

export default App;
