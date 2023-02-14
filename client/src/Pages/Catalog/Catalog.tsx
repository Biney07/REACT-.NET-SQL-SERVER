import { Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import AppPagination from "../../Components/AppPagination";
import CheckboxButtons from "../../Components/CheckboxButtons";
import LoadingComponent from "../../Components/LoadingComponent";
import BanoriList from "../../Components/BanoriComponets/BanoriList";
import BanoriSearch from "../../Components/BanoriComponets/BanoriSearch";
import RadioButtonGroup from "../../Components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../Store/hook";
import { fetchFilters, fetchBanoriAsync, banoriSelectors, setPageNumber, setBanoriParams, fetchBanoretAsync } from "./CatalogSlice";
import style from "../../Components/BanoriComponets/BanoriCard.module.css"


const sortOptions = [
    { value: 'name', label: 'Alphabetical' },
    { value: 'priceDesc', label: 'Price - High to low' },
    { value: 'price', label: 'Price - Low to high' },
]

export default function Catalog() {
    const banoret = useAppSelector(banoriSelectors.selectAll);
    const { banoretLoaded, filtersLoaded, profesionet, banoriParams, metaData } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!banoretLoaded) dispatch(fetchBanoretAsync());
    }, [banoretLoaded, dispatch])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [filtersLoaded, dispatch]);

    if (!filtersLoaded) return <LoadingComponent message='Loading banoret...' />

    return (
        <Grid container columnSpacing={4}>
            <Grid item xs={3}>
                <Paper className={style.form_control_label} sx={{ mb: 2 }}>
                    <BanoriSearch />
                </Paper>
                <Paper className={style.form_control_label} sx={{ mb: 2, p: 2 }}>
                    <RadioButtonGroup
                        selectedValue={banoriParams.orderBy}
                        options={sortOptions}
                        onChange={(e) => dispatch(setBanoriParams({ orderBy: e.target.value }))}
                    />
                </Paper>
                <Paper className={style.form_control_label} sx={{ mb: 2, p: 2 }}>
                    <CheckboxButtons
                        items={profesionet}
                        checked={banoriParams.profesionet}
                        onChange={(items: string[]) => dispatch(setBanoriParams({ profesionet: items }))}
                    />
                </Paper>
              
            </Grid>
            <Grid item xs={9}>
                <BanoriList banoret={banoret} />
            </Grid>
            <Grid item xs={3} />
            <Grid item xs={9} sx={{mb: 2}}>
                {metaData &&
                <AppPagination 
                    metaData={metaData}
                    onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
                />}
            </Grid>
        </Grid>
    )
}