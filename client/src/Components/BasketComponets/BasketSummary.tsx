
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { useAppSelector } from "../../Store/hook";
import { currencyFormat } from "../../util/util";
import Style from "./Basket.module.css"

interface Props {
    subtotal?: number;
}
export default function BasketSummary({subtotal}: Props) {
    const {basket} = useAppSelector(state => state.basket);
    if (subtotal === undefined)
    subtotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
    const deliveryFee = subtotal > 10000 ? 0 : 500;

    return (
        <>
            <TableContainer className={Style.table_body} component={Paper} variant={'outlined'}>
                <Table >
                    <TableBody >
                        <TableRow>
                            <TableCell className={Style.table_content_summary} colSpan={2}>Subtotal</TableCell>
                            <TableCell className={Style.table_content_summary} align="right">{currencyFormat(subtotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={Style.table_content_summary} colSpan={2}>Tax</TableCell>
                            <TableCell className={Style.table_content_summary} align="right">{currencyFormat(deliveryFee)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className={Style.table_content_summary} colSpan={2}>Total</TableCell>
                            <TableCell className={Style.table_content_summary} align="right">{currencyFormat(subtotal + deliveryFee)}</TableCell>
                        </TableRow>
                      
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}