import { Component } from 'react'

import Head from '../components/Head'
import Nav from '../components/Nav'
import CartProvider from '../components/CartProvider'
import CartPage from '../components/CartPage'

export default () => (
  <div>
    <Head />
    <CartProvider>
      <Nav />
      <CartPage />
    </CartProvider>
  </div>
)
