
import { createSlice } from '@reduxjs/toolkit';


  const CartSlice= createSlice({
    name:"cart",
    initialState:{ cartItems:[], totalAmount:0, totalQuantity:0
  },
  reducers:{

    // add to cart 
    addToCart(state,action){
      //check item existing
      
      const existingItem=  state.cartItems.find((item)=>item.id===action.payload.id)

      

      if(existingItem){
      
       existingItem.quantity++;
       state.totalAmount+=existingItem.price;
       state.totalQuantity++;

      }else {
        state.cartItems.push({...action.payload,quantity:1})
        state.totalQuantity++;
        state.totalAmount+=action.payload.price;
      }
    },
    increaseQuantity(state,action){
      //find item increase quantity ND update total
      const existingItem= state.cartItems.find((item)=>item.id===action.payload.id)
      if(existingItem){
        existingItem.quantity++;
        state.totalAmount+=existingItem.price;
        state.totalQuantity+=1;
      }else{
        state.cartItems.push({ ...action.payload, quantity: 1 }); // add first time
      }
    },
    decreaseQuantity(state,action){
      //find item decrease quantity ND update total
      const existing=state.cartItems.find((items)=> items.id===action.payload.id)
      if(existing.quantity>1){
        existing.quantity--;
        state.totalAmount-=existing.price;
        state.totalQuantity-=1;

      }else{
        state.cartItems=state.cartItems.filter(items=> items.id!==action.payload.id )
        existing.quantity=0;
        existing.price=0;
      }
    },
    removeFromCart(state,action){
      //remove from the cart
      const existingItems= state.cartItems.find((item)=>item.id===action.payload.id)

      if(existingItems){
        state.cartItems = state.cartItems.filter(items => items.id !== action.payload.id)
        state.totalAmount -= existingItems.price;
        state.totalQuantity -= 1;

      }
    },
    clearCart(state){
      state.cartItems=[];
      state.totalAmount=0;
      state.totalQuantity=0;

      //reset Everything
    },
     


  },
});
  


export const {addToCart,increaseQuantity,decreaseQuantity,removeFromCart,clearCart}=CartSlice.actions;


export default CartSlice.reducer;
