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
const viewProfile = document.querySelector(".user__profile-left > a");
const userInfoCompany = document.querySelector(".user__info-company");
const userInfoBlog = document.querySelector(".user__info-blog");
const userInfoLocation = document.querySelector(".user__info-location");
const userInfoSince = document.querySelector(".user__info-since");
const latestReposList = document.querySelector(".latest-repos__list");

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
  this.url = apiUrlDataRequest(url);
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

      console.log(response.data);
      searchGitHubUserData(response.data);
    }
  }
});

function searchGitHubUserData({ items }) {
  if (items.length === 0) return noData();

  const user = new UserProfile(items[0]);

  console.log(user);
  avatar.src = user.avatar_url;
  user.repos.then((data) => (publicReposCount.innerHTML = data.length));
  user.gists.then((data) => (publicGistsCount.innerHTML = data.length));
  user.followers.then((data) => (followersCount.innerHTML = data.length));
  user.following.then((data) => (followingCount.innerHTML = data.length));
  user.url.then((data) => {
    userInfoCompany.innerHTML = data.company;
    userInfoBlog.innerHTML = data.blog;
    userInfoLocation.innerHTML = data.location;
    userInfoSince.innerHTML = data.created_at;
  });

  viewProfile.href = user.html_url;

  latestReposList.replaceChildren();

  user.repos.then((data) => {
    data.forEach((v) => {
      latestReposItemAppend(v);
    });
  });

  userProfile.classList.remove("none");
  latestRepos.classList.remove("none");
}
function latestReposItemAppend(data) {
  const latestReposItem = document.createElement("div");
  latestReposItem.className = "latest-repos__item";

  const link = document.createElement("a");
  link.href = data.html_url;
  link.innerHTML = data.name;

  const latestReposItemOtherInfo = document.createElement("div");
  latestReposItemOtherInfo.className = "latest-repos__item-other-info";

  const latestReposItemStars = document.createElement("div");
  latestReposItemStars.className = "latest-repos__item-stars";
  latestReposItemStars.innerHTML = data.stargazers_count;

  const latestReposItemWatchers = document.createElement("div");
  latestReposItemWatchers.className = "latest-repos__item-watchers";
  latestReposItemWatchers.innerHTML = data.watchers_count;

  const latestReposItemForks = document.createElement("div");
  latestReposItemForks.className = "latest-repos__item-forks";
  latestReposItemForks.innerHTML = data.forks_count;

  latestReposItem.appendChild(link);
  latestReposItem.appendChild(link);
  latestReposItemOtherInfo.appendChild(latestReposItemStars);
  latestReposItemOtherInfo.appendChild(latestReposItemWatchers);
  latestReposItemOtherInfo.appendChild(latestReposItemForks);
  latestReposItem.appendChild(latestReposItemOtherInfo);

  latestReposList.appendChild(latestReposItem);
}
function noData() {
  console.log("no data");
  userProfile.classList.add("none");
  latestRepos.classList.add("none");
}
