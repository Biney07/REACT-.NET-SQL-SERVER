import { Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import AppPagination from "../../Components/AppPagination";
import CheckboxButtons from "../../Components/CheckboxButtons";
import LoadingComponent from "../../Components/LoadingComponent";
import BanoriList from "../../Components/BanoriComponets/BanoriList";
import BanoriSearch from "../../Components/BanoriComponets/BanoriSearch";
import RadioButtonGroup from "../../Components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../Store/hook";
import { fetchFilters, fetchBanoriAsync, banoriSelectors, setPageNumber, setBanoriParams, fetchBanoretAsync } from "./CatalogSlice";
import style from "../../Components/BanoriComponets/BanoriCard.module.css"
import { useHistory } from "react-router-dom";


const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to low' },
    { value: 'price', label: 'Price - Low to high' },
]

export default function Catalog() {
    const banoret = useAppSelector(banoriSelectors.selectAll);
    const nominatedBanoret = banoret.filter(banori => banori.nominated);
    
    const { banoretLoaded, filtersLoaded, profesionet, banoriParams, metaData } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    const history = useHistory();
const [shouldReload, setShouldReload] = useState(false);

  useEffect(() => {
    if (shouldReload) {
      setShouldReload(false);
      window.location.reload();
    }
  }, [shouldReload]);

  useEffect(() => {
    if (history.location.pathname === '/my/route') {
      setShouldReload(true);
    }
  }, [history.location.key]);




    useEffect(() => {
       
        if (!banoretLoaded) dispatch(fetchBanoretAsync());
    }, [banoretLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [filtersLoaded, dispatch]);

    if (!filtersLoaded) return <LoadingComponent message='Loading banoret...' />

    return (


<Grid container direction="column" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
  <Grid item>
    <BanoriList banoret={nominatedBanoret} />
  </Grid>
  <Grid item sx={{padding:'30px'}} >
    {metaData && (
      <AppPagination 
      
        metaData={metaData}
        onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
      />
    )}
  </Grid>
</Grid>

    )
}