import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import BasketSummary from "./BasketSummary";
import { useAppSelector } from "../../Store/hook";
import Style from "./Basket.module.css";
import BasketTable from "./BasketTable";

export default function BasketPage() {
    const { basket } = useAppSelector(state => state.basket);


    if (!basket) return <Typography variant='h3'>Your basket is empty</Typography>

    return (
        <>

            <Grid container>
                <Grid item xs={8} style={{padding: '20px'}}>
                    <BasketTable items={basket.items} />
               
                </Grid >
                <Grid item xs={4} style={{padding: '20px'}}>
                    <div className={Style.sticky}>
                    <BasketSummary />
                    <Button className={Style.checkOut_button}
                        component={Link}
                        to='/checkout'
                        variant='contained'
                        size='large'
                        fullWidth
                    >
                        Checkout
                    </Button>
                    </div>
                </Grid>
            </Grid>


        </>


    )
}

