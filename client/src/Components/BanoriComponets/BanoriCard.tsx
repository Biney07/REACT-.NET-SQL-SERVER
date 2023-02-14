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
            <CardMedia className={style.card_media}
                // sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
                image={Banori.pictureUrl}
                title={Banori.name}
            />
            <CardHeader className={style.card_header}
                // avatar={
                //     <Avatar className={style.avatar} >
                //         {Banori.name.charAt(0).toUpperCase()}
                //     </Avatar>
                // }
                title={Banori.name}
            // titleTypographyProps={{
            //     sx: { fontWeight: 'bold', color: 'primary.main' }
            // }}
            />
            <CardContent className={style.card_content}>
                <Typography className={style.card_content_title} gutterBottom color='secondary' variant="h5">
                    {currencyFormat(Banori.price)}
                </Typography>

            </CardContent>
            <CardActions className={style.card_actions}>
                <LoadingButton className={style.card_actions_button}
                    loading={status.includes('pendingAddItem' + Banori.id)}
                    onClick={() => dispatch(addBasketItemAsync({ banoriId: Banori.id }))}
                    size="small">
                    Add to cart
                </LoadingButton>
                <Button size="small"><Link className={style.card_actions_link} to={`/catalog/${Banori.id}`} >View</Link></Button>
            </CardActions>
        </Card>
    )
}