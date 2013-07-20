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

Template.showRoom.created = function() {
  var now = new Date().getTime()

  this.messageObserver = Messages.find({roomId: Session.get('currentRoomId')}).observeChanges({
    added: function(id, fields) {
      if (fields.submitted > now) {
        $("html, body").animate({ scrollTop: $(document).height() }, "slow")
      }
    }
  })
}

Template.showRoom.destroyed = function() {
  this.messageObserver.stop()
}

Template.showRoom.rendered = function() {
  $("html, body").animate({ scrollTop: $(document).height() }, "slow")
}
