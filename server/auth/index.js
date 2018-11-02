const router = require('express').Router()
const User = require('../db/models/user')
const nodemailer = require('nodemailer')
const crypto = require('crypto')
const EmailToken = require('../db/models/emailToken')
const Sequelize = require('sequelize')
module.exports = router

// defines URL for testing/production

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({where: {email: req.body.email}})
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.isEmailVerified) {
      console.log('Email is not verified for user: ', req.body.email)
      res.status(401).send('Email has not been verified yet')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

// creates a token and sends a link containing token to email address
router.post('/signup', async (req, res, next) => {
  let url =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:8080'
      : 'https://the-poke-shop.herokuapp.com'
  let user
  try {
    user = await User.create(req.body)
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
      return
    } else {
      next(err)
    }
  }
  try {
    const token = await EmailToken.create({
      userId: user.id,
      emailToken: crypto.randomBytes(16).toString('hex')
    })
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
      }
    })
    const mailOptions = {
      from: 'no-reply@the-poke-shop.herokuapp.com',
      to: user.email,
      subject: 'Account Verification Token',
      html: `<p>Hello, ${
        user.name
      }!</p><p>Please verify your account by clicking the link:</p><a href="${url}/auth/confirmation/${
        token.emailToken
      }">${url}/auth/confirmation/${
        token.emailToken
      }</a><p>This link will expire in twelve hours.</p>`
    }
    transporter.sendMail(mailOptions, err => {
      if (err) {
        res.status(500).send({msg: err.message})
      } else {
        res
        .status(200)
        .send('A verification email has been sent to ' + user.email + '.')
      }
    })
  } catch (err) {
    console.error(err);
    next(err)
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})

router.use('/google', require('./google'))

router.get('/confirmation/:token', async (req, res, next) => {
  try {
    const token = req.params.token
    const emailToken = await EmailToken.findOne({where: {emailToken: token}})
    if (emailToken === null) {
      res.status(400).send('Token not found.')
      return
    }

    const user = await User.findById(emailToken.userId)
    // token has already been checked
    if (emailToken.wasVerified) {
      res.status(400).send('Token already used')
      return
    }
    if (emailToken.wasVerified === false) {
      res.status(400).send('Token already expired.')
      return
    }
    if (!user) {
      res.status(400).send('Unable to find a user for this token')
      return
    }

    // token hasn't been checked yet
    const timeDiff = new Date() - emailToken.updatedAt
    if (timeDiff / 3600000 <= 12) {
      await Promise.all([
        user.update({isEmailVerified: true}),
        emailToken.update({wasVerified: true})
      ])
      req.login(user, err => (err ? next(err) : res.json(user)))
      return
    } else {
      await emailToken.update({wasVerified: false})
      res.status(400).send('Token expired.')
      return
    }
  } catch (err) {
    console.error(err)
    next(err)
  }
})

router.get('/resend/:userId', async (req, res, next) => {
  const userId = req.params.userId
  try {
    const user = await User.findById(userId)
    if (user === null) return res.status(400).send('User not found')
    if (user.isEmailVerified)
      return res.status(400).send('User already verified')

    const token = await EmailToken.create({
      userId: userId,
      emailToken: crypto.randomBytes(16).toString('hex')
    })
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
      }
    })

    const url =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:8080'
        : 'https://the-poke-shop.herokuapp.com'

    const mailOptions = {
      from: 'no-reply@the-poke-shop.herokuapp.com',
      to: user.email,
      subject: 'Account Verification Token',
      html: `<p>Hello, ${
        user.name
      }!</p><p>Please verify your account by clicking the link:</p><a href="${url}/auth/confirmation/${
        token.emailToken
      }">${url}/auth/confirmation/${
        token.emailToken
      }</a><p>This link will expire in twelve hours.</p>`
    }
    transporter.sendMail(mailOptions, err => {
      if (err) return res.status(500).send({msg: err.message})
      res
        .status(200)
        .send('A verification email has been sent to ' + user.email + '.')
    })
  } catch (err) {
    console.error(err)
    next(err);
  }
})
