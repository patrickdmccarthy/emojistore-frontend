import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import Router from 'next/router'

const {publicRuntimeConfig} = getConfig()
const {CART_SERVICE} = publicRuntimeConfig

export const updateQuantity = async (item, callback) => {
  try {
    const res = await fetch(`${CART_SERVICE}/cartItems/${item.id}`, {
      body: JSON.stringify({quantity: item.quantity}),
      headers: {
        'content-type': 'application/json'
      },
      method: 'PUT',
      mode: 'cors',
    })
    const data = await res.json()
    callback(data)
  } catch (error) {
    console.log(error)
  }
}

export const deleteItem = async (item, callback) => {
  try {
    const res = await fetch(`${CART_SERVICE}/cartItems/${item.id}`, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'DELETE',
      mode: 'cors',
    })
    const data = await res
    callback(item)
  } catch (error) {
    console.log(error)
  }
}
export const onCheckoutSuccess = () => {
  localStorage.removeItem('cartId');
  Router.push('/thankyou')
}

export const checkout = async () => {
  try {
    const res = await fetch(`${CART_SERVICE}/checkout`, {
      body: JSON.stringify({id: localStorage.getItem("cartId")}),
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
