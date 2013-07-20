Messages = new Meteor.Collection("messages")

Meteor.methods({
  message: function(messageAttributes) {
    var room = Rooms.find(messageAttributes.roomId)
    var user = Meteor.user()

    if (!room)
      throw new Meteor.Error(404, "Room not found")
    if (!user)
      throw new Meteor.Error(401, "You must be logged in to post messages")

    message = _.extend(_.pick(messageAttributes, 'body', 'userId', 'roomId'), {
      submitted: new Date().getTime(),
      author: user.profile.nickname,
      userId: user._id
    })

    message._id = Messages.insert(message)

    Rooms.update(
      { _id: messageAttributes.roomId },
      { $set: {
        lastUpdate: new Date().getTime()
      }
    })

    return message._id
  }
})
