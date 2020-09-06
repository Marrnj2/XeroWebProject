import React, {Component} from "react";
import { Card, Button, Form, Header } from "tabler-react";

/**
 * A form to be displayed to allow the user to login
 * @component
 */
class LoginForm extends Component {
    render() {
        return (
            <Card>
                <Card.Body>
                <Header.H4>Login to your Account</Header.H4>
                <Form>
                    <Form.Input name='email' label='Email Address' placeholder='Enter Email' />
                    <Form.Input name="password" label="Password" placeholder="Enter Password" type="password" />
                    <Button type='submit' value='Submit' color="primary">Login</Button>
                </Form>
                </Card.Body>
            </Card>
        );
    }
}

export default LoginForm;
