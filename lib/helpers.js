export const totalItems = (cart) =>  cart && cart.CartItems ? cart.CartItems.map(item => item.quantity).reduce((a, b) => a + b, 0) : 0
