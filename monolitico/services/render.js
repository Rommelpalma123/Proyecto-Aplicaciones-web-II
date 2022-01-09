const axios = require('axios');


const homeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('http://localhost:9000/api/users')
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        })

    
}

const add_user = (req, res) =>{
    res.render('add_user');
}

const update_user = (req, res) =>{
    axios.get('http://localhost:9000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

module.exports = { update_user, homeRoutes, add_user }