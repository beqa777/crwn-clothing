import React from 'react';

import shopData from './shop.data.js';
import PreviewComponent from '../../components/collection-preview/collection-preview.component';

class ShopPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collection: shopData
        }
    }

    render() {
        return (
            <div>
                {
                    this.state.collection.map(({ id, ...restProps }) => (
                        <PreviewComponent key={id} {...restProps} />
                    ))
                }
            </div>
        );
    }

}

export default ShopPage;