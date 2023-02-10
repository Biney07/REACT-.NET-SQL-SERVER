
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import agent from "../../API/agent";
import { setBasket } from "../../Components/BasketComponets/basketSlice";
import LoadingComponent from "../../Components/LoadingComponent";
import { useAppDispatch } from "../../Store/hook";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe("pk_test_51MZkAqGnklf4PSLxjd2hAmNob29wwlgn8Ocq15SUff4JMl3e4ufkqnW9Ha58djAlYqJj50tAOmZB9FYfoeDQEWi700tRosIjH2")

export default function CheckoutWrapper() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        agent.Payments.createPaymentIntent()
            .then(basket => dispatch(setBasket(basket)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }, [dispatch]);

    if (loading) return <LoadingComponent message='Loading checkout...' />

    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}