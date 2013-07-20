Meteor.Router.add({
  '/': {to: 'home'},
  '/:_id': {
    to: 'showRoom',
    and: function(id) { Session.set('currentRoomId', id) }
  }
})