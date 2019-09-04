import React from 'react';
import { Route } from 'react-router-dom';
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection-page.component';
import { firestore, convertCollectionsToMap } from '../../firebase/firebase.utils';
import { updateShopData } from '../../redux/shop/shop.actions';
import { connect } from 'react-redux';
import WithSpinner from '../../components/with-spinner/with-spinner.component';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

  state = {
    isLoading: true
  }

  unsubscribeFromSnapshot = null

  componentDidMount() {
    const { updateShopData } = this.props;
    const collectionRef = firestore.collection('shopData');
    collectionRef.onSnapshot(async (snapshot) => {
      updateShopData(convertCollectionsToMap(snapshot));
      this.setState({
        isLoading: false
      });
 

    });

  }

  render() {
    const { match } = this.props;
    const { isLoading } = this.state;
    
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={isLoading} {...props} />} />
        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={isLoading} {...props} />} />
      </div>
    );
  }

}


const mapDispatchToProps = dispatch => ({
  updateShopData: collectionMap => dispatch(updateShopData(collectionMap))
});

export default connect(null, mapDispatchToProps)(ShopPage);