import MdShoppingCart from 'react-icons/lib/md/shopping-cart'

export default ({fetchCart, cart}) => {
  console.log('---------------------', cart.CartItems)
  const totalItems =  cart && cart.CartItems ? cart.CartItems.map(item => item.quantity).reduce((a, b) => a + b, 0) : 0

  return (
    <div>
      <MdShoppingCart size={25}/>
      <span>{ totalItems }</span>
    </div>
  )
}
