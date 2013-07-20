Messages = new Meteor.Collection("messages")

Meteor.methods({
  message: function(messageAttributes) {
    var room = Rooms.findOne(messageAttributes.roomId)
    var user = Meteor.user()
    var previousMessage = Messages.findOne({roomId: room._id}, {sort: {submitted: -1}})

    if (!room)
      throw new Meteor.Error(404, "Room not found")
    if (!user)
      throw new Meteor.Error(401, "You must be logged in to post messages")

    message = _.extend(_.pick(messageAttributes, 'body', 'userId', 'roomId'), {
      submitted: new Date().getTime(),
      author: user.profile.nickname,
      userId: user._id
    })

    if (previousMessage) {
      message.previousAuthor = previousMessage.author
    }

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
