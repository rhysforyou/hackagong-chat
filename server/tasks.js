var cron = new Cron(1000)

// Delete dead rooms
cron.addJob(10 * 60, function() { // 10 minutes
  var deadDate = new Date().getTime()  - (60 * 60 * 1000) // 1 hour
  var deadRooms = Rooms.find({lastUpdate: {$lt: deadDate}})

  console.log(new Date() + "Deleting " + deadRooms.count() + " dead rooms")

  deadRooms.forEach(function(room) {
    Meteor.call('closeRoom', room._id)
  })
})
