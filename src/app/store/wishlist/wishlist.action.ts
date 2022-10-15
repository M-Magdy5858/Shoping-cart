import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/interfaces/product';

export const addToWishlist = createAction(
  '[list page] add to wishlist',

  props<Product>()
);

export const removeFromWishlist = createAction(
  '[list Page] remove from wishlist',
  props<{ id: string }>()
);
