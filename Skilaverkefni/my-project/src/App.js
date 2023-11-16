import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import './App.css';

// ... (previous imports)

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const mainButtonStyleContainer = {
    position: 'absolute',
    width: '100%',
    bottom: '20px',
    display: 'flex',
    justifyContent: 'center',
  };
  const buttonStyle = {
    width: '50px',
    height: '50px',
    backgroundColor: 'blue', // Replace with your desired color or use the 'primary' class
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    position: 'absolute',
    left: '45%',
    zIndex: 1000,
  };

  const mainButtonStyle = {
    width: '100px', // Adjust the width as needed
    height: '40px', // Adjust the height as needed
    backgroundColor: 'green', // Replace with your desired color
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '5px', // Adjust the border radius as needed
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)', // Center the button horizontally
    zIndex: 1000,
  };

  return (
    <div>
      {isMobile ? (
        // Content for mobile
        <>
          <h1>This is a mobile view</h1>
          <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
            <MapContainer
              center={[64.09, -21.8652]} // Centered on Reykjavik
              zoom={12}
              style={{ height: '100%', width: '100%', position: 'absolute' }}
              dragging={true} // Allow dragging
            >
              <TileLayer
                url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© OpenStreetMap contributors'
              />

              <div>
                {[1, 2, 3].map((item, index) => (
                  <div
                    key={item}
                    style={{
                      ...buttonStyle,
                      top: `${10 + index * 60}px`, // Adjust the vertical position
                    }}
                  >
                    <a
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        lineHeight: '50px',
                        textDecoration: 'none', // Optional: Remove underline from anchor
                      }}
                      href="#"
                    >
                      Click me!
                    </a>
                  </div>
                ))}
              </div>

            <div style={mainButtonStyleContainer}>
              <div style={mainButtonStyle}>
                <a
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    textDecoration: 'none', // Optional: Remove underline from anchor
                  }}
                  href="#"
                >
                  Select
                </a>
              </div>
            </div>




            </MapContainer>
          </div>
        </>
      ) : (
        // Content for larger screens
        <div style={{ height: '80vh', width: '80%', margin: 'auto' }}>
          <h1>This is a desktop view</h1>
        </div>
      )}
    </div>
  );
}

export default App;
