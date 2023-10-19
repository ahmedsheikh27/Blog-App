import React, {useState, useEffect} from 'react'
import Navbar from './components/navbar/Navbar'
import './App.css'
import Footer from './components/footer/Footer'
import Loader from './components/loader/Loader'

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async operation
    setTimeout(() => {
      setLoading(false); // Loading complete
    }, 4000);
  }, []);
    return (
    <>
    {
      loading?
      <Loader />:
      <div>
      <Navbar />
      <Footer />
      </div>
    }
    </>
  );
      }

export default App
