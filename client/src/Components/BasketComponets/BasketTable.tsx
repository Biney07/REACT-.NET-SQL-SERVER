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
                <TableHead>
                    <TableRow>
                        <TableCell className={Style.table_title}>Banori</TableCell>
                        <TableCell  className={Style.table_title}align="right">Çmimi</TableCell>
                        <TableCell className={Style.table_title}align="center">Sa vota</TableCell>
                        <TableCell className={Style.table_title} align="right">SubTotal</TableCell>
                        {isBasket &&
                            <TableCell align="right"></TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody className={Style.table_content }>
                    {items.map(item => (
                        <TableRow
                            key={item.banoriId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell className={Style.table_content} component="th" scope="row">
                                <Box display='flex' alignItems='center'>
                                    <img src={item.pictureUrl} alt={item.name} style={{ height: 150, marginRight: 20 }} />
                                    <span className={Style.table_content}>{item.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell className={Style.table_content} align="right">${(item.price / 100).toFixed(2)}</TableCell>
                            <TableCell className={Style.table_content} align="center">
                                {isBasket &&
                                    <LoadingButton
                                        loading={status === 'pendingRemoveItem' + item.banoriId + 'rem'}
                                        onClick={() => dispatch(removeBasketItemAsync({ banoriId: item.banoriId, quantity: 1, name: 'rem' }))}
                                        color='error'
                                    >
                                        <Remove />
                                    </LoadingButton>}
                                {item.quantity}
                                {isBasket &&
                                    <LoadingButton
                                        loading={status === 'pendingAddItem' + item.banoriId}
                                        onClick={() => dispatch(addBasketItemAsync({ banoriId: item.banoriId }))}
                                        color='secondary'
                                    >
                                        <Add />
                                    </LoadingButton>}
                            </TableCell>
                            <TableCell className={Style.table_content} align="right">${((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
                            {isBasket &&
                                <TableCell align="right">
                                    <LoadingButton
                                        loading={status === 'pendingRemoveItem' + item.banoriId + 'del'}
                                        onClick={() => dispatch(removeBasketItemAsync({ banoriId: item.banoriId, quantity: item.quantity, name: 'del' }))}
                                        color='error'
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