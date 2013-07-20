Rooms = new Meteor.Collection("Rooms")

Meteor.methods({
  room: function() {
    var room = { "email" : "" }

    room._id = Rooms.insert(room)

    return room._id
  },

  closeRoom: function(roomId) {
    Meteor.users.remove({roomId: roomId, anonymous: true})
    Messages.remove({roomId: roomId})
    Rooms.remove(roomId)
  }
})
