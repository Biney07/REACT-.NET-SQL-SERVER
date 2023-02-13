import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../models/product";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../util/util";
import { addBasketItemAsync } from "../BasketComponets/basketSlice";
import { useAppDispatch, useAppSelector } from '../../Store/hook';
import style from "./ProductCard.module.css";

interface Props {
    product: Product
}

export default function ProductCard({ product }: Props) {
    const {status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    return (
        <Card className={style.card}>
            <CardMedia className={style.card_media}
                // sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardHeader className={style.card_header}
                // avatar={
                //     <Avatar className={style.avatar} >
                //         {product.name.charAt(0).toUpperCase()}
                //     </Avatar>
                // }
                title={product.name}
                // titleTypographyProps={{
                //     sx: { fontWeight: 'bold', color: 'primary.main' }
                // }}
            />
            <CardContent className={style.card_content}>
                <Typography className={style.card_content_title} gutterBottom color='secondary' variant="h5">
                    {currencyFormat(product.price)}
                </Typography>
                <Typography className={style.card_content_subtitle} variant="body2" color="text.secondary">
                    {product.brand} / {product.type}
                </Typography>
            </CardContent>
            <CardActions className={style.card_actions}>
            <LoadingButton className={style.card_actions_button}
                    loading={status.includes('pendingAddItem' + product.id)}
                    onClick={() => dispatch(addBasketItemAsync({productId: product.id}))}
                    size="small">
                    Add to cart
                </LoadingButton>
                <Button size="small"><Link className={style.card_actions_link} to={`/catalog/${product.id}`} >View</Link></Button>
            </CardActions>
        </Card>
    )
}