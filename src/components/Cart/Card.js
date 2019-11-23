import React, { Component } from "react";
import { ProductConsumer } from "../../context";
import Title from "../Title";
import CartColumns from "./CartColumns";
import CartList from "./CartList";
import CartTotal from "./CartTotal";

class Card extends Component {
  state = {};
  render() {
    return (
      <ProductConsumer>
        {value => {
          const { cart } = value;
          if (cart.length === 0) {
            return <Title title="Cart is currently emty" />;
          } else {
            return (
              <React.Fragment>
                <Title name="your" title="cart" />
                <CartColumns />
                <CartList value={value} />
                <CartTotal value={value} />
              </React.Fragment>
            );
          }
        }}
      </ProductConsumer>
    );
  }
}

export default Card;
