import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Store/hook";
import { banoriSelectors, fetchBanoretAsync } from "../Catalog/CatalogSlice";
import cross from './cross.png'
import { useEffect } from "react";

export default function Banoret(){
     const banoret = useAppSelector(banoriSelectors.selectAll);
    const eleminuarBanoret = banoret.filter(banori => banori.eleminuar);
    const { banoretLoaded, } = useAppSelector(state => state.catalog);
      const dispatch = useAppDispatch();
      useEffect(() => {
       
        if (!banoretLoaded) dispatch(fetchBanoretAsync());
    }, [banoretLoaded, dispatch])
const aktivBanoret = banoret.filter(banori => !banori.eleminuar);
return (
  <div className="admin-layout">
    <div style={{margin:'10px 50px'}}>
    <h1 className='NewBeauty'>Banoret Aktiv</h1>
    <div style={{ display: 'flex', flexWrap: 'wrap',flexDirection: 'row', justifyContent: 'center', padding:'5px 0px 10px 0px'}}>
      {aktivBanoret.map((banori) => (
        <div key={banori.id} style={{ backgroundColor: 'var(--blue)', width: "250px", margin:'20px 20px 0px 0px',  borderRadius:'30px' }}>
          <Link to={`/catalog/${banori.id}`}>
            <img src={banori.pictureUrl} style={{ width: "250px", borderRadius:'30px' }} />
          </Link>
        </div>
      ))}
    </div>

    <h1 className='NewBeauty'>Banoret e eleminuar</h1>
    <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
      {eleminuarBanoret.map((banori) => (
        <div key={banori.id} style={{ backgroundColor: 'var(--blue)', width: "250px", margin:'20px 20px 0px 0px',  borderRadius:'30px' }}>
               <Link to={`/catalog/${banori.id}`}>
          <div style={{ position: 'relative' }}>
            <img src={banori.pictureUrl} style={{ width: "250px", borderRadius:'30px', filter: 'grayscale(100%)' }} />
            <img src={cross} style={{ position: 'absolute', top: '12.5%', left: '12.5%', width: '75%', height: '75%', borderRadius:'30px', opacity: 0.3 }} />
          </div>
         </Link>
        </div>
      ))}
    </div>
    </div>
  </div>

);
    
}