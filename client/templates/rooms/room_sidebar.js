Template.roomSidebar.helpers({
  currentNickname: function() {
    return Meteor.user().profile.nickname
  }
})

Template.roomSidebar.events({
  'submit form#change-nickname': function(event) {
    event.preventDefault()

    var newName = $(event.target).find('#nickname').val()
    var profile = Meteor.user().profile
    var oldName = profile.nickname

    profile.nickname = newName

    Meteor.users.update(Meteor.userId(), {$set: {profile: profile}})
    Messages.find({userId: Meteor.userId()}).forEach(function(message) {
      var changes = {author: newName}

      if (message.previousAuthor === oldName)
        changes.previousAuthor = newName

      Messages.update(message._id, {$set: changes})
    })
  },

  'click #close-room': function(event) {
    event.preventDefault()

    Meteor.call('closeRoom', Session.get("currentRoomId"), function(error) {
      if (!error)
        Meteor.Router.to('home')
    })
  }
})