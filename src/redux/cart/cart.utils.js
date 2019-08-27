
export const addItemToCart = (cartItems, itemToAdd) => {
    const existingItemToCart = cartItems.find(
        cartItem => cartItem.id === itemToAdd.id
    );

 

    if (existingItemToCart) {
        return cartItems.map(cartItem =>
            cartItem.id === itemToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }

    return [...cartItems, { ...itemToAdd, quantity: 1 }]
}