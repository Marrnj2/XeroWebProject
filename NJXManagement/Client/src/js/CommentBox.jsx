import { Card, Button, Alert } from "tabler-react";

class CommentBox extends React.Component {
    render() {
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
}

ReactDOM.render(<CommentBox />, document.getElementById('content'));
