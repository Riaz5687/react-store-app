import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };

  componentDidMount() {
    this.setProducts();
  }

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });

    this.setState(() => {
      return { products: tempProducts };
    });
  };

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetails = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };

  addToCard = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    let product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    let price = product.price;
    product.total = price;
    this.setState(
      () => {
        return { products: tempProducts, cart: [...this.state.cart, product] };
      },
      () => {
        this.addTotal();
      }
    );
  };

  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment = id => {
    const tempCart = [...this.state.cart];
    const index = tempCart.indexOf(this.getItem(id));
    let product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    this.setState(
      () => {
        return {
          cart: tempCart
        };
      },
      () => {
        this.addTotal();
      }
    );
  };

  decrement = id => {
    const tempCart = [...this.state.cart];
    const index = tempCart.indexOf(this.getItem(id));
    let product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeCart(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return {
            cart: [...tempCart]
          };
        },
        () => {
          this.addTotal();
        }
      );
    }
  };

  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotal();
      }
    );
  };

  removeCart = id => {
    const tempCart = [...this.state.cart];
    const tempProducts = [...this.state.products];
    const cartItems = tempCart.filter(item => id !== item.id);
    const index = tempProducts.indexOf(this.getItem(id));
    let product = tempProducts[index];
    product.count = 0;
    product.inCart = false;
    product.total = product.price;
    this.setState(
      () => {
        return {
          cart: [...cartItems],
          products: [...tempProducts]
        };
      },
      () => {
        this.addTotal();
      }
    );
  };

  addTotal = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    let tempTax = subTotal * 0.1;
    let tax = parseFloat(tempTax.toFixed(2));
    let total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total
      };
    });
  };

  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetails: this.handleDetails,
          addToCard: this.addToCard,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeCart: this.removeCart,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
