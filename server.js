const express = require('express');

//importing shortid npm package to generate rando ids
const shortid = require('shortid')

/* 
Ex. 
users.insert({
  _id: shortid.generate(),
  name: '...',
  email: '...'
});
*/

const server = express();

server.use(express.json());

/** USERS DATA OBJ**/
let users = [
    {
        id: shortid.generate(),
        name: "chayce",
        bio: "product manager turned full-stack dev",
    },
    {
        id: shortid.generate(),
        name: "brandon",
        bio: "his brother",
    },
    {
        id: shortid.generate(),
        name: "kymm",
        bio: "his mother",
    }
]

server.get('/', (req, res) => {
    res.status(200).json({ message: "You must specify a route path to get data" })
});

/** GET USERS **/
// get a list of all users - /api/users
server.get('/api/users', (req, res) => {
    res.status(200).json({ data: users })
});

// get details of a specific user - /api/users/:id
server.get('/api/users/:id', (req, res) => {
    const id= req.params.id;

    let found = users.find(u => u.id === id);

    if(found){
        res.status(200).json(found);
    }else {
        res.status(404).json({ message: 'user not found' })
    }
})

/** POST USERS **/ 
// add a new user - /api/users 
server.post('/api/users/', (req,res) => {
    const user = req.body;
    if(user.name && user.bio) {
        user.id = shortid.generate();
        users.push(user);
        res.status(201).json(users);
    } else {
        res.status(400).json({ message: 'Please add name and bio for each user'})
    }
})

/** PUT USERS **/
// edit an existing user - /api/users/:id
server.put('/api/users/:id', (req,res) => {
    const id = req.params.id;
    const changes = req.body;
    
    let found = users.find((user) => user.id === id);

    if(found) {
        if (changes.name || changes.bio) {
            Object.assign(found, changes)
            res.status(200).json(users);
        } else {
            res.status(400).json({message: 'User must have a name and bio.'})
        }
    } else {
        res.status(404).json({ message: 'User not found'})
    }
});

/** DELETE USERS **/
// remove an existing user -  /api/users/:id
server.delete('/api/users/:id', (req, res) => {
    
    const id = req.params.id;

    // all values coming from URL are strings
    users = users.filter(user => user.id !== id);

    // res.status(204).end();
    res.status(200).json(users);
});



const port = 5000;
server.listen(port, () => console.log("afternoon project server is up..."));