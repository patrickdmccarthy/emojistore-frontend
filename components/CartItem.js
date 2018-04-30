export default ({decreaseQuantity, increaseQuantity, handleDelete, img, name, price, quantity}) => (
  <div className={'container'}>
    <div className={'section'}>
      <img src={img.small} />
    </div>
    <div className={'section'}>{name}</div>
    <div className={'section'}>{`$${price}`}</div>
    <div className={'section'}>
      <button onClick={decreaseQuantity}>-</button>
      Quantity: {quantity}
      <button onClick={increaseQuantity}>+</button>
    </div>
    <div className={'section delete-wrapper'}>
      <button onClick={handleDelete}>Delete item</button>
    </div>
    <style jsx>{`
      .container {
        display: flex;
        margin-bottom: 2em;
      }
      img {
        width: 100%;
      }
      .section {
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .delete-wrapper {
        justify-content: flex-end;
      }
    `}</style>
  </div>
)
