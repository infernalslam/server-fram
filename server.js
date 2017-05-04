var express = require('express')
var app = express()
var cors = require('cors')
var firebase = require('firebase')
var moment = require('moment')
app.use(cors())

// Part of Server
var config = {
  apiKey: 'AIzaSyAoUCPIlsbYjweTZ3bnxw0U0etcmPgPAbQ',
  authDomain: 'smartfarm-1f904.firebaseapp.com',
  databaseURL: 'https://smartfarm-1f904.firebaseio.com',
  projectId: 'smartfarm-1f904',
  storageBucket: 'smartfarm-1f904.appspot.com',
  messagingSenderId: '767977730072'
}

firebase.initializeApp(config)
var db = firebase.database().ref('data')
var feed = firebase.database().ref('feed')

app.set('port', (process.env.PORT || 4000))

app.post('/api/data', function (req, res) {
  let data = {
    temp: req.query.temp,
    hum: req.query.hum,
    date: moment().format('L') + ' ' + moment().format('LTS')
  }
  console.log(data)
  db.push(data)
  res.send(data)
})

app.post('/api/feed', function (req, res) {
  let data = {
    cm: req.query.cm,
    date: moment().format('L') + ' ' + moment().format('LTS')
  }
  feed.push(data)
  res.send(data)
})

app.listen(app.get('port'), function () {
  console.log('run at port', app.get('port'))
})
