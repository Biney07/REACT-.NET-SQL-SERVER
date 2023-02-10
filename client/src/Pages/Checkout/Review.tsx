import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useAppSelector } from '../../Store/hook';
import BasketSummary from '../../Components/BasketComponets/BasketSummary';
import BasketTable from '../../Components/BasketComponets/BasketTable';

export default function Review() {
  const {basket} = useAppSelector(state => state.basket);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {basket &&
      <BasketTable items={basket.items} isBasket={false} />}
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
        </Grid>
      </Grid>
    </>
  );
}