import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import LoadingComponent from "../LoadingComponent";
import NotFound from "./NotFound";
import { useAppDispatch, useAppSelector } from "../../Store/hook";
import { addBasketItemAsync } from "../BasketComponets/basketSlice";
import { fetchBanoriAsync, banoriSelectors } from "../../Pages/Catalog/CatalogSlice";


export default function BanoriDetails() {
    const {basket, status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();  
    const { id } = useParams<{ id: string }>();
    const banori = useAppSelector(state => banoriSelectors.selectById(state, id));
    const {status: banoriStatus} = useAppSelector(state => state.catalog);
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find(i => i.banoriId === banori?.id);
    useEffect(() => {
        if (item) setQuantity(item.quantity);
        if (!banori) dispatch(fetchBanoriAsync(parseInt(id)))
    }, [id, item, dispatch, banori]);

    function handleInputChange(event: any) {
        if (event.target.value > 0) {
            setQuantity(parseInt(event.target.value));
        }
    }

    function handleUpdateCart() {

        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({banoriId: banori?.id!, quantity: updatedQuantity}))
        } else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(addBasketItemAsync({banoriId: banori?.id!, quantity: updatedQuantity}))
        }
    }

    if (banoriStatus.includes('pending')) return <LoadingComponent message='Loading banori...' />

    if (!banori) return <NotFound />

    return (
        <Grid container spacing={5} sx={{ justifyContent: 'center', paddingTop: '60px' }}>
            <Grid item xs={5}>
                <img src={banori.pictureUrl} alt={banori.name} style={{ width: '80%' }} />
            </Grid>
            <Grid item xs={4}>
                <Typography style={{padding:'20px'}}variant='h3'>{banori.name}</Typography>
                <Divider />
              
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Emri</TableCell>
                                <TableCell>{banori.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Biografia</TableCell>
                                <TableCell>{banori.biografia}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Mosha</TableCell>
                                <TableCell>{banori.age} vjet</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Profesioni</TableCell>
                                <TableCell>{banori.profesioni}</TableCell>
                            </TableRow>
                             <TableRow>
                                <TableCell>Statusi martesor</TableCell>
                                <TableCell>  {banori.relationshipStatus ? "I Martuar" : "Single"}</TableCell>
                            </TableRow>
                           
                        </TableBody>
                    </Table>
                </TableContainer>
               
            </Grid>
        </Grid>
    )
}