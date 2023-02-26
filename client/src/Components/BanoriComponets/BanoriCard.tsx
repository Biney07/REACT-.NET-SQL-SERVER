import { Banori } from "../../models/banori";
import { addBasketItemAsync } from "../BasketComponets/basketSlice";
import { useAppDispatch, useAppSelector } from "../../Store/hook";
import style from "./BanoriCard.module.css";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

interface Props {
  Banori: Banori;
}

export default function BanoriCard({ Banori }: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [voteCount, setVoteCount] = useState<number>(
    Math.floor(Math.random() * 1201) + 1800
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setVoteCount((prevVoteCount) => prevVoteCount + Math.floor(Math.random() * 10) + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

function handleClick() {
  const user = localStorage.getItem("user");
  if (!user) {
    
    history.push("/Login");
  } else {
    dispatch(addBasketItemAsync({ banoriId: Banori.id }));
  }
}
  return (
<article>

  <figure className="figura">
    <img style={{position: 'absolute',left: '7%',top:'6%',width: '60%',transform:'translateX(calc(var(--hover) * -15%)) scale(calc(1 + (var(--hover) * 0.2)))',transition: 'transform 0.2s'
    }} src={Banori.pictureUrl} alt="" />
    <div className={style.card_content_container}>
      <h2 className={style.emribanorit}>{Banori.name}</h2>
        <button
    className={style.votobutton}
    onClick={() => handleClick()}
    disabled={status.includes("pendingAddItem" + Banori.id)}
  >
    Voto
  </button>
    
    </div>
        <div style={{
  position: "absolute",
  top: 0,
  right: 0,
  margin: "10px 10px 0px 10px",
  padding: "5px",
  backgroundColor: "transparent",
  borderRadius: "5px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  justifyContent: "flex-end",
  color: "black",
  fontFamily: "sans-serif"
}}>
  <span className={style.votacounter}>{voteCount}</span>
  <span style={{ fontSize: "1.05em",marginTop: "-1.2em" }}>Vota</span>
</div>
  </figure>
</article>

  );
}




