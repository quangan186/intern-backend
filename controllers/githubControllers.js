const fetch = require("node-fetch");
const { database } = require("../firebaseConfig");

const searchGithubUsers = async (req, res) => {
  const { q, page, per_page } = req.query;
  await fetch(
    `https://api.github.com/search/users?q=${q}&page=${page}&per_page=${per_page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((result) => {
      res.json({ users: result.items });
    })
    .catch((err) => {
      console.log(err);
    });
};

const findGithubUserProfile = async (req, res) => {
  const { github_user_id } = req.body;
  fetch(`https://api.github.com/user/${github_user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((result) => {
      res.json({
        login: result.login,
        id: result.id,
        avatar_url: result.avatar_url,
        html_url: result.html_url,
        public_repos: result.repos_url,
        followers: result.followers_url,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const likeGithubUser = async (req, res) => {
  const { phone_number, github_user_id } = req.body;
  const favoriteGithubUser = database
    .collection("favoriteGithubUser")
    .doc(phone_number);

  const doc = await favoriteGithubUser.get();

  let favoriteList = [...doc.data().users];

  fetch(`https://api.github.com/user/${github_user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(async (result) => {
      favoriteList.push({
        login: result.login,
        id: result.id,
        avatar_url: result.avatar_url,
        html_url: result.html_url,
        public_repos: result.repos_url,
        followers: result.followers_url,
      });
      await favoriteGithubUser.set({ users: favoriteList });
      return res.status(200).json({ users: favoriteList });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getUserProfile = async (req, res) => {
  const { phone_number } = req.query;
};

module.exports = {
  searchGithubUsers,
  findGithubUserProfile,
  likeGithubUser,
  getUserProfile,
};
