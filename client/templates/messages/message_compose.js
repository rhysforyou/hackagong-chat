Template.messageCompose.events({
  'submit form#new-message': function(event) {
    event.preventDefault()

    var body = $(event.target).find("textarea").val()
    var message = {
      body: body,
      roomId: Session.get("currentRoomId")
    }

    Meteor.call('message', message, function(error, response) {
      if (!error)
        $("html, body").animate({ scrollTop: $(document).height() }, "slow");
    })

    $(event.target).find("textarea").val('')
  }
})