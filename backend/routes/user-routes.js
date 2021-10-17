const router = require('express').Router();
const User = require("../models/user-model");
const requireLogin = require('../middleware/requireLogin')

router.post("/adduser", (req, res) => {
  const newEntry = new User({
    name: req.body.name,
    city: req.body.city,
    email: req.body.email,
    gender: req.body.gender
  });

  newEntry.save()
    .then(msg => res.json(msg))
    .catch(err => console.log('error from add user server', err))
});

router.get('/logout', function(req, res){
  req.logout();
  // redirecting to localhost for testing purposes
  res.redirect('http://localhost:3000'); //Can fire before session is destroyed?
});

router.get('/getuser', requireLogin, (req, res) => {
  console.log("gettting user", req.user);
  res.send(req.user);
})

router.get('/getalluser', (req, res) => {
  User.find({},{username:1,about:1,"education.school":1,pic:1})
  .then((result)=> {
    res.json(result)
  } ) 
  .catch((err)=> {
    console.log(err)
    res.status(401).json({error: err})
  })
})

router.get('/getuserbyid/:pid', (req, res) => {
  const pid = req.params.pid
  User.findOne({_id:pid})
  .then((result)=> {
    res.json(result)
  } ) 
  .catch((err)=> {
    console.log(err)
    res.status(401).json({error: err})
  })
})

//*************************** */
//USER APIS
//***************************** */
router.put('/editusername', requireLogin, (req, res) => {
  User.findByIdAndUpdate(req.user.loginuser._id, {
    $set: { username:  req.body.username }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      console.log("error from add username", err)
      return res.status(422).json({ error: err })
    }
    return res.json(result)
  })
})

router.put('/editabout', requireLogin, (req, res) => {
  User.findByIdAndUpdate(req.user.loginuser._id, {
    $set: { about:  req.body.about }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      console.log("error from add about", err)
      return res.status(422).json({ error: err })
    }
    return res.json(result)
  })
})

router.put('/edituser', requireLogin, (req, res) => {
  var education = {
    grade: req.body.grade,
    address: req.body.address,
    school: req.body.school,
    previouspercentage: req.body.previouspercentage,
  }
  User.findByIdAndUpdate(req.user.loginuser._id, {
    $set: {
      about:  req.body.about,
      username: req.body.username,
      education: education
    }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      console.log("error from edituser", err)
      return res.status(422).json({ error: err })
    }
    return res.json(result)
  })
})

//*************************** */
//EDUCATION APIS
//***************************** */

router.put('/editeducation', requireLogin, (req, res) => {
  var newproject = {
    grade: req.body.grade,
    address: req.body.address,
    school: req.body.school,
    previouspercentage: req.body.previouspercentage,
  }
  User.findByIdAndUpdate(req.user.loginuser._id, {
    $set: { education: newproject }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      console.log("error from add project", err)
      return res.status(422).json({ error: err })
    }
    return res.json(result)
  })
})

router.put('/addachievement', requireLogin, (req, res) => {
  // console.log("follow check", req.user.loginuser._id)
  var newAchivement = {
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    location: req.body.location,
    image: req.body.image,
  }
  User.findByIdAndUpdate(req.user.loginuser._id, {
    $push: { achievements: newAchivement }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      console.log("error from add achievenment", err)
      return res.status(422).json({ error: err })
    }
    return res.json(result)
  })
})

//*************************** */
//PROJECTS APIS
//***************************** */

router.put('/addprojects', requireLogin, (req, res) => {
  var newproject = {
    title: req.body.title,
    description: req.body.description,
    year: req.body.year
  }
  User.findByIdAndUpdate(req.user.loginuser._id, {
    $push: { projects: newproject }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      console.log("error from add project", err)
      return res.status(422).json({ error: err })
    }
    return res.json(result)
  })
})

router.put('/deleteprojects/:pid', requireLogin, (req, res) => {
  const pid = req.params.pid
  console.log("pidvvvvv", pid)
  User.findByIdAndUpdate(req.user.loginuser._id, {
    $pull: { projects: {_id:pid} }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      console.log(err) 
      return res.status(422).json({ error: err })
    }
    return res.json(result)
  })  
})

