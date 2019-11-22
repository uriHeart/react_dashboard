import React, { Component } from "react";

export default class ButtonLoader extends Component {
  state = {
    loading: false
  };

  fetchData = () => {
    this.setState({ loading: true });
    this.props.process().then(() => {
      this.setState({ loading: false });
    });
  };

  render() {
    const { loading } = this.state;

    return (
      <div style={{ marginTop: "20px" }}>
        <button className={this.props.class || 'button'} onClick={this.fetchData} disabled={loading}>
          {loading && (
            <i
              className="fa fa-refresh fa-spin"
              style={{ marginRight: "5px" }}
            />
          )}
          {loading && <span>{this.props.text}</span>}
          {!loading && <span>{this.props.text}</span>}
        </button>
      </div>
    );
  }
}
