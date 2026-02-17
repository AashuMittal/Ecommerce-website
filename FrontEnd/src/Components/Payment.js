import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import logo from './photo2.jpg';

const Payment = () => {
    const [Name, setName] = useState("");
    const [cardno, setcardno] = useState("");
    const [date, setdate] = useState("");
    const [CVV, setCVV] = useState("");
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const price = params.get('price');

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        

        if (!Name || !cardno || !date || !CVV) {
            toast.error("🦄 Please fill in all fields!");
            return;
        }
    
        const userData = {
            Name,
            cardno,
            date,
            CVV,
        };
    
        console.log("User Data:", userData); // Debugging line
    
        try {
            const response = await fetch("http://localhost:5000/payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
    
            const result = await response.json();
    
            if (response.ok) {
                toast.success("🦄 Payment Successful!");
                setName("");
                setcardno("");
                setdate("");
                setCVV("");
            } else {
                toast.error(`🦄 ${result.error}`);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("🦄 Something went wrong!");
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">Payment</h1>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Cardholder Name</label>
                        <input 
                            type="text" 
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                            placeholder="John Doe" 
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-600 mb-2">Card Number</label>
                        <input 
                            type="text" 
                            value={cardno}
                            onChange={(e) => setcardno(e.target.value)}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                            placeholder="1234 5678 9012 3456" 
                        />
                    </div>

                    <div className="flex justify-center space-x-4 mt-4">
                        <img src={logo} alt="Paytm" className="w-25 h-35 object-contain" />
                    </div>

                    <div className="flex space-x-4 mt-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">Expiration Date</label>
                            <input 
                                type="text" 
                                value={date}
                                onChange={(e) => setdate(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                placeholder="MM/YY" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-600 mb-2">CVV</label>
                            <input 
                                type="password" 
                                value={CVV}
                                onChange={(e) => setCVV(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                placeholder="123" 
                            />
                        </div>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div className="mt-6">
                        <h2 className="text-lg font-bold text-gray-700">Order Summary</h2>
                        <div className="flex justify-between text-lg font-bold text-gray-800 mt-4">
                            <span>Total</span>
                            <span>${price}</span>
                        </div>
                    </div>
                 
                    <button 
                        className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 rounded-lg hover:bg-indigo-700 transition-shadow duration-300 shadow-lg hover:shadow-2xl"   
                        onClick={handleSubmit}
                    >
                        Complete Payment
                    </button>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss={false} draggable pauseOnHover />
        </div>
    );
};

export default Payment;