router.put('/editprojects/:pid', requireLogin, async (req, res) => {
  const pid = req.params.pid
  User.updateOne({
    _id: req.user.loginuser._id,
    projects: {
      $elemMatch: {
        _id: pid
      }
    }
  }, {
    $set: {
      'projects.$.title': req.body.title,
      'projects.$.year': req.body.year,
      'projects.$.description': req.body.description,
    }
  }).then(result => res.json(result))
})

//*************************** */
//AWARDS APIS
//***************************** */

router.put('/addawards', requireLogin, (req, res) => {
  var newproject = {
    title: req.body.title,
    description: req.body.description,
    year: req.body.year,

  }
  User.findByIdAndUpdate(req.user.loginuser._id, {
    $push: { awards: newproject }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      console.log("error from add awards", err)
      return res.status(422).json({ error: err })
    }
    return res.json(result)
  })
})

router.put('/deleteawards/:aid', requireLogin, (req, res) => {
  const aid = req.params.aid
  User.findByIdAndUpdate(req.user.loginuser._id, {
    $pull: { awards: {_id:aid} }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      console.log(err) 
      return res.status(422).json({ error: err })
    }
    return res.json(result)
  })  
})

router.put('/editawards/:aid', requireLogin, async (req, res) => {
  const aid = req.params.aid
  User.updateOne({
    _id: req.user.loginuser._id,
    awards: {
      $elemMatch: {
        _id: aid
      }
    }
  }, {
    $set: {
      'awards.$.title': req.body.title,
      'awards.$.year': req.body.year,
      'awards.$.description': req.body.description,
    }
  }).then(result => res.json(result))
})

//*************************** */
//INTERNSHIPS APIS
//***************************** */

router.put('/addinternships', requireLogin, (req, res) => {
  var newproject = {
    title: req.body.title,
    description: req.body.description,
    year: req.body.year,
  }
  User.findByIdAndUpdate(req.user.loginuser._id, {
    $push: { internships: newproject }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      console.log("error from add awards", err)
      return res.status(422).json({ error: err })
    }
    return res.json(result)
  })
})

router.put('/deleteinternships/:aid', requireLogin, (req, res) => {
  const aid = req.params.aid
  User.findByIdAndUpdate(req.user.loginuser._id, {
    $pull: { internships: {_id:aid} }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      console.log(err) 
      return res.status(422).json({ error: err })
    }
    return res.json(result)
  })  
})

router.put('/editinternships/:aid', requireLogin, async (req, res) => {
  const aid = req.params.aid
  User.updateOne({
    _id: req.user.loginuser._id,
    internships: {
      $elemMatch: {
        _id: aid
      }
    }
  }, {
    $set: {
      'internships.$.title': req.body.title,
      'internships.$.year': req.body.year,
      'internships.$.description': req.body.description,
    }
  }).then(result => res.json(result))
})

//*************************** */
//SCHOLARSHIPS APIS
//***************************** */
router.put('/addscholarships', requireLogin, (req, res) => {
  var newproject = {
    title: req.body.title,
    description: req.body.description,
    year: req.body.year,

  }
  User.findByIdAndUpdate(req.user.loginuser._id, {
    $push: { scholarships: newproject }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      console.log("error from add scholarships", err)
      return res.status(422).json({ error: err })
    }
    return res.json(result)
  })
})

router.put('/deletescholarships/:aid', requireLogin, (req, res) => {
  const aid = req.params.aid
  User.findByIdAndUpdate(req.user.loginuser._id, {
    $pull: { scholarships: {_id:aid} }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      console.log(err) 
      return res.status(422).json({ error: err })
    }
    return res.json(result)
  })  
})

router.put('/editscholarships/:aid', requireLogin, async (req, res) => {
  const aid = req.params.aid
  User.updateOne({
    _id: req.user.loginuser._id,
    scholarships: {
      $elemMatch: {
        _id: aid
      }
    }
  }, {
    $set: {
      'scholarships.$.title': req.body.title,
      'scholarships.$.year': req.body.year,
      'scholarships.$.description': req.body.description,
    }
  }).then(result => res.json(result))
})

//*************************** */
//OTHERS APIS
//***************************** */
router.put('/addothers', requireLogin, (req, res) => {
  var newproject = {
    title: req.body.title,
    description: req.body.description,
    year: req.body.year,
  }
  User.findByIdAndUpdate(req.user.loginuser._id, {
    $push: { others: newproject }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      console.log("error from add others", err)
      return res.status(422).json({ error: err })
    }
    return res.json(result)
  })
})

router.put('/deleteothers/:aid', requireLogin, (req, res) => {
  const aid = req.params.aid
  User.findByIdAndUpdate(req.user.loginuser._id, {
    $pull: { others: {_id:aid} }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      console.log(err) 
      return res.status(422).json({ error: err })
    }
    return res.json(result)
  })  
})

router.put('/editothers/:aid', requireLogin, async (req, res) => {
  const aid = req.params.aid
  User.updateOne({
    _id: req.user.loginuser._id,
    others: {
      $elemMatch: {
        _id: aid
      }
    }
  }, {
    $set: {
      'others.$.title': req.body.title,
      'others.$.year': req.body.year,
      'others.$.description': req.body.description,
    }
  }).then(result => res.json(result))
})
//*************************** */
//SKILLS APIS
//***************************** */

router.put('/addskill', requireLogin, (req, res) => {
  // console.log("follow check", req.user.loginuser._id)

  User.findByIdAndUpdate(req.user.loginuser._id, {
    $push: { skills: req.body.skill }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      return res.status(422).json({ error: err })
    }
    return res.json(result)
  })
})

router.put('/deleteskill', requireLogin, (req, res) => {
  // console.log("follow check", req.user.loginuser._id)

  User.findByIdAndUpdate(req.user.loginuser._id, {
    $pull: { skills: req.body.skill }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      return res.status(422).json({ error: err })
    }
    return res.json(result)
  })
})

//*************************** */
//CONNECTIONS APIS --> FOLLOW, PENDINGS, UNFOLLOW
//***************************** */

router.put('/follow', requireLogin, (req, res) => {
  // console.log("follow check", req.user.loginuser._id)
  User.findByIdAndUpdate(req.body.followId, {
    $push: { pendings: req.user.loginuser._id 
    }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      return res.status(422).json({ error: err })
    }
    User.findByIdAndUpdate(req.user.loginuser._id, {
      $push: { requestsent: req.body.followId }
    }, { new: true }).then(result => {
      res.json(result)
    }).catch(err => {
      return res.status(422).json({ error: err })
    })
    return res.json(result)
  })
})

router.put('/acceptRequest', requireLogin, (req, res) => {
  User.findByIdAndUpdate(req.user.loginuser._id, {
    $pull: { pendings: req.body.followId }
    , $push: { connections : req.body.followId }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      return res.status(422).json({ error: err })
    }
    User.findByIdAndUpdate(req.body.followId, {
    $pull: { requestsent: req.user.loginuser._id },
      $push: { connections: req.user.loginuser._id }
    }, { new: true }).then(result => {
      res.json(result)
    }).catch(err => {
      return res.status(422).json({ error: err })
    })
    return res.json(result)
  })
})

router.put('/unfollow', requireLogin, (req, res) => {
  User.findByIdAndUpdate(req.body.followId, {
    $pull: { followers: req.user.loginuser._id }
  }, {
    new: true
  }, (err, result) => {
    if (err) {
      return res.status(422).json({ error: err })
    }
    User.findByIdAndUpdate(req.user.loginuser._id, {
      $pull: { followings: req.body.followId }
    }, { new: true }).then(result => {
      res.json(result)
    }).catch(err => {
      return res.status(422).json({ error: err })
    })
  })
})






router.get('/getfollowings', requireLogin, (req, res) => {
  User.
    findOne({ _id: req.user.loginuser._id }). // id pass ki hai testing ke lie baad me req.user.loginuser._id kr lena yaad se
    populate('followings', 'username'). // only return the Persons name
    exec(function (err, result) {
      if (err) return res.status(422).json({ error: err });

      console.log('The get following result is', result.followings);
      res.json(result.followings)
    });
})


router.get('/getfollowers', requireLogin, (req, res) => {
  User.
    findOne({ _id: req.user.loginuser._id }). // id pass ki hai testing ke lie baad me req.user.loginuser._id kr lena yaad se
    populate('followers', 'username'). // only return the Persons name
    exec(function (err, result) {
      if (err) return res.status(422).json({ error: err });

      console.log('The get following result is', result.followings);
      res.json(result.followers)
    });
})


module.exports = router;