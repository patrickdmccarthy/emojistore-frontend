import { Component } from 'react'
import { addToCart } from '../services/product'

class ProductPage extends Component {

  render() {
    const {addItem, cart, product} = this.props

    return (
      <div>
        <div className={"container"}>
          <div className={"image-container"}>
            <img src={product.img.medium} />
          </div>
          <div className={"details-container"}>
            <h1>{product.name}</h1>
            <p>${product.price}</p>
            <p>{product.text}</p>
            <div>{
               cart.CartItems && cart.CartItems.map(item => item.itemId).includes(product.id)
              ?
                <button disabled={true}>Already Added</button>
              :
                <button onClick={() => addToCart(product, addItem)}>Add to Cart</button>
                }
              </div>
            </div>
          </div>
          <style jsx>{`
          .container {
            display: flex;
            padding: 3em;
          }

          .image-container {
            width: 50%;
          }

          .details-container {
            width: 50%;
            padding-left: 8%;
            padding-right: 8%;
          }
          img {
            max-width: 100%;
          }
        `}</style>
      </div>
    )
  }
}

export default ProductPage
