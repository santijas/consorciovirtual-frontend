import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { REST_SERVER_URL } from '../services/configuration';



export const Checkout = ({ expensaId }) => {
  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    axios.get(`${REST_SERVER_URL}/checkout`, { params: { expensaId } }).then((order) => {
      setPreferenceId(order.data);
    });
  }, [expensaId]);




  useEffect(() => {
    if (preferenceId) {

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://sdk.mercadopago.com/js/v2';
      document.body.appendChild(script);
      script.addEventListener('load', () => {
        const mp = new window.MercadoPago('TEST-075c814b-06d0-4e34-9403-a35eae691229', {
          locale: 'es-AR'
        });
        const checkout = mp.checkout({
          preference: {
            id: preferenceId
          },
          render: {
            container: '.cho-container',
            label: 'Pagar expensa',
          },
          openMode: 'modal',
        })
      });

    }
  }, [preferenceId]);


  return (
    <div className="cho-container">
      {!preferenceId &&
        <div className="loading"><ReactLoading type="spin" color="#159D74" height={50} width={50} className="spin" /> </div>
      }
    </div>
  );
}