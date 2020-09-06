import React, {Component} from "react";
import { Card, Button, Form } from "tabler-react";

class LoginForm extends Component {
    render() {
        return (
            <Card>
                <Card.Body>
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
