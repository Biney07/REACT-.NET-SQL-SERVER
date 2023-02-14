import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Box } from "@mui/system";
import { BasketItem } from "../../models/basket";
import { useAppSelector, useAppDispatch } from "../../Store/hook";
import { removeBasketItemAsync, addBasketItemAsync } from "./basketSlice";
import  Style from "./Basket.module.css";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

interface Props {
    items: BasketItem[];
    isBasket?: boolean;
}

export default function BasketTable({ items, isBasket = true }: Props) {
    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    return (
        <TableContainer component={Paper} className={Style.table_content}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead className={Style.table_head }>                    
                    <TableRow className={Style.table_row}>
                        <TableCell className={Style.table_content} >Product</TableCell>
                        <TableCell className={Style.table_content} align="right">Price</TableCell>
                        <TableCell className={Style.table_content} align="center">Quantity</TableCell>
                        <TableCell className={Style.table_content} align="right">Subtotal</TableCell>
                        {isBasket &&
                            <TableCell align="right"></TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody className={Style.table_content }>
                    {items.map(item => (
                        <TableRow 
                            key={item.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell className={Style.table_content} component="th" scope="row">
                                <Box display='flex' alignItems='center'>
                                    <img src={item.pictureUrl} alt={item.name} style={{ height: 80, marginRight: 20 }} />
                                    <span>{item.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell className={Style.table_content} align="right">${(item.price / 100).toFixed(2)}</TableCell>
                            <TableCell className={Style.table_content} align="center">
                                {isBasket &&
                                    <LoadingButton className={Style.table_button}
                                        loading={status === 'pendingRemoveItem' + item.productId + 'rem'}
                                        onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: 1, name: 'rem' }))}
                                        // color='secondary'
                                    >
                                        <Remove />
                                    </LoadingButton>}
                                {item.quantity}
                                {isBasket &&
                                    <LoadingButton className={Style.table_button}
                                        loading={status === 'pendingAddItem' + item.productId}
                                        onClick={() => dispatch(addBasketItemAsync({ productId: item.productId }))}
                                        // color='secondary'
                                    >
                                        <Add />
                                    </LoadingButton>}
                            </TableCell>
                            <TableCell className={Style.table_content} align="right">${((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                            {isBasket &&
                                <TableCell align="right">
                                    <LoadingButton className={Style.loading_delete}
                                        loading={status === 'pendingRemoveItem' + item.productId + 'del'}
                                        onClick={() => dispatch(removeBasketItemAsync({ productId: item.productId, quantity: item.quantity, name: 'del' }))}
                                        
                                    >
                                        <HighlightOffIcon />
                                    </LoadingButton>
                                </TableCell>}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}