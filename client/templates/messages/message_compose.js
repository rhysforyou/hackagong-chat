Template.messageCompose.events({
  'submit form#new-message': function(event) {
    submitForm(event)
  },

  'keydown': function(event) {
    if (event.keyCode === 13 && !event.shiftKey) {
      submitForm(event)
    }
  }
})

function submitForm(event) {
  event.preventDefault()

  var body = $("form#new-message textarea").val()
  var message = {
    body: body,
    roomId: Session.get("currentRoomId")
  }

  Meteor.call('message', message)
  
  $("form#new-message textarea").val('')
}