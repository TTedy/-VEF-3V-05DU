import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {isMobile ? (
        
        // Content for mobile
        <h1>This is a mobile view</h1>
      
        ) : (

        // Content for larger screens
        <h1>This is a desktop view</h1>
      
      )}
    </div>
  );
}

export default App;
