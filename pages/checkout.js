import CheckoutPage from '../components/CheckoutPage'
import CartProvider from '../components/CartProvider'
import Layout from '../components/Layout'
import Nav from '../components/Nav'

export default () => (
  <div>
    <Layout>
      <CartProvider>
        <Nav />
        <CheckoutPage />
      </CartProvider>
    </Layout>
  </div>
)
