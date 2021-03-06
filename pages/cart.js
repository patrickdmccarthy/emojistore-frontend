import Nav from '../components/Nav'
import CartProvider from '../components/CartProvider'
import CartPage from '../components/CartPage'
import Layout from '../components/Layout'

export default () => (
  <div>
    <Layout>
      <CartProvider>
        <Nav />
        <CartPage />
      </CartProvider>
    </Layout>
  </div>
)
