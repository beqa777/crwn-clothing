import React, { Component } from 'react';

// router
import { Switch, Route } from 'react-router-dom';

// redux
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user-actions';

//firebase
import { auth, createUserProfileDocument } from './firebase/firebase.util';

// styles
import './App.css';

// page components
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

class App extends Component {
  unsubscribeFromAuth = null

  componentDidMount() {

    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {

      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })

        })
        setCurrentUser(userAuth);

      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>

        <Header />

        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/shop' component={ShopPage} />
          {
            !this.props.currentUser ? <Route exact path='/signin' component={SignInAndSignUp} /> : null
          }

        </Switch>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(App);
