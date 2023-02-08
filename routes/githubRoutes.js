const express = require('express');
const router = express.Router();

const {searchGithubUsers, findGithubUserProfile, likeGithubUser, getUserProfile} = require("../controllers/githubControllers");

router.get("/users/search", searchGithubUsers);
router.get("/userProfile/search", findGithubUserProfile);
router.post("/like", likeGithubUser)
router.get("/user", getUserProfile)

module.exports = router;