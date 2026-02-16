import 'animate.css';
import { useEffect, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import photo from './photo1.jpg';

const HomePage = () => {
  const [displayedText, setDisplayedText] = useState('');
  const words = ["Welcome", "to", "E-Dashboard", "Your", "Online", "Shopping", "Hub"];
  
  useEffect(() => {
    let index = 0;
    
    const interval = setInterval(() => {
      if (index < words.length-1) {
        setDisplayedText((prev) => prev + (prev ? ' ' : '') + words[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 500);
    
    return () => clearInterval(interval);
  }, [words]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 to-slate-300 text-white flex flex-col justify-between">
      {/* Hero Section */}
      <header className="flex flex-col items-center p-8 text-center animate__animated animate__fadeIn">
        <h1 className="text-5xl font-bold mb-4 animate__animated animate__fadeInDown m-6">{displayedText}</h1>
        <p className="text-lg mb-6 animate__animated animate__fadeInUp animate__delay-1s">
          Discover the best products with amazing offers and deals
        </p>
        <div className="flex space-x-4 animate__animated animate__zoomIn animate__delay-2s">
          <button className="px-6 py-3 bg-green-500 hover:bg-green-700 rounded-lg font-semibold shadow-lg transition duration-300">
            
            Shop Now <FaArrowRight className="inline-block ml-2" />
            
          </button>
          <button className="px-4 py-3 bg-gray-700 hover:bg-gray-900 rounded-lg font-semibold shadow-lg transition duration-300">
            <Link to="/product">
            Explore Categories
            </Link>
          </button>
        </div>
        <section className="flex justify-center items-center p-8 mx-2 animate__animated animate__fadeInRight m-2 animate__delay-3s">
        <img 
          src={photo} 
          alt="Featured Product" 
          className="w-96 h-auto rounded-lg shadow-2xl transition-all duration-500 transform hover:scale-105 "
        />
      </section>
      </header>
      

    
    </div>
  );
}

export default HomePage;
