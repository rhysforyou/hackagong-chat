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

      if (fields.submitted > now && fields.userId !== Meteor.userId()) {
        var notification = window.webkitNotifications.createNotification('', fields.author, fields.body)
        notification.show()
      }
    }
  })
}

Template.showRoom.destroyed = function() {
  this.messageObserver.stop()
}

Template.showRoom.rendered = function() {
  $("html, body").animate({ scrollTop: $(document).height() }, "slow")

  if (window.webkitNotifications.checkPermission() == 0) { // 0 is PERMISSION_ALLOWED
    // function defined in step 2
    window.webkitNotifications.createNotification(
        'icon.png', 'Notification Title', 'Notification content...');
  } else {
    window.webkitNotifications.requestPermission();
  }
}
