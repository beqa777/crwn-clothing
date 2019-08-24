import React from 'react';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './sign-up.styles.scss';
import { auth, createUserProfileDocument } from '../../firebase/firebase.util';
import { withRouter } from 'react-router-dom';


class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert('passwords not match');
            return;
        }

        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, {
                displayName
            });
            this.props.history.push('/');
        } catch (error) {
            alert(error.message);
            console.error(error.message);
        }
    }

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'> i do not have account</h2>
                <span> Sign up with you email and password </span>

                <form onSubmit={this.handleSubmit}>

                    <FormInput
                        type='text'
                        value={displayName}
                        label='Display name'
                        name='displayName'
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput
                        type='email'
                        value={email}
                        label='Email'
                        name='email'
                        handleChange={this.handleChange}
                        required
                    />

                    <FormInput
                        type='password'
                        value={password}
                        label='Password'
                        name='password'
                        handleChange={this.handleChange}
                        required
                    />

                    <FormInput
                        type='password'
                        value={confirmPassword}
                        label='Confirm password'
                        name='confirmPassword'
                        handleChange={this.handleChange}
                        required
                    />

                    <CustomButton type='submit'> Sign up </CustomButton>

                </form>

            </div>
        );
    }

}

export default withRouter(SignUp);