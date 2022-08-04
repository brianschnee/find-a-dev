const express = require('express')
const app = express()

require('dotenv').config()
const PORT = process.env.PORT || 5000
const DB_CONNECT = process.env.DB_CONNECT

const { MongoClient } = require('mongodb')
let db;

MongoClient.connect(DB_CONNECT, { useUnifiedTopology: true })
    .then(client => {
        console.log('connected to db')
        db = client.db('find-a-dev')
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', (req, res) => {
    db.collection('posts').find().toArray()
        .then(data => {
            console.log(data);
        })
        .catch(err => console.error(err))
});

app.post('/', (req, res) => {
    console.log(req.body)
})

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))