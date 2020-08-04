import Button from '../../wwwroot/node_modules/@material-ui/core/Button';

class CommentBox extends React.Component {
    render() {
        return (
                <div className="commentBox">
                    testing
                </div>
        );
    }
}
console.log('Testing hello yay')

ReactDOM.render(<CommentBox />, document.getElementById('content'));
