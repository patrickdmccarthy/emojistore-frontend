import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import Router from 'next/router'
import serialize from 'form-serialize';

const {publicRuntimeConfig} = getConfig()
const {CART_SERVICE} = publicRuntimeConfig

export const checkout = async (form) => {
  const address = serialize(form, { hash: true })
  const orderData = {
    id: localStorage.getItem("cartId"),
    ...address
  }

  try {
    const res = await fetch(`${CART_SERVICE}/checkout`, {
      body: JSON.stringify(orderData),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      mode: 'cors',
    })
    const data = await res.json()
    onCheckoutSuccess()
  } catch (error) {
    console.log(error)
  }
}

export const onCheckoutSuccess = () => {
  localStorage.removeItem('cartId');
  Router.push('/thankyou')
}

