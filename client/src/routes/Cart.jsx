import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import CartCard from '../ui/CartCard';

export default function Cart() {
    const [products, setProducts] = useState([]);
    const [cookies, setCookie] = useCookies(["productIDs"]);
    const apiHost = import.meta.env.VITE_APP_HOST;
    const apiUrl = apiHost + '/api/products/all';


    //****NOTE FOR PRESENTATION: tried to do it without fetching all products since that isn't very scalable or efficient with larger databases, but couldn't get it to work. not enough time to mess around with it for longer so just had to leave it as is, but i'm confident I could get it to work.

    //ensure productIDs cookie is present before proceeding
    if (!cookies.productIDs) {
        return <p>Loading cookies...</p>
    }

    //fetch product data
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(apiUrl, {
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                if (!ignore) {
                    setProducts(data);
                }
            } else {
                setProducts(null);
            }
        }

        let ignore = false;
        fetchData();
        return () => {
            ignore = true;
        }
    }, []);


    //ensure products has been populated before proceeding
    if (products.length == 0) {
        return <p>Loading products...</p>
    }

    //split the cookie on the comma and turn all numbers back to integers
    const productsArray = cookies.productIDs.split(",");
    productsArray.forEach(num => {
        parseInt(num)
    })

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
            <h1>Cart</h1>
            {
                uniqueIDs.map(id => (
                    <CartCard product={products[id - 1]} apiHost={apiHost} quantity={counts[id]} />
                ))
            }<br />
            <h2>Subtotal: ${subtotal}</h2>
            <button className="btn btn-outline-secondary ms-3" onClick={() => window.location.href = "/"}>Continue shopping</button>
            <button className="btn btn-outline-secondary ms-3" onClick={() => window.location.href = "/checkout"}>Complete purchase</button>


        </>
    )
}