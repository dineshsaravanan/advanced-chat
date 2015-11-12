import React, { PropTypes, Component } from "react";

class RoomCreator extends Component {
  static propTypes = {
    onCreateRoom: PropTypes.func.isRequired
  }

  onSubmit = (e) => {
    e.preventDefault();
    const name = this.refs.roomname.value;
    this.props.onCreateRoom(name);
  }

  render() {
    return (
      <div className="well">
        <h3>Can't find a room? Create one!</h3>
        <form className="chat-room-creator" onSubmit={ this.onSubmit }>
          <div className="form-group">
            <label htmlFor="room-creator-input">What's your room name?</label>
            <input ref="roomname" type="text" className="form-control" id="room-creator-input" placeholder="Eg. Topshop" />
          </div>
          <button type="submit" className="btn btn-success">Create Room</button>
        </form>
      </div>
    );
  }
}

export default RoomCreator;