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



  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);




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
  // Assuming you have some code that gets the coordinates and triggers this function
function handleMarkerClick(event) {
  // Extracting the coordinates from the event
  const { lat, lng } = event.latlng;

  // Saving the coordinates in a variable, array, or any data structure you prefer
  const savedCoords = { lat, lng };

  // Logging the coordinates to the console
  console.log('Clicked Marker Coordinates:', savedCoords);
}

// Example usage with a dummy event object (you would trigger this in your actual application)
const dummyEvent = {
  latlng: {
    lat: 40.7128, // Replace with actual latitude
    lng: -74.0060, // Replace with actual longitude
  },
};

// Triggering the handleMarkerClick function with the dummy event
handleMarkerClick(dummyEvent);


  const handleLogin = () => {
    correctLogin();
  };

  const correctLogin = () => {
    if (email === "gammi@gmail.com" && password === "123456") {
      console.log("Login successful");
      setIsLoggedIn(true);
      setShowLogin(false);
    }
  };

  {isLoggedIn && <span className="checkmark">placeholder</span>}



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



  const [showLogin, setShowLogin] = useState(false);

  const toggleShowLogin = () => {
    setShowLogin(!showLogin);
  };



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
                  
                    <button class="login-btn" onClick={handleLogin}>Login</button>
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

                <Marker position={pinCoords} onClick={handleMarkerClick}>
                  <Popup>A popup!</Popup>
                </Marker>

              </MapContainer>
            </div>

          </div>
        </div>
      )};

    </div>
  );
}

export default App;