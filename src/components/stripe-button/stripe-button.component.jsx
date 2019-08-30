import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_cGSs7OGrylbByOVZANelela600g8TbRopH';

    const onToken = token => console.log(token);


    return (
        <StripeCheckout
            label='Pay now'
            name='CRWN Clothing LTD'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            amount={priceForStripe}
            description={`you total is $${price}`}
            panelLabel='Pay now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeButton;