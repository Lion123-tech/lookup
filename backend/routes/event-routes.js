const router = require("express").Router();
const Event = require("../models/event-model");
const requireLogin = require("../middleware/requireLogin");

router.post("/addevent", requireLogin, (req, res) => {
  const newEntry = new Event({
    name: req.body.name,
    type: req.body.type,
    place: req.body.place,
    description: req.body.description,
    detailed_description: req.body.detailed_description,
    status: req.body.status,
    logo: req.body.logo,
    image: req.body.image,
    createdBy: req.user.loginuser._id,
    participantGroupings: req.body.participantGroupings,
    prizes: req.body.prizes,
    structures: req.body.structures,
    to: req.body.to,
    from: req.body.from,
  });
  newEntry
    .save()
    .then((msg) => res.json(msg))
    .catch((err) => console.log("error from add event server", err));
});

router.get("/allevent", (req, res) => {
  Event.find().then((result) => res.send(result));
});

router.put('/addParticipants', requireLogin, (req, res) => {
  Event.findByIdAndUpdate(req.body.eventid, {
    $addToSet: { participants: req.user.loginuser._id }
  }, {
    new: true
  }, (error, result) => {
    if (error) {
      let errMsg;
      if (error.code == 11000) {
        errMsg = Object.keys(error.keyValue)[0] + " already exists.";
      } else {
        errMsg = error.message;
      }
      return res.status(400).json({ statusText: "Bad Request", message: errMsg });
    }
    return res.json(result)
  })
})

module.exports = router;
