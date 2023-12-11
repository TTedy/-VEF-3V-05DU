import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import parkstadi from './parkstadi.json';
import { initializeApp } from 'firebase/app';  // Import initializeApp
import 'firebase/auth';
import 'firebase/firestore';
import db from './firebase-config';  // Make sure this import is correct

const firebaseConfig = {
  apiKey: "AIzaSyAfdMNAyBga0KjMsJF_u_LH7ScRxf5H9pQ",
  authDomain: "reactfirebase-40062.firebaseapp.com",
  projectId: "reactfirebase-40062",
  storageBucket: "reactfirebase-40062.appspot.com",
  messagingSenderId: "66072772218",
  appId: "1:66072772218:web:e78f07de16234fe19445c3"
};


// Initialize Firebase með gefnum stillingum
firebase.initializeApp(firebaseConfig);

// Skilgreina fall sem sýnir login-formið
const Login = () => {
  // Tveir stöðu breytur fyrir netfang og lykilorð
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Fall sem keyrir þegar ýtt er á "Login" hnappinn
  const handleLogin = async () => {
    try {
      // Innskrá notanda með gefnum upplýsingum
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('Logged in user:', user);
      setShowLogin(false);
      // Hægt er að bæta við fleiri virkni, eins og að senda notanda á önnur síðu eftir vel heppnaða innskráningu
    } catch (error) {
      console.error('Error during login:', error.message);
      setShowLogin(false);
      // Meðhöndla innskráningarvillu, til dæmis með því að sýna villuskilaboð notanda
    }  
    const correctlogin = () => {
    if (email === "gammi@gmail.com" && password === "123456") {
      console.log("login successful");
      setShowLogin(false);
    }
  }
  };



  // Breyta sem stjórnar sýningu login-forms
  const [showLogin, setShowLogin] = useState(false);

  // Fall sem sýnir/felur login-formið
  const toggleShowLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div>
      {showLogin ? (
        <div className="login-container">
          <h2>Login</h2>
          <div className="input-group">
            <label htmlFor="username">Netfang:</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Lykilorð:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button className="login-btn" onClick={handleLogin}>Login</button>
          <button className="cancel-btn" onClick={() => setShowLogin(false)}>Hætta við</button>
        </div>
      ) : (
        <div className="loginDesk" id="login-button" onClick={toggleShowLogin}>
          <a href="#">INNSKRÁ</a>
        </div>
      )}
    </div>
  );
};

// Fall sem sýnir aðalútlitið
function App() {
  // Breyta sem stjórnar því hvort við erum á símasníði eða stöðvum útliti
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  const [geojsonData, setGeojsonData] = useState(null);
  const [showDiv, setShowDiv] = useState(false);
  const myElement = document.getElementById('marker');

  // Fall sem keyrir þegar ýtt er á marki á kortinu
  const handleMarkerClick = () => {
    console.log('Merki ýtt á!');
    // Bættu við eigin virkni hér
  };

  // Fall sem sýnir/felur valmynd um að parka
  const toggleShowDiv = () => setShowDiv(!showDiv);

  // Fall sem felur valmyndina
  const confirmChoice = () => {
    setShowDiv(false);
  };

  // Nota useEffect til að hlusta á stærð glugga
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sækja GeoJSON gögn þegar komponenti er fyrst renderaður
  useEffect(() => {
    setGeojsonData(parkstadi);
  }, []);

  // Sækja GeoJSON gögn frá vefþjóni
  useEffect(() => {
    const fetchGeoJSON = async () => {
      try {
        const response = await fetch("parkstadi.json");

        if (!response.ok) {
          throw new Error(`HTTP villa! Stöða: ${response.status}`);
        }

        const data = await response.json();
        setGeojsonData(data);
        console.log('GeoJSON gögn hlaðin:', data);
      } catch (error) {
        console.log('Villa við að sækja GeoJSON gögn:', error);
      }
    };

    fetchGeoJSON();
  }, []);

  // Hlusta á ýmis atburði á merki, til að bæta við eigin virkni
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
          <h1>Þetta er símasniðsútlit</h1>
          <div className="mobile-view">
            {/* ... (þitt núverandi JSX kóði fyrir símasniðsútlitið) */}
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
                attribution='© OpenStreetMap aðilar'
              />
              {/* ... (annar kortahluti) */}
              <Marker id="marker" onClick={handleMarkerClick}>
                {geojsonData && <GeoJSON data={geojsonData} />}
                <Popup>
                  {/* ... (Efni í Popup glugga) */}
                </Popup>
              </Marker>
              {/* ... (þitt núverandi JSX kóði fyrir MapContainer) */}
              <div>
                {showDiv ? (
                  <div className="parkmenu container">
                    {/* ... (þitt núverandi JSX kóði fyrir parkmenu á símasniði) */}
                  </div>
                ) : (
                  <div
                    className="button"
                    id="park-button"
                    onClick={toggleShowDiv}
                  >
                    <a href="#">PARKERA</a>
                  </div>
                )}
              </div>
            </MapContainer>
          </div>
        </>
      ) : (
        <div className='container'>
          <div className="desktop-view flex flex-row" id="map">
            {/* ... (þitt núverandi JSX kóði fyrir stöðvutúlitið) */}
            <MapContainer
              center={[64.09, -21.8652]}
              zoom={12}
              className="mapContainer"
            >
              <TileLayer
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© OpenStreetMap aðilar'
              />
              {geojsonData && <GeoJSON data={geojsonData} />}
            </MapContainer>
            {/* ... (þitt núverandi JSX kóði fyrir stöðvutúlitið) */}
            <div className="">
              {showDiv ? (
                <div className="parkmenuDesk container">
                  <div className="" id="time">
                    <a href="#">TÍMI</a>
                  </div>
                  <div className="" id="date">
                    <a href="#">DAGSETNING</a>
                  </div>
                  <div
                    className=""
                    id="cancel"
                    onClick={() => setShowDiv(false)}
                  >
                    <a href="#">HÆTTA</a>
                  </div>
                  <div className="" id="confirm" onClick={confirmChoice}>
                    <a href="#">STAÐFESTA</a>
                  </div>
                </div>
              ) : (
                <div
                  className="buttonDesk"
                  id="park-button"
                  onClick={toggleShowDiv}
                >
                  <a href="#">PARKERA</a>
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
                  attribution='© OpenStreetMap aðilar'
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
