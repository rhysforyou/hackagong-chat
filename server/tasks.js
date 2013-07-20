var cron = new Cron(1000)

// Delete dead rooms
cron.addJob(10 * 60, function() { // 10 minutes
  var deadDate = new Date().getTime() - (1000 * 60 * 60) // 1 hour
  var deadRooms = Rooms.find({lastUpdated: {$lt: deadDate}})

  console.log("Deleting " + deadRooms.count() + " dead rooms")

  deadRooms.forEach(function(room) {
    Meteor.users.remove({roomId: room._id, anonymous: true})
    Messages.remove({roomId: room._id})
  })

  Rooms.remove({lastUpdated: {$lt: deadDate}})
})
