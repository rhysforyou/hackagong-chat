Rooms = new Meteor.Collection("Rooms")

Meteor.methods({
  room: function() {
    var room = { "email" : "" }

    room._id = Rooms.insert(room)

    return room._id
  }
})
