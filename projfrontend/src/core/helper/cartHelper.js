export const addItemToCart = (item,productId, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({
      ...item,
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    // let products = [];
    // if (localStorage.getItem("products")) {
    //   products = JSON.parse(localStorage.getItem("products"));
    // }
    // products.map((item, index) => {
    //   if (item._id === productId) {
    //     products.splice(index, 1);
    //   }
    // });
    // localStorage.setItem("products", JSON.stringify(products));
    next();
  }
};

export const loadCart = () => {
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
};

export const removeItemFromCart = (productId, item, next) => {
  let cart = [];
  if (typeof window !== undefined) {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.map((item, index) => {
      if (item._id === productId) {
        cart.splice(index, 1);
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    // let products = [];
    // if (localStorage.getItem("products")) {
    //   products = JSON.parse(localStorage.getItem("products"));
    // }
    // products.push(item);
    // localStorage.setItem("products", JSON.stringify(products));
    next();
  }
};

export const cartEmpty = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("cart");
    next();
  }
};
