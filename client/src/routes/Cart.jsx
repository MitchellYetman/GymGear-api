import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import CartCard from '../ui/CartCard';
import { useNavigate, useOutletContext } from "react-router-dom";

export default function Cart() {
    const [products, setProducts] = useState([]);
    const [cookies, setCookie] = useCookies(["productIDs"]);
    const apiHost = import.meta.env.VITE_APP_HOST;
    const apiUrl = apiHost + '/api/products/all';
    const { isLoggedIn } = useOutletContext()
    let navigate = useNavigate()

    //fetch product data
    useEffect(() => {
        async function fetchData() {
            if (cookies.productIDs) {
                const response = await fetch(apiUrl, {
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    if (!ignore) {
                        setProducts(data);
                    }
                } else {
                    setProducts([]);
                }
            } else {
                setProducts([]);
            }
        }

        let ignore = false;
        fetchData();
        return () => {
            ignore = true;
        }
    }, [cookies.productIDs]);

    //check if cookies are present or if products were fetched. this only worked if both conditions were present, and not with one or the other.
    if (cookies.productIDs === '' || products.length === 0) {
        return (
            <>
                <p style={{ color: "white" }}>No products in cart</p>
                <button className="btn btn-outline-secondary ms-3" onClick={() => navigate("/")} style={{ color: "black", backgroundColor: "white" }}>Continue shopping</button>
            </>
        );
    }

    //split the cookie on the comma and turn all numbers back to integers
    let productsArray = [];
    if (cookies.productIDs.length > 1) {
        productsArray = cookies.productIDs.split(",");
        productsArray.forEach(num => {
            parseInt(num)
        })
    } else {
        productsArray[0] = parseInt(cookies.productIDs)
    }

    //get each unique id and their quantities 
    const counts = {};
    productsArray.forEach(productID => {
        counts[productID] = (counts[productID] || 0) + 1
    });

    //calculate subtotal
    const uniqueIDs = Object.keys(counts);
    let subtotal = 0;
    uniqueIDs.forEach(id => {
        subtotal += counts[id] * products[id - 1].cost
    })


    return (
        <>
            <div style={{ color: "white" }}>
                <h1>Cart</h1>
                {
                    uniqueIDs.map(id => (
                        <CartCard product={products[id - 1]} apiHost={apiHost} quantity={counts[id]} cookie={cookies.productIDs} setCookie={setCookie} />
                    ))
                }<br />
                <h4>Subtotal: ${subtotal.toFixed(2)}</h4>
                <h4>Tax: ${(subtotal * 0.15).toFixed(2)}</h4>
                <h2>Total: ${(subtotal * 1.15).toFixed(2)}</h2>
                <button className="btn btn-primary" onClick={() => navigate('/checkout')} >Go to checkout</button>
                <button className="btn btn-outline-secondary ms-3" onClick={() => navigate('/')} style={{ color: "black", backgroundColor: "white" }}>Continue shopping</button>
            </div>

        </>
    )
}