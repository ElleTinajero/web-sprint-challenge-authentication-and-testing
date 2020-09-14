const router = require('express').Router();
const jwt = require('jsonwebtoken')
const bcrypt = require("bcryptjs")
const db = require('../jokes/joke-model');
const Users = require('../jokes/joke-model');
const authenticate = require('./authenticate-middleware');
require("dotenv").config();

router.get("/users", authenticate(), async (req, res, next) => {
	try {
		res.json(await Users.find())
	} catch(err) {
		next(err)
	}
})

router.post('/register', async (req, res, next) => {
  try {
    const {username, password} = req.body
    const User = await db.findBy({username})

      if(User) {
        return res.statusCode(409).json({
          err: "Username is already taken"
      })}

    const newUser = await db.add({
      username, password: await bcrypt.hash(password, 14)
    })

    if(newUser) {
      return res.status(201).json({
        message: "The user has been created."
    })}
  }

  catch(err) {
    next(err)
  }

});

router.post('/login', async (req, res) => {
  try {
    const {username, password} = req.body
    const user = await db.findBy(username)

    if(!user) {
      return res.status(401).json({
        message: "Invalid credentials."
      })
    }

    const authenticated = await bcrypt.compare(password, user.password)

    if(!authenticated) {
      return res.status(401).json({
        message: "Invalid credentials"
      })
    }
    const payload = {
      userId: user.id,
      username: username,
    }

    res.cookie('token', jwt.sign(payload, process.env.JWT_SECRET))
    res.json({
      message: `WELCOME ${username}!!!!!!!!!!!`
    })
  }

  catch(err) {
    next(err)
  }
});

router.get("/logout", async (req, res, next) => {
	try {
		req.session.destroy((err) => {
			if (err) {
				next(err)
			} else {
				res.status(204).end()
			}
		})
	} catch (err) {
		next(err)
	}
})

module.exports = router;
