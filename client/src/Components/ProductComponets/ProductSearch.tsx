import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { setProductParams } from "../../Pages/Catalog/CatalogSlice";
import { useAppDispatch, useAppSelector } from "../../Store/hook";

export default function ProductSearch() {
    const {productParams} = useAppSelector(state => state.catalog);
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductParams({searchTerm: event.target.value}))
    }, 1000)

    return (
        <TextField
            label='Search products'
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