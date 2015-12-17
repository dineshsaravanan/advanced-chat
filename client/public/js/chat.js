/**
 * Created by anilande on 17/12/15.
 */
var Chat = {
    socket: null,
    user: '',
    room: '',
    roomId: 0,
    messagesNode: $('#messages'),
    container: $('#chatWindow'),
    init: function (socket, name, room) {
        this.socket = socket;
        this.user = name;
        this.room = room;
        this.sync();
        this.startSession(name, room, 'india');
        this.render();
    },
    render: function () {
        this.container.show();
    },
    sync: function () {
        var self = this;
        $('#send', this.container).click(function () {
            self.sendMessage(self.messagesNode.val());
        });
        $('#message', this.container).keypress(function () {
            self.sendStatus();
        });
        $('#close', this.container).click(function () {
            self.stopSession();
        });
        $(document).on('roomList', function () {
            if (self.roomId) {
                self.joinRoom(self.roomId);
            }
        });
    },
    startSession: function (name, room) {
        this.socket.emit('joinserver', name);
        this.socket.emit('createRoom', room);
        // Room('test', 1, 'anilande');
        //this.socket.emit('countryUpdate', country);
    },
    sendMessage: function (message) {
        this.socket.emit('send', new Date(), message);
    },
    checkuser: function (user) {
        this.socket.emit('check', user, function (data) {
            if (!data.status) {
               return true;
            } else {
                return false;
            }
        });
    },
    joinRoom: function (id) {
        if (!this.checkuser()) {
            this.socket.emit('joinRoom', id);
        }
    },
    sendStatus: function () {
        this.socket.emit('typing');
    },
    stopSession: function () {
        this.socket.emit('disconnect');
    }
};

var Login = {
    socket: null,
    container: $('#login'),
    nameNode: $('#name'),
    roomNode: $('#room'),
    init: function (socket) {
        this.socket = socket;
        this.render();
        this.sync();
    },
    render: function () {
        this.container.show();
    },
    sync: function () {
        var self = this;
        $('#chatNow', this.container).click(function () {
            var socket = self.socket;
            Listner.init(socket);
            Chat.init(socket, self.nameNode.val(), self.roomNode.val());
            userList.init(socket);
            self.container.hide();
        });
    }
};

var userList = {
    socket: null,
    listNode: $('#users'),
    init: function (socket) {
        this.socket = socket;
        this.render();
    },
    render: function () {
        this.renderUserList(function (data) {
            console.log(data);
        });
    },
    sync: function () {
        var self = this;
        $('#chatNow', this.container).click(function () {
            Chat.init(self.nameNode.val());
        });
    },
    renderUserList: function (callback) {
        this.socket.emit('getOnlinePeople', function(data) {
            var self = this,
                people = data.people;
            $.each(people, function (index, value){
                $('ul', self.listNode).append('<li>'+ value.name +'</li>');
            });
        });
    }
};

var Listner = {
    socket: null,
    statusNode: $('#status'),
    init: function (socket) {
        this.socket = socket;
        this.sync();
    },
    sync: function () {
        self = this;
        this.socket.on('update-people', function (data) {
            var people = data.people;
            $.each(people, function (index, value){
                $('ul', userList.nameNode).append('<li>'+ value.name +'</li>');
            });
        });

        this.socket.on('isTyping', function (data) {
            self.statusNode.html(data.name + ' typing...');
        });
        this.socket.on('changeRoomList', function (data) {
            var id = Object.keys(data.rooms)[0];
            if (id) {
                Chat.roomId = id;
                $(document).trigger('roomList');
            }
        });

    }
};

