Meteor.publish('singleRoom', function(roomId) {
  return roomId && Rooms.find({_id: roomId})
})

Meteor.publish('messages', function(roomId) {
  return roomId && Messages.find({roomId: roomId})
})

