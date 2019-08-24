import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { withRouter } from 'react-router-dom';

import { signInWithGoogle } from '../../firebase/firebase.util';

import './sign-in.styles.scss';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            email: '',
            password: ''
        });
    }

    handleChange = (e) => {
        const { value, name } = e.target;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className='sign-in'>

                <h2> i already have account </h2>
                <span> Sign in with you email and password </span>

                <form onSubmit={this.onSubmit}>

                    <FormInput type='email' name='email' value={this.state.email}
                        handleChange={this.handleChange} label='Email' required />

                    <FormInput type='password' name='password' value={this.state.password}
                        handleChange={this.handleChange} label='Password' required />

                    <div className='buttons'>
                        <CustomButton type='submit'> Sign In</CustomButton>
                        <CustomButton isGoogleSignIn onClick={ async () => {
                            await signInWithGoogle();
                            this.props.history.push('/');
                        }}>
                            Sign In with google
                    </CustomButton>
                    </div>

                </form>

            </div>
        );
    }

}

export default withRouter(SignIn);