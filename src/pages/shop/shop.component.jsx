import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { startCollectionFetchAsync } from '../../redux/shop/shop.actions';

import CollectionOverviewContainer from '../../components/collections-overview/collection-overview-container';
import CollectionPageContainer from '../collection/collection-page-container';


class ShopPage extends React.Component {

  componentDidMount() {
    const { startCollectionFetchAsync } = this.props;
    startCollectionFetchAsync();
  }

  render() {
    const { match } = this.props;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
      </div>
    );
  }

}

const mapDispatchToProps = dispatch => ({
  startCollectionFetchAsync: () => dispatch(startCollectionFetchAsync())
});

export default connect(null, mapDispatchToProps)(ShopPage);