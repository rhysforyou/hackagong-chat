Deps.autorun(function() {
  Meteor.subscribe('singleRoom', Session.get("currentRoomId"))
  Meteor.subscribe('messages', Session.get("currentRoomId"))
  Meteor.subscribe('roomUsers', Session.get("currentRoomId"))
})