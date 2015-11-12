import React, { PropTypes, Component } from "react";
import RoomCreator from "./RoomCreator";
import Room from "./Room";
import Rooms from "./Rooms";

class Chat extends Component {
  static propTypes = {
    rooms: PropTypes.array.isRequired,
    currentRoom: PropTypes.object,
    onCreateRoom: PropTypes.func.isRequired,
    onLeaveRoom: PropTypes.func.isRequired,
    onJoinRoom: PropTypes.func.isRequired
  }

  render() {
    const { rooms, currentRoom } = this.props;

    return (
      <div className="chat">
        {
          currentRoom ?
          <Room { ...this.props } /> :
          this.renderRooms()
        }
      </div>
    );
  }

  renderRooms() {
    return (
      <div>
        <Rooms { ...this.props } />
        <RoomCreator { ...this.props } />
      </div>
    )
  }
}

export default Chat;