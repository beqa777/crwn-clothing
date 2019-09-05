import React from 'react';
import { Route } from 'react-router-dom';
import CollectionOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection-page.component';
import { connect } from 'react-redux';
import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { startCollectionFetchAsync } from '../../redux/shop/shop.actions';
import { createStructuredSelector } from 'reselect';
import { selectCollectionFetching, selectCollectionLoading } from '../../redux/shop/shop.selectors';

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {

  state = {
    isLoading: true
  }


  componentDidMount() {
    const { startCollectionFetchAsync } = this.props;
    startCollectionFetchAsync();
  }

  render() {
    const { match, isLoading } = this.props;
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} render={(props) => <CollectionOverviewWithSpinner isLoading={!isLoading} {...props} />} />
        <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={!isLoading} {...props} />} />
      </div>
    );
  }

}


const mapToStateProps = createStructuredSelector({
  isFetching: selectCollectionFetching,
  isLoading: selectCollectionLoading
})

const mapDispatchToProps = dispatch => ({
  startCollectionFetchAsync: () => dispatch(startCollectionFetchAsync())
});

export default connect(mapToStateProps, mapDispatchToProps)(ShopPage);