import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './App.css';
import parkstadi from './parkstadi.json';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAfdMNAyBga0KjMsJF_u_LH7ScRxf5H9pQ",
  authDomain: "reactfirebase-40062.firebaseapp.com",
  projectId: "reactfirebase-40062",
  storageBucket: "reactfirebase-40062.appspot.com",
  messagingSenderId: "66072772218",
  appId: "1:66072772218:web:e78f07de16234fe19445c3"
};

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [geojsonData, setGeojsonData] = useState(null);
  const [showDiv, setShowDiv] = useState(false);
  let [pinCoords, setPinCoords] = useState({ lat: 64.09, lng: -21.8652 });


  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();

  const toggleShowDiv = () => setShowDiv(!showDiv);

  const handleMarkerDrag = (event) => {
    if (event.target && event.target.getLatLng) {
      const { lat, lng } = event.target.getLatLng();
      pinCoords({ lat, lng });
    }
  }

  const handleMapMove = (e) => {
    if (e.target && e.target.getCenter) {
      const center = e.target.getCenter();
      pinCoords({ lat: center.lat, lng: center.lng });
    }
  };

  const handleResize = () => setIsMobile(window.innerWidth <= 768);

  const confirmChoice = async () => {
    try {
      // Get the current user
      const user = firebase.auth().currentUser;
  
      // Ensure the user is authenticated
      if (user) {
        // Get the current time and date
        const currentDate = new Date().toLocaleDateString();
        const currentTime = new Date().toLocaleTimeString();
  
        // Create the data to be stored
        const confirmationData = {
          userId: user.uid,
          time: currentTime,
          date: currentDate,
          // Add any additional data you want to store
        };
  
        // Write the data to Firebase
        await database.ref('confirmations').push(confirmationData);
  
        // Hide the confirmation dialog
        setShowDiv(false);
      } else {
        console.log('User not authenticated.');
      }
    } catch (error) {
      console.error('Error confirming choice:', error);
    }
  };
  

  useEffect(() => {
    const logMarkerPosition = setInterval(() => {
      console.log('Marker Position:', pinCoords);
    }, 1000);

    return () => clearInterval(logMarkerPosition);
  }, [pinCoords]);

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
          <div className="desktop-view">
          <h1>This is a desktop view</h1>
          <MapContainer
            center={[64.09, -21.8652]}
            zoom={12}
            className="mapContainer"
            dragging={true}
            onmoveend={(e) => {
              if (e.target && e.target.getCenter) {
                const center = e.target.getCenter();
                setPinCoords({ lat: center.lat, lng: center.lng });
              }
            }}
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
              if (e.target && e.target.getCenter) {
                const center = e.target.getCenter();
                setPinCoords({ lat: center.lat, lng: center.lng });
              }
            }}
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
