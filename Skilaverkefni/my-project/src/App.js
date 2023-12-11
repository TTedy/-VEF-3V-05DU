import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import parkstadi from './parkstadi.json';
import firebase from 'firebase/app';
import firebaseConfig from '../public/firebase-config'; // Adjust the path if needed
import 'firebase/auth';

firebase.initializeApp(firebaseConfig);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('Logged in user:', user);
      // You can add further logic like redirecting to a different page upon successful login
    } catch (error) {
      console.error('Error during login:', error.message);
      // Handle login error, e.g., display an error message to the user
    }
  };

  const [showLogin, setShowLogin] = useState(false);

  const toggleShowLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      {showLogin ? (
        <div className="login-container">
          <h2>Login</h2>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="login-btn" onClick={handleLogin}>Login</button>
          <button className="cancel-btn" onClick={() => setShowLogin(false)}>Cancel</button>
        </div>
      ) : (
        <div className="loginDesk" id="login-button" onClick={toggleShowLogin}>
          <a href="#">LOGIN</a>
        </div>
      )}
    </div>
  );
};

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  const [geojsonData, setGeojsonData] = useState(null);
  const [showDiv, setShowDiv] = useState(false);
  const myElement = document.getElementById('marker');

  const handleMarkerClick = () => {
    console.log('Marker pressed!');
    // Add your custom logic here
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
    if (myElement) {
      myElement.addEventListener('click', handleMarkerClick);
    }

    return () => {
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
                  {/* ... (Popup content) */}
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
                <Login />
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
      )}
    </div>
  );
}

export default App;
