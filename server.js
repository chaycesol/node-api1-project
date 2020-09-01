const express = require('express');

//importing shortid npm package to generate rando ids
const shortid = require('shortid');

//importing cors module
const cors = require('cors');

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
server.use(cors());

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
    try{res.status(200).json({ data: users })
    } catch {
        res.status(500).json({ errorMessage: "The users information could not be retrieved."})
    }
});

// get details of a specific user - /api/users/:id
server.get('/api/users/:id', (req, res) => {
    try{
        const id= req.params.id;

        let found = users.find(u => u.id === id);

        if(found){
            res.status(200).json(found);
        }else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    } catch{
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
    
})

/** POST USERS **/ 
// add a new user - /api/users 
server.post('/api/users/', (req,res) => {
    try{
        const user = req.body;
        if(user.name && user.bio) {
            user.id = shortid.generate();
            users.push(user);
            res.status(201).json(users);
        } else {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        }
    } catch{
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
})

/** PUT USERS **/
// edit an existing user - /api/users/:id
server.put('/api/users/:id', (req,res) => {
    try {
        const id = req.params.id;
        const changes = req.body;
    
        let found = users.find((user) => user.id === id);
    
        if (found) {
          if (changes.name || changes.bio) {
            Object.assign(found, changes);
            res.status(200).json(users);
          } else {
            res.status(400).json({
              message: `Please provide name and bio for the user.`,
            });
          }
        } else {
          res
            .status(404).json({ message: "The user with the specified ID does not exist." });
        }
      } catch {
        res.status(500).json({errorMessage: "The user information could not be modified."});
      }
    });

/** DELETE USERS **/
// remove an existing user -  /api/users/:id
server.delete('/api/users/:id', (req, res) => {
    try{
        const id = req.params.id;

        // all values coming from URL are strings
        users = users.filter(user => user.id !== id);

        if(users) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
        
        res.status(200).json(users);
    } catch{
        res.status(500).json({ errorMessage: "The user could not be removed"  })
    }
    
});



const port = 5000;
server.listen(port, () => console.log("afternoon project server is up..."));