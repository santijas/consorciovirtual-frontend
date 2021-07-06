import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { REST_SERVER_URL } from '../services/configuration';
import { useMercadopago } from 'react-sdk-mercadopago';

// CHECKOUT PRO WAY

export const Checkout = ( {expensaId} ) => {
  const [preferenceId, setPreferenceId] = useState(null)
  const mercadopago = useMercadopago.v2('TEST-075c814b-06d0-4e34-9403-a35eae691229', {
    locale: 'es-AR'
});

  useEffect(() => { 
    axios.get(`${REST_SERVER_URL}/checkout`, {params:{ expensaId }}).then((order) => {
      setPreferenceId(order.data)
    });
  }, [expensaId]);


useEffect(() => {
  if (preferenceId) {

      mercadopago.checkout({
          preference: {
              id: preferenceId
          },
          render: {
              container: '.cho-container',
              label: 'Pagar expensa',
          }
      })
  }
}, [preferenceId, mercadopago]);


  return (
    <div class="cho-container" />
  );
}

/* Checkout API WAY
const FORM_ID = 'payment-form';

export const Checkout = () => {
  const { id } = useParams(); // id de producto
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    // luego de montarse el componente, le pedimos al backend el preferenceId
    axios.post(`${REST_SERVER_URL}/checkout`, { productId: id }).then((order) => {
      setPreferenceId(order.data);
      console.log("Pido el order!")
    });
  }, [id]);


useEffect(() => {
  if (preferenceId) {

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
    script.setAttribute('data-preference-id', preferenceId);
    script.setAttribute('data-button-label', "Pagar expensa");
    script.setAttribute('data-header-color', '#c0392b')
    const form = document.getElementById(FORM_ID);
    form.appendChild(script);
  }
}, [preferenceId]);


  return (
    <form id={FORM_ID} method="GET" />
  );
}*/