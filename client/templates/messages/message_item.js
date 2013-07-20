Template.messageItem.helpers({
  ownClass: function() {
    if (this.userId === Meteor.userId()) {
      return 'current-user'
    } else {
      return ''
    }
  }
})

Template.messageItem.rendered = function() {
  var instance = this
  
}