import React, { PropTypes, Component } from "react";

class Rooms extends Component {
  static propTypes = {
    rooms: PropTypes.array.isRequired,
    onJoinRoom: PropTypes.func.isRequired
  }

  render() {
    const { rooms } = this.props;

    return (
      <div className="row">
        { rooms.map(this.renderRoom) }
      </div>
    );
  }

  renderRoom = (room, index) => {
    const usersCount = room.people.length;

    return (
      <div className="col-xs-12" key={ index }>
        <div className="well">
          <h4>{ room.name }</h4>
          <p>
            { usersCount }
            &nbsp;
            { usersCount > 1 || usersCount === 0 ? "users" : "user" }
          </p>
          <button
            type="button"
            className="btn btn-sm btn-info"
            onClick={ this.props.onJoinRoom.bind(this, room.id) }
          >
            Join Room
          </button>
        </div>
      </div>
    )
  }
}

export default Rooms;