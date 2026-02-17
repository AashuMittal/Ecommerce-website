import React, { useEffect, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Product = () => {
    const [data, setData] = useState([]);
    const [cart, setCart] = useState(() => {
        // Retrieve existing cart from localStorage if available
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });
    const navigate = useNavigate();

    const fetchApi = async () => {
        const res = await fetch('https://fakestoreapi.com/products');
        const result = await res.json();
        setData(result);
    };

    useEffect(() => {
        fetchApi();
    }, []);


    const handleAddToCart = (product) => {
        const updatedCart = [...cart, product]; 
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart)); 
        navigate('/add', { state: { cart: updatedCart } }); 
    };


    const handleBuyNow = (price) => {
        navigate(`/payment?price=${price}`);
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <h1 className='text-center font-bold text-4xl mb-10 text-blue-600'>Our Products</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
                {data.map((product) => (
                    <div 
                        key={product.id} 
                        className='bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out relative'
                    >
                        <button onClick={() => handleAddToCart(product)}>
                            <FaShoppingCart className='absolute top-3 right-3 dark:text-blue-500 text-xl' />
                        </button>

                        <img 
                            src={product.image} 
                            alt={product.title} 
                            className='w-full h-64 object-cover hover:opacity-90 transition duration-300'
                        />
                        <div className='p-5'>
                            <h2 className='font-bold text-lg mb-3 text-gray-800 truncate'>{product.title}</h2>
                            <p className='text-gray-600 text-sm mb-4'>{product.description.substring(0, 80)}...</p>
                            <div className='flex justify-between items-center'>
                                <span className='font-bold text-xl text-amber-500'>${product.price}</span>
                                <button 
                                    onClick={() => handleBuyNow(product.price)}
                                    className='px-4 py-2 bg-red-800 text-white rounded-full hover:bg-green-600 transition duration-300'
                                >
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;
