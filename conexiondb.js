const mongoose = require('mongoose');
const express = require('express');
const { mongo_url } = require('./config');   


    mongoose.connect(mongo_url,{ useNewUrlParser: true, useUnifiedTopology: true},)
    .then(()  => console.log('Connected to database mongodb'))
    .catch(e  => console.log('error connect to database',e))   
