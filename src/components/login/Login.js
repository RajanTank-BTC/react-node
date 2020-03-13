import React, { Component } from "react";
import { Row, FormGroup, FormControl, FormLabel as ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import './login.sass';
import { isEmail, isEmpty, isLength, isContainWhiteSpace } from 'shared/validator';
import { loginNewUser, userInfo } from '../api/login'

class Login extends Component {

    constructor(props) {
        console.log(props)
        super(props)

        this.state = {
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form
            loading: false // Indicates in progress state of login form
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    validateLoginForm = (e) => {

        let errors = {};
        const { formData } = this.state;

        if (isEmpty(formData.email)) {
            errors.email = "Email can't be blank";
        } else if (!isEmail(formData.email)) {
            errors.email = "Please enter a valid email";
        }

        if (isEmpty(formData.password)) {
            errors.password = "Password can't be blank";
        } else if (isContainWhiteSpace(formData.password)) {
            errors.password = "Password should not contain white spaces";
        } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
            errors.password = "Password's length must between 6 to 16";
        }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

    login = (e) => {
        const { formData } = this.state

        e.preventDefault();

        let errors = this.validateLoginForm();

        if (errors === true) {
            let body = {
                email: formData.email,
                password: formData.password
            }
            loginNewUser(body).then(res => {
                localStorage.setItem("token", res.data.token);
                alert("You are successfully signed in...");
                this.props.history.push('/info')
                console.log(res)
            })
            // window.location.reload()
        } else {
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }

    getInfo = () => {
        let token = localStorage.getItem("token")
        userInfo({ "token": token }).then(res => {
            console.log(res)
        })
            .catch(error => {
                console.log(error.response)
            })
    }

    render() {

        const { errors, formSubmitted } = this.state;
        console.log(this.props)
        return (
            <div className="Login">
                <Row>
                    <form onSubmit={this.login}>
                        <FormGroup controlId="email" validationState={formSubmitted ? (errors.email ? 'error' : 'success') : null}>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl type="text" name="email" placeholder="Enter your email" autoComplete="off" onChange={this.handleInputChange} />
                            {/* {errors.email &&
                                <HelpBlock>{errors.email}</HelpBlock>
                            } */}
                        </FormGroup>
                        <FormGroup controlId="password" validationState={formSubmitted ? (errors.password ? 'error' : 'success') : null}>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} />
                            {/* {errors.password &&
                                <HelpBlock>{errors.password}</HelpBlock>
                            } */}
                        </FormGroup>
                        <Button type="submit" bsStyle="primary">Sign-In</Button>
                    </form>
                </Row>
                {/* <Button type="button" bsStyle="primary" onClick={() => this.getInfo()} >Get Info</Button> */}
            </div>
        )
    }
}

export default Login;