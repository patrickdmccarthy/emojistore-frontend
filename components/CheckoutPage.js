import { checkout } from '../services/checkout'

export default () => (
  <div>
    <h1>Shipping Address</h1>
    <form onSubmit={ (e) => {
      e.preventDefault();
      e.stopPropagation();
      checkout(e.target)
    }}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" type="text" name="firstName" required/>
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" type="text" name="lastName" required/>
      </div>
      <div>
        <label htmlFor="address1">Address</label>
        <input id="address1" type="text" name="address1" required/>
      </div>
      <div>
        <label htmlFor="address2">Address</label>
        <input id="address2" type="text" name="address2" required/>
      </div>
      <div>
        <label htmlFor="city">City</label>
        <input id="city" type="text" name="city" required/>
      </div>
      <div>
        <label htmlFor="state">State</label>
        <input id="state" type="text" name="state" required/>
      </div>
      <div>
        <label htmlFor="zip">Zip Code</label>
        <input id="zip" type="text" name="zip" required/>
      </div>
      <div>
        <label htmlFor="country">Country</label>
        <input  type="text" name="country" required/>
      </div>
      <button>Confirm Order</button>
    </form>
  </div>
)
