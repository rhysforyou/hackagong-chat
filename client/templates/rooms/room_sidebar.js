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

    profile.nickname = newName

    Meteor.users.update(Meteor.userId(), {$set: {profile: profile}})
  }
})