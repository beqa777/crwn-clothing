import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { withRouter } from 'react-router-dom';

import { auth, signInWithGoogle } from '../../firebase/firebase.util';

import './sign-in.styles.scss';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    onSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = this.state;

        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.props.history.push('/');
        } catch (error) {
            alert(error.message);
            console.error(error);
        }
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
                        <CustomButton type='submit' onClick={this.onSubmit}> Sign In</CustomButton>
                        <CustomButton isGoogleSignIn onClick={async () => {
                            try {
                                await signInWithGoogle();
                                this.props.history.push('/');
                            } catch (error) {
                                console.error(error.message);
                            }
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