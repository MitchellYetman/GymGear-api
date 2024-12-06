import { useForm } from "react-hook-form";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useCookies } from 'react-cookie';

export default function Checkout() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const apiHost = import.meta.env.VITE_APP_HOST;
    const apiUrl = apiHost + '/api/products/purchase';
    const [cookies, setCookie] = useCookies(["productIDs"]);
    const { isLoggedIn } = useOutletContext()
    let navigate = useNavigate()

    if (!isLoggedIn) {
        return (
            <>
                <p>Please log in to continue </p>
                <button className="btn btn-outline-secondary ms-3" onClick={() => navigate("/login")}>Login</button>
            </>
        );
    }

    function completePurchase(data) {
        const formData = new FormData();
        formData.append('street', data.street);
        formData.append('city', data.city);
        formData.append('province', data.province);
        formData.append('country', data.country);
        formData.append('postal_code', data.postal_code);
        formData.append('credit_card', data.credit_card);
        formData.append('credit_expire', data.credit_expire);
        formData.append('credit_cvv', data.credit_cvv);

        async function tryPurchase() {
            const response = await fetch(apiUrl, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                navigate("/confirmation")
                setCookie('productIDs', "", { path: '/' })

            } else {
                alert("Could not complete purchase. Please try again.")
            }
        }
        tryPurchase();
    }//end completePurchase



    return (
        <>
            <div>
                <h1>Checkout</h1>
                <form onSubmit={handleSubmit(completePurchase)} method="post" className="w-25">
                    <div className="mb-3">
                        <label className="form-label">Street:</label>
                        <input {...register("street", { required: true })} type="text" className="form-control bg-light" style={{ width: '300px' }} />
                        {errors.email && <span className="text-danger">Street is required</span>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">City:</label>
                        <input {...register("city", { required: true })} type="text" className="form-control bg-light" style={{ width: '300px' }} />
                        {errors.city && <span className="text-danger">City is required</span>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Province:</label>
                        <input {...register("province", { required: true })} type="text" className="form-control bg-light" style={{ width: '300px' }} />
                        {errors.province && <span className="text-danger">Province is required</span>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Country:</label>
                        <input {...register("country", { required: true })} type="text" className="form-control bg-light" style={{ width: '300px' }} />
                        {errors.country && <span className="text-danger">Country is required</span>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Postal code:</label>
                        <input {...register("postal_code", { required: true })} type="text" className="form-control bg-light" style={{ width: '300px' }} />
                        {errors.postal_code && <span className="text-danger">Postal code is required</span>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Credit card number:</label>
                        <input {...register("credit_card", { required: true })} type="text" className="form-control bg-light" style={{ width: '300px' }} />
                        {errors.credit_card && <span className="text-danger">Credit card number is required</span>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Expiry date:</label>
                        <input {...register("credit_expire", { required: true })} type="text" className="form-control bg-light" style={{ width: '300px' }} />
                        {errors.credit_expire && <span className="text-danger">Expiry date is required</span>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">CVV:</label>
                        <input {...register("credit_cvv", { required: true })} type="text" className="form-control bg-light" style={{ width: '300px' }} />
                        {errors.credit_cvv && <span className="text-danger">CVV is required</span>}
                    </div>
                    <button type="submit" className="btn btn-primary">Complete purchase</button>
                </form>
            </div>
        </>
    )
}