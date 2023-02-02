import { url } from "inspector";
import React, { useState } from "react"
import agent from "../API/agent";
import { useStoreContext } from "../context/StoreContext";

interface Props {
    name: string;
    description: string;
    url: string;
}
const Card: React.FunctionComponent<Props> = ({ name, description, url }) => {
    const clickHandler = () => {
        console.log("clicked");
    }

    const [loading, setLoading] = useState(false);
    const {setBasket} = useStoreContext();

    function handleAddItem(productId: number) {
        setLoading(true);
        agent.Basket.addItem(productId)
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }
    
    return (

    
            <div className="card" style={{ margin: '34px', width: '300px',display: "block" }}>
                <img src={url} className="card-img-top" alt="Fissure in Sandstone" />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <a href="#!" onClick={clickHandler} className="btn btn-primary">Add to card</a>
                    <a href="#!" onClick={clickHandler} className="btn btn-primary">Details</a>
                </div>
            </div>
     
    )
}
export default Card

