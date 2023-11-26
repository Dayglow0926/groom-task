import { Octokit, App } from "https://esm.sh/octokit";
// Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
  auth: "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",
});

const userProfile = document.querySelector(".user__profile");
const latestRepos = document.querySelector(".latest-repos");
const avatar = document.querySelector(".user__profile-img > img");
const publicReposCount = document.querySelector(".public-repos__count");
const publicGistsCount = document.querySelector(".public-gists__count");
const followersCount = document.querySelector(".followers__count");
const followingCount = document.querySelector(".following__count");

function apiUrlDataRequest(url) {
  // 중괄호가 포함된 부분을 URL에서 제거
  url = url.replace(/\{.*?\}/g, "");
  //   const data = await (await fetch(url)).json();
  const data = fetch(url).then((response) => response.json());
  return data;
}

function UserProfile({
  avatar_url,
  url,
  html_url,
  followers_url,
  following_url,
  gists_url,
  repos_url,
}) {
  this.avatar_url = avatar_url;
  this.url = url;
  this.html_url = html_url;
  this.followers = apiUrlDataRequest(followers_url);
  this.following = apiUrlDataRequest(following_url);
  this.gists = apiUrlDataRequest(gists_url);
  this.repos = apiUrlDataRequest(repos_url);
}

const searchInput = document.querySelector(".search__form-input");

searchInput.addEventListener("keypress", async (event) => {
  if (event.key === "Enter") {
    if (event.target.value != "") {
      const response = await octokit.request("GET /search/users", {
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
        q: event.target.value,
      });

      searchGitHubUserData(response.data);
    }
  }
});

function searchGitHubUserData({ items }) {
  if (items.length === 0) return noData();

  const user = new UserProfile(items[0]);

  console.log(user);
  avatar.src = user.avatar_url;
  user.repos.then(
    (data) => (publicReposCount.innerHTML = `Public repos: ${data.length}`)
  );
  user.gists.then(
    (data) => (publicGistsCount.innerHTML = `Public Gists: ${data.length}`)
  );
  user.followers.then(
    (data) => (followersCount.innerHTML = `Followers: ${data.length}`)
  );
  user.following.then(
    (data) => (followingCount.innerHTML = `Following: ${data.length}`)
  );

  userProfile.classList.remove("none");
  latestRepos.classList.remove("none");
}

function noData() {
  console.log("no data");
  userProfile.classList.add("none");
  latestRepos.classList.add("none");
}
