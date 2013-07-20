Template.showRoom.helpers({
  currentRoom: function() {
    return Rooms.find(Session.get('currentRoomId'))
  },
  messages: function() {
    return Messages.find({roomId: Session.get('currentRoomId')})
  }
})

Template.showRoom.events({
  'submit form#anon-user': function(event) {
    event.preventDefault()
    var nickname = $(event.target).find("#name").val()

    Meteor.call('anonymousUser', nickname, Session.get('currentRoomId'), function(error, response) {
      Meteor.loginWithPassword(response.username, response.password, function(error) { console.log(error) })
    })
  }
})
