import { useEffect } from "react";
import ProductList from "../../Components/ProductComponets/ProductList";
import { useAppDispatch, useAppSelector } from "../../Store/hook";
import { fetchProductsAsync, productSelectors } from "./CatalogSlice";
import LoadingComponent from "../../Components/LoadingComponent";

export default function Catalog() {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, status } = useAppSelector(state => state.catalog);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [productsLoaded, dispatch])
    if (status.includes('pending')) return <LoadingComponent message='Loading products...' />
    return (
        <>
            <ProductList products={products} />
        </>
    )
}