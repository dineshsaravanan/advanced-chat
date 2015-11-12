$(document).ready(function() {
	var socket = io.connect('http://localhost:3000');
	var statuses=[];
	var messages=[];

	var render = function(html){
		$('#main_content').html(html);
	};

	var renderLogged = function(html){
		render(html);
		renderFooter();
	};

	var renderFooter = function(){
		var source = $("#statuses-template").html();
		var template = Handlebars.compile(source);
		var context = {
			statuses: statuses
		};
		$('#footer').html(template(context));
	};

	var renderRooms = function(rooms, count){
		var source = $("#rooms-template").html();
		var template = Handlebars.compile(source);
		var context = {
			rooms: rooms,
			count: count
		};
		$('#rooms').html(template(context));
	};

	var renderOnlinePeople = function(peopleOb){
		var peopleInRoom =[];
		var people = []
		Object.keys(peopleOb).forEach(function(personId){
			var person = peopleOb[personId];
			people.push(person);
			if (person.inroom){
				peopleInRoom.push(person);
			}	
		});

		var source = $("#people-online-template").html();
		var template = Handlebars.compile(source);
		var context = {
			title: 'Online people',
			people: people,
			count: people.length
		};
		$('#online-people').html(template(context));

		context = {
			title: 'People in room',
			people: peopleInRoom,
			count: peopleInRoom.length
		};
		$('.people-list').html(template(context));
	};

	var renderMessage = function(msTime, person, message){
		messages.push({
			time: (new Date(msTime)).toDateString(),
			person: person.name,
			message: message
		})
		var source = $("#messages-template").html();
		var template = Handlebars.compile(source);
		var context = {
			messages: messages,
		};
		$('.messages').html(template(context));
	};

	var login = function(username){
		socket.emit('joinserver', username, 'device');
	};

	var logout = function(){
		socket.emit('disconnect');
		statuses=[];
		showLogin();
	};

	var createRoom = function(roomName){
		socket.emit('createRoom', roomName);
	}

	var joinRoom = function(roomId){
		socket.emit('joinRoom', roomId);
	}

	var sendMessage = function(message){
		socket.emit('send', (new Date()).getTime(), message);
	}


	var listener = function(){
		socket.on('exists', function(response){
			showLogin(response.proposedName, response.msg);
		});

		socket.on('update', function(response){
			statuses.push({
				message: response
			});
			renderFooter();
		});

		socket.on('joined', function(response){
			var source = $("#logged-template").html();
			var template = Handlebars.compile(source);
			var context = {
				username: username,
			}
			renderLogged(template(context));
			setInterval(function(){
				socket.emit('getOnlinePeople', function(response){
					renderOnlinePeople(response.people);
				});
			}, 1000);
		});

		socket.on('roomList', function(response){
			renderRooms(response.rooms, response.count);
		});

		socket.on('update-people', function(response){
			renderOnlinePeople(response.people);
		});

		socket.on('chat', function(msTime, person, message){
			renderMessage(msTime, person, message);
		});
	}

	var showLogin = function(username, error){
		var source = $("#login-template").html();
		var template = Handlebars.compile(source);
		var context = {
			username: username,
			error: error
		}
		render(template(context));
	};


	//listen all events
	listener();

	//Check if user has a cookie
	var username = $.cookie('user');
	if (!username) {
		showLogin();
	} else {
		login(username);
	}

	//Handlers
	$(document).on('click', '#login', function(){
		username = $('#username').val().trim();
		$.cookie('user', username);
		login(username);
	})
	.on('click', '#createroom', function(){ //Create a room
		var roomName=$('#newroomname').val().trim();
		if(roomName){
			createRoom(roomName);
		}
	})
	.on('click', '#logout', logout)
	.on('click', '.join-room-btn', function(){
		var idRoom = $(this).data('room');
		joinRoom(idRoom);
	})
	.on('click', '.sendmessage', function(){
		var message = $(this).siblings('.sendmessagetext').val().trim();
		sendMessage(message);
	});

});