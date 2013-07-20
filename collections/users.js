// The collection is provided by Meteor.Account
Meteor.methods({
  anonymousUser: function(nickname, roomId) {
    if (!nickname)
      throw new Meteor.Error(400, "Needs a name")
    if (!roomId)
      throw new Meteor.Error(400, "Anonymous users must belong to a room")

    var username = roomId + "anon" + new Date().getTime()
    var password = username

    var user = {
      profile: {
        nickname: nickname,
        anonymous: true,
        roomId: roomId
      },
      username: username,
      password: password
    }

    Accounts.createUser(user)

    return user
  }
})
