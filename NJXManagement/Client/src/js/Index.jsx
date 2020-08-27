class CommentBox extends React.Component {
    render() {
        return (
        <>
                <span data-xero-sso data-label="Sign in with Xero"></span>
                <script src="https://edge.xero.com/platform/sso/xero-sso.js" async defer></script>
        </>

        );
    }
}

ReactDOM.render(<CommentBox />, document.getElementById('content'));
