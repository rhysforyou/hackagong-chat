// The collection is provided by Meteor.Account
Meteor.methods({
  anonymousUser: function(nickname, roomId) {
    if (!nickname)
      throw new Meteor.Error(400, "Needs a name")
    if (!roomId)
      throw new Meteor.Error(400, "Anonymous users must belong to a room")

    var username = roomId + "anon" + new Date().getTime()
    var password = username
    var colorIndex = Meteor.users.find({"profile.roomId": roomId}).count()

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
        nickname: nickname,
        anonymous: true,
        roomId: roomId,
        color: colors[colorIndex]
      },
      username: username,
      password: password
    }

    Accounts.createUser(user)

    return user
  }
})
