const express = require("express");
const router = express.Router();
const axios = require("axios");
const asyncHandler = require("express-async-handler");

const requestHandler = asyncHandler(async (req,res, next) => {
  try {  
    let pathSuffix = req.originalUrl.replace("/api", ""),
        targetURL = process.env.TARGET_BASE_URL + pathSuffix;
 
    console.log("target:", req.method);

    const targetResponse = await axios({
      method: req.method,
      url: targetURL,
      data: req.body
    });

    res.status(targetResponse.status).json(targetResponse.data);
  } catch (error) {
    console.log(error.response.data)
    res.statusCode = error.response? error.response.status:null;
    error.innerTargetException = error.response? error.response.data:null;
    // throw new Error(error.message? error.message:error);
    next(error);
  }
});

// all get request route
router.get("/*", requestHandler);

// all post request route
router.post("/*", requestHandler);


module.exports = router;
