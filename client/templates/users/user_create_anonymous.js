Template.userCreateAnonymous.helpers({
  noUsers: function() {
    return Meteor.users.find({"profile.roomId": Session.get("currentRoomId")}).count() === 0
  }
})

Template.userCreateAnonymous.events({
  'submit form#anon-user': function(event) {
    event.preventDefault()
    var nickname = $(event.target).find("#name").val()
    var email    = $(event.target).find("#email").val()

    var userAttributes = {
      nickname: nickname,
      roomId: Session.get('currentRoomId'),
      email: email
    }

    Meteor.call('anonymousUser', userAttributes, function(error, response) {
      Meteor.loginWithPassword(response.username, response.password, function(error) { console.log(error) })
    })
  }
})