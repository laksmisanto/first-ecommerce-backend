const express = require("express");
const _ = express.Router();
const apiRouter = require("./api");

const api = process.env.BASE_URL;

_.use(api, apiRouter);
_.use(api, (req, res) => res.send("No Api Found On This Router"));

module.exports = _;
