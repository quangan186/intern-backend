const fetch = require('node-fetch')
const searchGithubUsers = async(req, res) => {
    const {q, page, per_page} = req.query;
    fetch(`https://api.github.com/search/users?q=${q}&page=${page}&per_page=${per_page}`,{
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then(result => {
        return res.send(result)
    }).catch(err => {
        console.log(err)
    })
}

const findGithubUserProfile = async(req, res) => {
    const {github_user_id} = req.query
    fetch(`https://api.github.com/user/${github_user_id}`,{
        method: "GET",
        headers:{
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).then(result => {
        return res.send(result)
    }).catch(err => {
        console.log(err)
    })
}

const likeGithubUser = async(req, res) => {

}

const getUserProfile = async(req, res) => {
    const {phone_number} = req.query
    
}

module.exports = {searchGithubUsers, findGithubUserProfile, likeGithubUser, getUserProfile}