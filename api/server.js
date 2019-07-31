const express = require('express');
const helmet = require('helmet');

const lambdaRouter = require('../lambda/lambda-router.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/zoos', lambdaRouter);

module.exports = server;
