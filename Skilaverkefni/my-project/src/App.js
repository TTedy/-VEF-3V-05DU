import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import parkstadi from './parkstadi.json';
import firebase from 'firebase/app';
import 'firebase/auth';


import { firebaseConfig } from './firebase-config.js';

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  const [geojsonData, setGeojsonData] = useState(null);
  const [showDiv, setShowDiv] = useState(false);

  firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('Logged in user:', user);
    } catch (error) {
      console.error('Error during login:', error.message);
    }
  };

  const [showLogin, setShowLogin] = useState(false);

  const toggleShowLogin = () => {
    setShowLogin(!showLogin);
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
            >
              <TileLayer
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© OpenStreetMap contributors'
              />
              <marker>
                {geojsonData && <GeoJSON data={geojsonData} />}
                <popup>
                    popup
                </popup>
              </marker>
              <div>
                {showDiv ? (
                  <div className="parkmenu container">
                    <div className="" id="time">
                      <a href="#">TIME</a>
                    </div>
                    <div className="" id="date">
                      <a href="#">DATE</a>
                    </div>
                    <div
                      className=""
                      id="cancel"
                      onClick={() => setShowDiv(false)}
                    >
                      <a href="#">CANCEL</a>
                    </div>
                    <div className="" id="confirm" onClick={confirmChoice}>
                      <a href="#">CONFIRM</a>
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
          <div className="desktop-view flex flex-row" id="map">
            <div className="">
              {showDiv ? (
                <div className="parkmenuDesk container">
                  <div className="" id="time">
                    <a href="#">TIME</a>
                  </div>
                  <div className="" id="date">
                    <a href="#">DATE</a>
                  </div>
                  <div
                    className=""
                    id="cancel"
                    onClick={() => setShowDiv(false)}
                  >
                    <a href="#">CANCEL</a>
                  </div>
                  <div className="" id="confirm" onClick={confirmChoice}>
                    <a href="#">CONFIRM</a>
                  </div>
                </div>
              ) : (
                <div
                  className="buttonDesk"
                  id="park-button"
                  onClick={toggleShowDiv}
                >
                  <a href="#">PARK</a>
                </div>
              )}
              <div>
                {showLogin ? (
                  <div class="login-container">
                    <h2>Login</h2>
                  
                    <div class="input-group">
                      <label for="username">Username:</label>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  
                    <div class="input-group">
                      <label for="password">Password:</label>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                  
                    <button class="login-btn" onclick="handleLogin()">Login</button>
                    <button class="cancel-btn" onClick={() => setShowLogin(false)}>Cancel</button>
                  </div>
                ) : (
                  <div className="loginDesk" 
                  id="login-button" 
                  onClick={toggleShowLogin}
                  >
                    <a href="#">LOGIN</a>
                  </div>
                )}
              </div>
            </div>
              
            <div>    
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
            </div>

          </div>
        </div>
      )};

    </div>
  );
}
};