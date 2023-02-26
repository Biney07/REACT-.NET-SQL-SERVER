import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useFormContext } from 'react-hook-form';
import { CardCvcElement, CardExpiryElement, CardNumberElement } from '@stripe/react-stripe-js';
import { StripeInput } from './StripeInput';
import { StripeElementType } from '@stripe/stripe-js';
import AppTextInput from '../../Components/AppTextInput';
import './Payment.css';
import { useEffect, useState } from 'react';
interface Props {
  cardState: { elementError: { [key in StripeElementType]?: string } };
  onCardInputChange: (event: any) => void;
}

export default function PaymentForm({cardState, onCardInputChange}: Props) {
  
  const { control } = useFormContext();

 
  return (
     <div className="paymentcontainer">
      <div className="payment-form">
      <Typography variant="h6" sx={{color:'white', fontSize:'33px', marginBottom:'10px'}} gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid  className='muitextfieldwhite' item xs={12} md={6}>
          <AppTextInput  name='nameOnCard' label='Name on card' control={control} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
          className='muitextfieldwhite'
        
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardNumber}
            helperText={cardState.elementError.cardNumber}
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {	
                component: CardNumberElement
              }
            }}
          />
         
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
          className='muitextfieldwhite'
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardExpiry}
            helperText={cardState.elementError.cardExpiry}
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardExpiryElement
              }
            }}

          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
          className='muitextfieldwhite'
            onChange={onCardInputChange}
            error={!!cardState.elementError.cardCvc}
            helperText={cardState.elementError.cardCvc}
            id="cvv"
            label="CVV"
            fullWidth
            autoComplete="cc-csc"
            variant="outlined"
            InputLabelProps={{ shrink: true,
              }}
            InputProps={{
              inputComponent: StripeInput,
              inputProps: {
                component: CardCvcElement
              }
            }}

          />
        </Grid>
      </Grid>
    </div>
   </div>

 
  );
} 
 {/* <div className="credit-card">
<div className="cardpay">
      <div className="top">
        <h2>Albin Saraqi</h2>
        <img src="https://cdn-icons-png.flaticon.com/512/1436/1436392.png" />
      </div>
      <div className="infos">
    <section className="card-number">
  <p className='paragraphpay'>Card Number</p>
  <h1 className='h1pay'>222222222222</h1>
</section>
<div className="bottom">
  <aside className="infos--bottom">
    <section className='sectionpay'>
      <p className='paragraphpay'>Expiry date</p>
      <h3 className='h3pay'></h3>
    </section>
    <section className='sectionpay'>
      <p className='paragraphpay'>CVV</p>
      <h3 className='h3pay'>{cvc}</h3>
    </section>
  </aside>
  <aside>
    <section>
      <img src="https://seeklogo.com/images/V/VISA-logo-DD37676279-seeklogo.com.png" className="brand" />
    </section>
  </aside>
</div>

      </div>
    </div>
  </div>
</div> */}