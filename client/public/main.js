var socket= io.connect('http://localhost:3000');

var chatApp = {

  username: null,
  currentRoom: null,
  deviceID: (new Date().getTime()),
  userlist: null,
  currentView: ($('.view-welcome')),


  viewController: function (value) {

    var allViews = $('.view');

    if(value) {

      console.log('hiding all views');
      allViews.hide();

      this.currentView = value;
    }

    this.currentView.show();
    console.log(this);
  },



  setUsername: function(value) {
    if (value) {
      username = value;
      console.log('username set');
      return true;
    }

    console.log('Username Not Set');
    return false;
  },

  checkUsername: function() {
    socket.emit("check", function(result) {
      //TODO
    })
  },

  connectToServer: function() {
    socket.emit("joinServer", this.username, this.deviceID);
  },


  disconnectFromServer: function() {
    socket.emit("disconnect", this.username, this.deviceID);
  },

  changeUserCountry: function(value) {
    socket.emit("countryUpdate", {country: value});
  },

  fetchUsers: function() {
    socket.emit('getOnlinePeople', function(result) {
      console.log(result);
    })
  },

  sendTypingEvent: function() {
    // TODO
  },

  sendChatMessage: function(value) {
    socket.emit("send",(new Date().getTime()),value)
  },

  createChatRoom: function(value) {
    socket.emit("createRoom", value);
  },

  removeRoom: function(value) {
    socket.emit("removeRoom", value);
  },

  joinRoom: function(value) {
    socket.emit("joinRoom", value);
  },

  leaveRoom: function(value) {
    socket.emit("leaveRoom", value);
  },



  //Events
  assignEvents: (function() {

    //messages
    socket.on("update", function(msg) {
      $('#chatbox-room').find('ul').append('li').text(msg);
    });


    //buttons

    $('#btn-set-user').on('click', function() {
      chatApp.setUsername($('#username-field').val());
      chatApp.connectToServer();
      chatApp.viewController($('.view-create'));
    });

    $('#btn-create-room').on('click', function() {
      //chatApp.createChatRoom();
      chatApp.joinRoom($('#roomname-field').val());
      chatApp.viewController($('.view-room'));
    });



  })()




};


