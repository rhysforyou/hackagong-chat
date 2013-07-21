Template.home.events({
  'click #create-room': function(event) {
    event.preventDefault()
    Meteor.call('room', function(error, roomId) {
      Meteor.Router.to('showRoom', roomId)
    })
  }
})

Template.home.created = function() {
  
}
