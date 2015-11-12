import React, { PropTypes, Component } from "react";

class Welcome extends Component {
  static propTypes = {
    onJoinServer: PropTypes.func.isRequired
  }

  onSubmit = (e) => {
    e.preventDefault();
    const name = this.refs.username.value;
    this.props.onJoinServer(name);
  }

  render() {
    return (
      <form className="welcome" onSubmit={ this.onSubmit }>
        <div className="form-group">
          <label htmlFor="welcome-input">Enter your username</label>
          <input ref="username" type="text" className="form-control" id="welcome-input" placeholder="Eg. Coolboy20" />
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    );
  }
}

export default Welcome;