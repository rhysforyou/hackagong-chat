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
      if (fields.submitted > now && fields.userId !== Meteor.userId()) {
        var notification = window.webkitNotifications.createNotification('', fields.author, fields.body)
        notification.show()
      }

      // When a new message arrives and we're already scrolled to the bottom, scroll
      // so the new message is visible
      if (fields.submitted > now
        && $('html body').scrollTop() + $(window).height() + 10 > $('html body').height()) {
        setTimeout(function() {
          $("html body").scrollTop($(document).height() - $(window).height())
        }, 50)
      }
    }
  })
}

Template.showRoom.destroyed = function() {
  this.messageObserver.stop()
}

Template.showRoom.rendered = function() {
  // Check if we have permission to show notifications, otherwise request it
  if (window.webkitNotifications.checkPermission() !== 0) {
    window.webkitNotifications.requestPermission()
  }
}
