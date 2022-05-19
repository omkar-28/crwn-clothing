import { createContext, useState, useEffect} from 'react'

export const CartContext = createContext()

const addCartItem = (cartItems, productToAdd) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === productToAdd.id)

    if(existingItem){
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id 
            ? {...cartItem, quantity: cartItem.quantity + 1} 
            : cartItem
        )
    }

    return [...cartItems, {...productToAdd, quantity:1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    // find the cart item to remove
    const existingCartItem = cartItems.find((cartItem)=> cartItem.id === cartItemToRemove.id)

    // check if quantity is equal to 1, if it is remove that item from the cart
    if(existingCartItem.quantity === 1){
        return cartItems.filter((cartItem)=> cartItem.id !== cartItemToRemove.id)
    }

    // return back cartitems with matching cart item with reduced quantity
    return cartItems.map((cartItem) => 
        cartItem.id === cartItemToRemove.id 
        ? {...cartItem, quantity: cartItem.quantity - 1} 
        : cartItem
    )
}

const clearCartItem = (cartItems, cartItemToClear) => cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id)

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false) 
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) =>total + cartItem.quantity,0)
        setCartCount(newCartCount);

    }, [cartItems])
    
    useEffect(()=>{
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price,0)
        setCartTotal(newCartTotal)
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }

    const clearItemFromCart = (cartItemToClear) => [
        setCartItems(clearCartItem(cartItems, cartItemToClear))
    ]
    
    return(
        <CartContext.Provider value={{
            isCartOpen, 
            removeItemToCart,
            setIsCartOpen, 
            clearItemFromCart,
            addItemToCart, 
            cartItems, 
            cartCount, 
            cartTotal
        }}>
            {children}
        </CartContext.Provider>
    )
}