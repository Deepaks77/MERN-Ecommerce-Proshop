export const addItemToCart = (cartItems, cartItemtoAdd) => {
  //const { qty } = cartItemtoAdd;

  const existingcartItems = cartItems.find(
    (cartitem) => cartitem.pid === cartItemtoAdd.pid
  );

  if (existingcartItems) {
    return cartItems.map((cartitem) =>
      cartitem.pid === cartItemtoAdd.pid ? { ...cartItemtoAdd } : cartitem
    );
  } else {
    return [...cartItems, { ...cartItemtoAdd }];
  }
};

export const clearItemFromCart = (cartItems, id) => {
  return cartItems.filter((cartItem) => cartItem.pid !== id);
};
