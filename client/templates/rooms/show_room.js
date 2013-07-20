Template.showRoom.helpers({
  currentRoom: function() {
    return Rooms.find(Session.get('currentRoomId'))
  },
  messages: function() {
    return Messages.find({roomId: Session.get('currentRoomId')})
  }
})

Template.showRoom.events({
  'submit form': function(event) {
    event.preventDefault()

    var body = $(event.target).find("textarea").val()
    var message = {
      body: body,
      roomId: Session.get("currentRoomId")
    }

    Meteor.call('message', message, function(error, response) {
      console.log(response)
    })

    $(event.target).find("textarea").val('')
  }
})
