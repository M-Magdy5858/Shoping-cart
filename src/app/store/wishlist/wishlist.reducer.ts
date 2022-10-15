import { createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/interfaces/product';
import { addToWishlist, removeFromWishlist } from './wishlist.action';

const initialState: Array<Product> = [];

export const wishlistReducer = createReducer(
  initialState,
  on(addToWishlist, (state, action) => {
    if (
      state.some((product) => {
        return product.id == action.id;
      })
    )
      return [...state];
      
    return [...state, action];
  }),

  on(removeFromWishlist, (state, action) => {
    state = state.filter((prod) => {
      return prod.id != action.id;
    });
    return [...state];
  })
);
