const express = require("express");
const router = express.Router();
const axios = require("axios");

// all get request route
router.get("/*", requestHandler);

// all post request route
router.post("/*", requestHandler);


const requestHandler = async (req,res) => {
  const pathSuffix = req.originalUrl.replace("/api", ""),
        targetURL = process.env.TARGET_BASE_URL + pathSuffix;
        
  console.log("target: ", targetURL);

  const targetResponse = await axios.get(targetURL);

  res.status(targetResponse.status).json(targetResponse.data);
}

module.exports = router;
