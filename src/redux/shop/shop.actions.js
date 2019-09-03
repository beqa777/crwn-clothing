import ShopActionTypes from './shop.types';

export const updateShopData = collection => ({
    type: ShopActionTypes.UPDATE_SHOP_DATA,
    payload: collection
});