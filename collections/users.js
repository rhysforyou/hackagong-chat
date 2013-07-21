// The collection is provided by Meteor.Account
Meteor.methods({
  anonymousUser: function(attributes) {
    if (!attributes.nickname)
      throw new Meteor.Error(400, "Needs a name")
    if (!attributes.roomId)
      throw new Meteor.Error(400, "Anonymous users must belong to a room")

    var username = attributes.roomId + "anon" + new Date().getTime()
    var password = username
    var userIndex = Meteor.users.find({"profile.roomId": attributes.roomId}).count()

    colors = [
      "#2ECC71",
      "#3498DB",
      "#9B59B6",
      "#34495E",
      "#F1C40F",
      "#E67E22"
    ]

    var user = {
      profile: {
        nickname: attributes.nickname,
        anonymous: true,
        roomId: attributes.roomId,
        color: colors[userIndex],
        email: attributes.email
      },
      username: username,
      password: password
    }

    if (userIndex === 0) {
      user.profile.admin = true
    }

    Accounts.createUser(user)

    return user
  }
})
