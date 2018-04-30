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

export const onCheckoutSuccess = () => {
  localStorage.removeItem('cartId');
  Router.push('/thankyou')
}

