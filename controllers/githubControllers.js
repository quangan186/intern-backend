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
        "Authorization": "token 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",
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
  const { github_user_id } = req.query;
  fetch(`https://api.github.com/user/${github_user_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "token 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",
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
  const doc = await favoriteGithubUser.get()

  let favoriteList = []

  if (doc.data().users !== undefined){
    favoriteList = [...doc.data().users]
  }

  if (favoriteList.indexOf(github_user_id) > -1){
    favoriteList.splice(favoriteList.indexOf(github_user_id), 1)
  } else{
    favoriteList.push(github_user_id)
  }

  await favoriteGithubUser.set({ users: favoriteList });
  return res.status(200).json({msg: "Added successful"});
}

const getUserProfile = async (req, res) => {
  const { phone_number } = req.query;
  let favoriteList;
  console.log("+" + phone_number.trim())
  const favoriteGithubUser = database
    .collection("favoriteGithubUser")
    .doc("+" + phone_number.trim());
  const doc = await favoriteGithubUser.get()
  if (!doc.exists){
    console.log("No document found!")
  } else{
    if (doc.data().users !== undefined){
      favoriteList = [...doc.data().users]
    } else{
      favoriteList = []
    }
    res.json({favorite_github_users: favoriteList})
  }
};

module.exports = {
  searchGithubUsers,
  findGithubUserProfile,
  likeGithubUser,
  getUserProfile,

};
