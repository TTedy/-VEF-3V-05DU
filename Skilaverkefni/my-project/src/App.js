import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import './App.css';
import parkstadi from './parkstadi.json';






function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  const [geojsonData, setGeojsonData] = useState(null);
  const [showDiv, setShowDiv] = useState(false);

  const [clickedCoords, setClickedCoords] = useState(null);


  const handleClick = (event) => {
    console.log('Handling click:', event.latlng);
    setClickedCoords({ lat: event.latlng.lat, lng: event.latlng.lng });
    console.log('State after click:', clickedCoords);
  };
  
  
  /*
  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log('Clicked Coords:', clickedCoords);
      // You can add any additional logic here
    }, 1500);
  
    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [clickedCoords]); // Include clickedCoords in the dependency array
  */

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


  return (
    <div>
      {isMobile ? (
        <>
          <h1>This is a mobile view</h1>
          <div className="mobile-view">
            <MapContainer
              center={[64.09, -21.8652]}
              zoom={12}
              showDiv={showDiv}
              onToggleShowDiv={toggleShowDiv}
              onConfirmChoice={confirmChoice}
              geojsonData={geojsonData}
              onClick={handleClick}
            >
              <TileLayer
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© OpenStreetMap contributors'
              />

              {geojsonData && <GeoJSON data={geojsonData} />}

              <div>
                {showDiv ? (
                  <div className="parkmenu container">
                    <h1>viltu leggja við?</h1>
                    <div className="" id="time">
                      <a href="#">time</a>
                    </div>
                    <div className="" id="date">
                      <a href="#">date</a>
                    </div>
                    <div
                      className=""
                      id="cancel"
                      onClick={() => setShowDiv(false)}
                    >
                      <a href="#">cancel</a>
                    </div>
                    <div className="" id="confirm" onClick={confirmChoice}>
                      <a href="#">confirm</a>
                    </div>
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
          <div className="desktop-view" id="map">
            <h1>This is a desktop view</h1>
            <MapContainer
              center={[64.09, -21.8652]}
              zoom={12}
              className="mapContainer"
              onToggleShowDiv={toggleShowDiv}
              onClick={handleClick}
            >
              <TileLayer
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© OpenStreetMap contributors'
              />

              {geojsonData && <GeoJSON data={geojsonData} />}




              <div>
                {showDiv ? (
                  <div className="parkmenu container">
                    <h1>viltu leggja við?</h1>
                    <div className="" id="time">
                      <a href="#">time</a>
                    </div>
                    <div className="" id="date">
                      <a href="#">date</a>
                    </div>
                    <div
                      className=""
                      id="cancel"
                      onClick={() => setShowDiv(false)}
                    >
                      <a href="#">cancel</a>
                    </div>
                    <div className="" id="confirm" onClick={confirmChoice}>
                      <a href="#">confirm</a>
                    </div>
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
        </div>
      )}
    </div>
  );
}


export default App;