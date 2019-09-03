import React from 'react';
import { Route } from 'react-router-dom';
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection-page.component';
import { firestore, convertCollectionsToMap } from '../../firebase/firebase.utils';
import { updateShopData } from '../../redux/shop/shop.actions';
import { connect } from 'react-redux';

class ShopPage extends React.Component {

  unsubscribeFromSnapshot = null

  componentDidMount() {
    const { updateShopData } = this.props;
    const collectionRef = firestore.collection('shopData');
    collectionRef.onSnapshot(async (snapshot) => {
      updateShopData(convertCollectionsToMap(snapshot));
    });

  }

  render() {
    const { match } = this.props;

   // return <div></div>;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionOverview} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPage} />
      </div>
    );
  }

}


const mapDispatchToProps = dispatch => ({
  updateShopData: collectionMap => dispatch(updateShopData(collectionMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);