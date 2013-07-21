Rooms = new Meteor.Collection("Rooms")

Meteor.methods({
  room: function() {
    var room = { "opened": new Date().getTime() }

    room._id = Rooms.insert(room)

    return room._id
  },

  closeRoom: function(roomId) {
    var room = Rooms.findOne(roomId)

    if (Meteor.isServer) {
      var admin = Meteor.users.findOne({"profile.roomId": roomId, "profile.admin": true})

      if (admin) {
        var transcript = "";
        Messages.find({roomId: roomId}, {order: {published: -1}}).forEach(function(message) {
          transcript = transcript + message.author + ": " + message.body + "\n"
        })

        var formatDate = function(date) {
          var day = date.getDate()
          var month = date.getMonth()

          return day + "/" + month
        }

        Email.send({
          to: admin.profile.email,
          from: "noreply@whispr.us",
          subject: "Whispr: Your chat on " + formatDate(new Date(room.opened)),
          text: transcript
        })
      }
    }

    Meteor.users.remove({"profile.roomId": roomId, "profile.anonymous": true})
    Messages.remove({roomId: roomId})
    Rooms.remove(roomId)
  }
})
