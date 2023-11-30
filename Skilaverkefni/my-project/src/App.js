import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import './App.css';
import parkstadi from './parkstadi.json'; // Import JSON file directly

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // sets default size between mobile and desktop
  const [geojsonData, setGeojsonData] = useState(null); // Define a state variable for GeoJSON data
  const [showDiv, setShowDiv] = useState(false); // Define a state variable for the div

  // Define a state variable for the pin's coordinates
  const [pinCoords, setPinCoords] = useState([64.09, -21.8652]); // Default to Reykjavik

  const toggleShowDiv = () => {
    setShowDiv(true); // shows the div
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const comfirmchoice = () => {

    setShowDiv(false);
  };

  const handleMarkerDrag = (e) => {
    // Get the new position when the marker is dragged
    const newPosition = e.target.getLatLng();
    // Update the pinCoords state with the new position
    setPinCoords([newPosition.lat, newPosition.lng]);
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
              
              

              {showDiv ? null : <div className="pin1"></div>}

              <div>
              {showDiv ? (
                <div className="parkmenu container">
                  <div className="" id="time">
                    <a href="#">time</a>
                  </div>
                  <div className="" id="date">
                    <a href="#">date</a>
                  </div>

                  <div className="" id="cancel" onClick={() => setShowDiv(false)}>
                    <a href="#">cancel</a>
                  </div>
                  <div className="" id="comfirm" onClick={() => comfirmchoice()}>
                    <a href="#">comfirm</a>
                  </div>
                </div>
              ) : (
                <div className="button" id="park-button" onClick={toggleShowDiv}>
                  <a href="#">PARK</a>
                </div>
              )}
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
              onmoveend={(e) => {
                // Get the current center of the map
                const center = e.target.getCenter();
                // Update the pinCoords state with the new center
                setPinCoords([center.lat, center.lng]);
              }}
            >
              <TileLayer
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© OpenStreetMap contributors'
              />

              {/* Render GeoJSON data */}
              {geojsonData && <GeoJSON data={geojsonData} />}

              
              {/* Replace the div with className "pin1" with a Marker component */}
              <div className="pin1"></div>

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

                  <div className="" id="cancel" onClick={() => setShowDiv(false)}>
                    <a href="#">cancel</a>
                  </div>
                  <div className="" id="comfirm" onClick={() => comfirmchoice()}>
                    <a href="#">comfirm</a>
                  </div>
                </div>
              ) : (
                <div className="button" id="park-button" onClick={toggleShowDiv}>
                  <a href="#">PARK</a>
                </div>
              )}
            </div>
  


            </MapContainer>
        </div>
      )}
    </div>
  );
}

export default App;