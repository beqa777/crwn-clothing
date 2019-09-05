import { createSelector } from 'reselect';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
);

export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    (collections) => Object.keys(collections).map(key => collections[key])
);

export const selectCollection = collectionUrlParams => createSelector(
    [selectCollections],
    collections => collections[collectionUrlParams]
);

export const selectCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
)

export const selectCollectionLoading = createSelector(
    [selectShop],
    shop => !!shop.collections
) 