import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'

const {publicRuntimeConfig} = getConfig()
const {CART_SERVICE} = publicRuntimeConfig

export const addToCart = async (product, callback) => {
  const { price, name, img, id } = product
  const cartId = localStorage.getItem("cartId")
  const cartItem = {
    id,
    price,
    name,
    img,
    cartId
  }

  const res = await fetch(`${CART_SERVICE}/cartItems`, {
    body: JSON.stringify(cartItem),
    headers: {
      'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
  })
  const data = await res.json()
  callback(data)
}
