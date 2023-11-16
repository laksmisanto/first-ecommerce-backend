const express = require("express");
const router = express.Router();
const apiRouter = require("./api");

const api = process.env.BASE_URL;

router.use(api, apiRouter);
router.use(api, (req, res) => res.send("No Api Found On This Router"));

module.exports = router;
