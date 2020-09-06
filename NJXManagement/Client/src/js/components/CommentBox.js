import React from 'react';
import { Card, Button, Alert } from "tabler-react";

function CommentBox() {
        return (
            <>
                <Alert type="primary" hasExtraSpace>hello</Alert>

                <Card>
                    <Card.Header>
                        <Card.Title>Card Title</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Button color="primary">A Button</Button>
                    </Card.Body>
                </Card>
            </>
        );
}

export default CommentBox