import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { setBanoriParams } from "../../Pages/Catalog/CatalogSlice";
import { useAppDispatch, useAppSelector } from "../../Store/hook";
import style from "./BanoriCard.module.css"


export default function BanoriSearch() {
    const {banoriParams} = useAppSelector(state => state.catalog);
    const [searchTerm, setSearchTerm] = useState(banoriParams.searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setBanoriParams({searchTerm: event.target.value}))
    }, 1000)

    return (
        <TextField
        className={style.form_control_label}
            label='Search banoret'
            variant='outlined'
            fullWidth
            value={searchTerm || ''}
            onChange={(event: any) => {
                setSearchTerm(event.target.value);
                debouncedSearch(event);
            }}
        />
    )
}