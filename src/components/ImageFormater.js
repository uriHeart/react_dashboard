class ImageFormatter extends React.Component {
    render() {
        return (
            <div>
                <img src={this.props.value}/> //this.props.value should contain the path
            </div>
        )
    }
}