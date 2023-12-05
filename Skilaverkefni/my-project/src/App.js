import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import parkstadi from './parkstadi.json';





function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  const [geojsonData, setGeojsonData] = useState(null);
  const [showDiv, setShowDiv] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const [pinCoords, setPinCoords] = useState({ lat: 64.09, lng: -21.8652 });

  const toggleShowDiv = () => setShowDiv(!showDiv);
  const confirmChoice = () => {
    // You can use pinCoords here
    console.log(pinCoords);
    setShowDiv(false);
  };
  
  


  const handleMarkerDrag = (event) => {
    // i need the data for the marker position
    // so i need the setpincoords
    if (event.target && event.target.getLatLng) {
      console.log('Marker Position:', event.target.getLatLng());
    }
  };





 /*
  useEffect(() => {
    const logMarkerPosition = setInterval(() => {
      console.log('Marker Position:', setPinCoords);
    }, 1000);

    return () => clearInterval(logMarkerPosition);
  }, [setPinCoords]);
  
  */






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
              markerPosition={pinCoords}
              showDiv={showDiv}
              onMarkerDrag={handleMarkerDrag}
              onToggleShowDiv={toggleShowDiv}
              onConfirmChoice={confirmChoice}
              geojsonData={geojsonData}
            >
              <TileLayer
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© OpenStreetMap contributors'
              />

              {geojsonData && <GeoJSON data={geojsonData} />}

              <Marker position={pinCoords} draggable={true} onDrag={handleMarkerDrag}>
                <Popup>A popup!</Popup>
              </Marker>

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
      ) 
      
      
      
      : 
      
      
      
      (
        <div className="desktop-view">
          <h1>This is a desktop view</h1>
          <MapContainer
            center={[64.09, -21.8652]}
            zoom={12}
            className="mapContainer"
            dragging={true}
            onMarkerDrag={handleMarkerDrag}
            markerPosition={pinCoords}
            onToggleShowDiv={toggleShowDiv}
          >
            <TileLayer
              url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© OpenStreetMap contributors'
            />

            {geojsonData && <GeoJSON data={geojsonData} />}

            map.setview(new L.LatLng(40.737, -73.923));

            <Marker position={pinCoords} draggable={true} onDrag={handleMarkerDrag}>
              <Popup>A popup!</Popup>
            </Marker>

            <div>
              {showDiv ? (
                <div className="parkmenu container">
                  <div className="" id="time"><a href="#">TIME</a></div>
                  <div className="" id="date"><a href="#">DATE</a></div>
                  <div className="" id="cancel" onClick={() => setShowDiv(false)}><a href="#">CANCEL</a></div>
                  <div className="" id="confirm" onClick={confirmChoice}><a href="#">CONFIRM</a></div>
                  {confirmed && <div className="check-mark">✓</div>}
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