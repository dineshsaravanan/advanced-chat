$(function () {

	var socket = io.connect('http://localhost:3000');
	var chatterApp = new Chatter(socket);
	chatterApp.initialize();

});

var rooms;
var people;
var inRoom;

var Chatter = function (socket) {

	this.socket = socket;
	this.userName = null;
	this.device = null;
};

Chatter.prototype.initialize = function () {

	var t = this,
		socket = this.socket;


	// listen to server updates
	socket.on('update', function () {
		console.log('update');
		console.log(arguments);
	});

	socket.on('exists', function () {
		console.log('exists already');
	});

	socket.on('roomList', function (roomList) {

		var rooms = roomList.rooms;
		for (var roomKey in rooms) {
			roomObj = rooms[roomKey];
			$('.room-list').append("<div class='room-entry'><span>" + roomObj.name + "</span><input roomId='" + roomObj.id + "' type='button' value='Join Room'/></div>");
		}

		$('.room-list').show();
	});

	socket.on('update-people', function (peopleObj) {
		console.log('update people');

	});

	socket.on('sendRoomID', function (roomObj) {
		inRoom = roomObj.id;
		$('.chat-room').show();


	});

	socket.on('history', function () {


	});

	socket.on('chat', function (timeStamp, sentBy, msg) {

		$('.history-block').append("<div className='chat-entry'><div='chat-sender'>" + sentBy.name + "</div><div class='chat-msg'>"+msg+"</div></div>");
	});

	socket.on('whisper', function (timeStamp, sentBy, msg) {

	});

	socket.on('isTyping', function (isTyping) {

		if (!isTyping) {
			$('.typing-promtp').html('');
		} else {
			$('.typing-promtp').html('<i>' + isTyping.person + ' is typing</i>');
		}
	});
	$('.user-name, .user-device').on('keyup', function (e) {
		if (e.keyCode === 13) {
			t.joinServer();
		}
	})

	$('.join-server').click(function () {
		t.joinServer();
	});

	$('.create-room').click(function () {

		var roomName = $('.room-name').val();
		if (roomName) {
			socket.emit('createRoom', roomName);
		} else {
			alert('Room name cannot be blank');
		}
	});

	$('.room-list').on('click', function (e) {

		var roomId = $(e.target).attr('roomId');
		socket.emit('joinRoom', roomId);
	});

	$('.chat-msg').on('keyup', function (e) {

		if (e.keyCode === 13) {
			var msg = $(this).val();
			if (msg) {
				socket.emit('send', new Date().getTime(), msg);
			}
		}
	});
};

Chatter.prototype.joinServer = function () {

	this.userName = $('.user-name').val();
	this.device = $('.user-device').val();

	if (this.userName && this.device) {
		this.socket.emit('joinserver', this.userName, this.device);
	} else {
		alert('Username & device cannot be blank!');
	}
};


var Room = function () {

}



