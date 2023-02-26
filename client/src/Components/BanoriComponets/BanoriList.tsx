
import { Banori } from "../../models/banori";
import { useAppSelector } from "../../Store/hook";
import BanoriCard from "./BanoriCard";
// import BanoriCardSkeleton from "./BanoriCardSkeleton";
import style from './BanoriCard.module.css';
interface Props {
    banoret: Banori[];
}

export default function BanoriList({ banoret }: Props) {
    // const { banoretLoaded } = useAppSelector(state => state.catalog);
    return (
  <div className={style.wrapper}>
  <h1 className={style.heading}>Të Nominuarit për këtë javë</h1>
  <div className={style.banoretContainer}>
    {banoret.map((banori) => (
      <div className={style.carta} key={banori.id}>
        <BanoriCard Banori={banori} />
      </div>
    ))}
  </div>
</div>
  );
    
}