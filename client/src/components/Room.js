import React, { PropTypes, Component } from "react";

class Room extends Component {
  static propTypes = {
    currentRoom: PropTypes.object,
    onLeaveRoom: PropTypes.func.isRequired
  }

  render() {
    const { currentRoom } = this.props;
    const usersCount = currentRoom.people.length;

    return (
      <div className="well">
        <h4>Welcome to { currentRoom.name }</h4>
        <p className="small">
          There
          &nbsp;
          { usersCount > 1 || usersCount === 0 ? "are" : "is" }
          &nbsp;
          { usersCount }
          &nbsp;
          { usersCount > 1 || usersCount === 0 ? "users" : "user" }
          &nbsp;
          here!
        </p>
        <div>
          <button
            className="btn btn-sm btn-danger"
            type="button"
            onClick={ this.props.onLeaveRoom }
          >
            Leave Room
          </button>
        </div>
      </div>
    );
  }
}

export default Room;