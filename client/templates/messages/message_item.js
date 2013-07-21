Template.messageItem.helpers({
  ownClass: function() {
    if (this.userId === Meteor.userId()) {
      return 'current-user'
    } else {
      return ''
    }
  },

  // Still trying to think of a better name for this =[
  // Basically whether or not the last message's author is different to this message's
  initialMessage: function() {
    return this.author !== this.previousAuthor
  },

  avatarColor: function() {
    return Meteor.users.findOne(this.userId).profile.color
  }
})

