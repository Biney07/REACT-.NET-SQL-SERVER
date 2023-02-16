import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Banori } from "../../models/banori";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../util/util";
import { addBasketItemAsync } from "../BasketComponets/basketSlice";
import { useAppDispatch, useAppSelector } from '../../Store/hook';
import style from "./BanoriCard.module.css";

interface Props {
    Banori: Banori
}

export default function BanoriCard({ Banori }: Props) {
    const { status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    return (
        <Card className={style.card}>
            <Link to={`./catalog/${Banori.id}`}>
                <CardMedia
                    className={style.card_media}
                    image={Banori.pictureUrl}
                    title={Banori.name}
                    sx={{ padding: '0px' }}
                />
            </Link>

            <div style={{ padding: '0px 20px' }}>
                <CardHeader className={style.card_header}
                    title={Banori.name}
                    titleTypographyProps={{
                        variant: "h4",
                        align: "center",
                        sx: { fontWeight: '200', color: '#16104e', fontSize: "35px", fontFamily: "Poppins" }
                    }}
                />
                <CardActions className={style.card_actions}>
                    <LoadingButton className={style.card_actions_button}
                        loading={status.includes('pendingAddItem' + Banori.id)}
                        onClick={() => dispatch(addBasketItemAsync({ banoriId: Banori.id }))}
                        size="large"
                        sx={{ width: "100%", margin: 2 }}>
                        Voto
                    </LoadingButton>
                </CardActions>
            </div>
        </Card>

    )
}
