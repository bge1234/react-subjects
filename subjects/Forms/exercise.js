////////////////////////////////////////////////////////////////////////////////
// Exercise
//
// - When the checkbox is checked:
//   - Fill in the shipping fields with the values from billing
//   - Disable the shipping fields so they are not directly editable
//   - Keep the shipping fields up to date as billing fields change
//   - Hint: you can get the checkbox value from `event.target.checked`
// - When the form submits, console.log the values
//
// Got extra time?
//
// - If there are more than two characters in the "state" field, let the user
//   know they should use the two-character abbreviation
// - If the user types something into shipping, then checks the checkbox, then
//   unchecks the checkbox, ensure the field has the information from
//   before clicking the checkbox the first time

import React from 'react'
import { render } from 'react-dom'
import serializeForm from 'form-serialize'

const CheckoutForm = React.createClass({
  getInitialState() {
    return {
      billingName: 'Chris',
      billingState: 'AZ',
      sameAsBilling: false,
      shippingName: 'Ben',
      shippingState: 'OH'
    }
  },

  handleBillingNameChange(event) {
    this.setState({billingName: event.target.value})
  },

  handleBillingStateChange(event) {
    this.setState({billingState: event.target.value})
  },

  handleShippingNameChange(event) {
    if(!this.state.sameAsBilling) {
      this.setState({shippingName: event.target.value})
    }
  },

  handleShippingStateChange(event) {
    if(!this.state.sameAsBilling) {
      this.setState({shippingState: event.target.value})
    }
  },

  handleCheck(event) {
    this.setState({sameAsBilling: event.target.checked})
  },

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <form>
          <fieldset>
            <legend>Billing Address</legend>
            <p>
              <label>Billing Name: <input
                defaultValue={this.state.billingName}
                type="text"
                onChange={this.handleBillingNameChange}
              /></label>
            </p>
            <p>
              <label>Billing State: <input
                defaultValue={this.state.billingState}
                type="text"
                size="2"
                onChange={this.handleBillingStateChange}
              /></label>
            </p>
          </fieldset>

          <br/>

          <fieldset>
            <label><input
              defaultChecked={this.state.sameAsBilling}
              type="checkbox"
              onChange={this.handleCheck}
            /> Same as billing</label>
            <legend>Shipping Address</legend>
            <p>
              <label>Shipping Name: <input
                value={this.state.sameAsBilling ? this.state.billingName : this.state.shippingName}
                type="text"
                onChange={this.handleShippingNameChange}
              /></label>
            </p>
            <p>
              <label>Shipping State: <input
                value={this.state.sameAsBilling ? this.state.billingState : this.state.shippingState}
                type="text"
                size="2"
                onChange={this.handleShippingStateChange}
              /></label>
            </p>
          </fieldset>
        </form>
      </div>
    )
  }
})

render(<CheckoutForm/>, document.getElementById('app'))
