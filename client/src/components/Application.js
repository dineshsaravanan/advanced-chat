import React, { PropTypes, Component } from "react";
import Welcome from "./Welcome";
import Chat from "./Chat";
import _ from "lodash";

class Application extends Component {
  constructor(props) {
    super(props);

    this.state = {
      joined: false,
      rooms: {},
      currentRoom: null
    };
  }

  componentDidMount() {
    this.socket = io.connect();

    this.socket.on("joined", () => {
      this.setState({ joined: true });
    });

    this.socket.on("roomList", ({ rooms, count }) => {
      this.setState({ rooms });
    });

    this.socket.on("sendRoomID", ({ id }) => {
      const room = this.state.rooms[id];
      this.setState({ currentRoom: room });
    });
  }

  componentWillUnmount() {
    // ensure we do not have any memory leaks
    this.socket = null;
  }

  onJoinServer = (name) => {
    this.socket.emit("joinserver", name);
  }

  onCreateRoom = (name) => {
    this.socket.emit("createRoom", name);
  }

  onLeaveRoom = () => {
    const roomId = this.state.currentRoom;
    this.socket.emit("leaveRoom", roomId);
    this.setState({
      currentRoom: null
    });
  }

  onJoinRoom = (roomId) => {
    this.socket.emit("joinRoom", roomId);
  }

  render() {
    const { joined, rooms, currentRoom } = this.state;
    const roomsArray = _.values(rooms);

    return (
      <div id="application">
        {
          joined ?
          <Chat
            rooms={ roomsArray }
            currentRoom={ currentRoom }
            onCreateRoom={ this.onCreateRoom }
            onLeaveRoom={ this.onLeaveRoom }
            onJoinRoom={ this.onJoinRoom }
          /> :
          <Welcome onJoinServer={ this.onJoinServer } />
        }
      </div>
    );
  }
}

export default Application;