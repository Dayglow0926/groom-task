import { Octokit, App } from "https://esm.sh/octokit";
import { githubAPIKey } from "./githubAPIKey.js";

// SOLID 적용, OOP 적용, 비동기 적용
// GitHub API 통신을 담당하는 클래스
class GitHubAPI {
  constructor() {
    this.octokit = new Octokit({ auth: githubAPIKey });
  }

  async searchUser(query) {
    const response = await this.octokit.request("GET /search/users", {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      q: query,
    });
    return response.data.items;
  }
}
//fetch data 관리 클래스
class UserDataManager {
  constructor(userProfile) {
    this.userProfile = userProfile;
  }

  async fetchAllData() {
    const [repos, url, followers, following, gists] = await Promise.all([
      this.userProfile.fetchURL(this.userProfile.repos),
      this.userProfile.fetchURL(this.userProfile.url),
      this.userProfile.fetchURL(this.userProfile.followers),
      this.userProfile.fetchURL(this.userProfile.following),
      this.userProfile.fetchURL(this.userProfile.gists),
    ]);

    return {
      repos,
      url,
      followers,
      following,
      gists,
    };
  }
}

// GitHub 사용자 프로필 정보를 관리하는 클래스
class UserProfile {
  constructor(userData) {
    this.data = userData;
  }
  //프로필 데이터에 대한 게터 메서드
  get avatarUrl() {
    return this.data.avatar_url;
  }
  get htmlUrl() {
    return this.data.html_url;
  }
  get url() {
    return this.data.url;
  }
  get repos() {
    return this.data.repos_url;
  }
  get gists() {
    return this.data.gists_url;
  }
  get followers() {
    return this.data.followers_url;
  }
  get following() {
    return this.data.following_url;
  }

  async fetchURL(url) {
    url = url.replace(/\{.*?\}/g, "");
    const data = fetch(url).then((response) => response.json());
    return data;
  }
}

class ContributionGraph {
  render(username) {
    //잔디받 그리기 로직
  }
}
class Spinner {
  show() {
    //스피너 표시
  }
  hide() {
    //스피너 숨기기
  }
}

class UIManager {
  constructor() {
    //UI 요소 초기화
    this.spinner = new Spinner();
    this.userProfile = document.querySelector(".user__profile");
    this.latestRepos = document.querySelector(".latest-repos");
    this.avatar = document.querySelector(".user__profile-img > img");
    this.publicReposCount = document.querySelector(".public-repos__count");
    this.publicGistsCount = document.querySelector(".public-gists__count");
    this.followersCount = document.querySelector(".followers__count");
    this.followingCount = document.querySelector(".following__count");
    this.viewProfile = document.querySelector(".user__profile-left > a");
    this.userInfoCompany = document.querySelector(".user__info-company");
    this.userInfoBlog = document.querySelector(".user__info-blog");
    this.userInfoLocation = document.querySelector(".user__info-location");
    this.userInfoSince = document.querySelector(".user__info-since");
    this.latestReposList = document.querySelector(".latest-repos__list");
  }
  displayHide() {
    this.userProfile.classList.add("none");
    this.latestRepos.classList.add("none");
  }
  displayShow() {
    this.userProfile.classList.remove("none");
    this.latestRepos.classList.remove("none");
  }
  updateUserProfile(userProfile, fetchData) {
    this.avatar.src = userProfile.avatarUrl;
    this.publicReposCount.innerHTML = fetchData.repos.length;
    this.publicGistsCount.innerHTML = fetchData.gists.length;
    this.followersCount.innerHTML = fetchData.followers.length;
    this.followingCount.innerHTML = fetchData.following.length;
    this.userInfoCompany.innerHTML = fetchData.url.company;
    this.userInfoBlog.innerHTML = fetchData.url.blog;
    this.userInfoLocation.innerHTML = fetchData.url.location;
    this.userInfoSince.innerHTML = fetchData.url.created_at;
    this.viewProfile.href = userProfile.htmlUrl;

    this.latestReposList.replaceChildren();

    fetchData.repos.forEach((v) => {
      this.latestReposItemAppend(v);
    });
  }

  latestReposItemAppend(data) {
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

    this.latestReposList.appendChild(latestReposItem);
  }

  isNullItem() {
    alert("검색된 유저가 없습니다.");
  }
}

const api = new GitHubAPI();
const uiManager = new UIManager();

document
  .querySelector(".search__form-input")
  .addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
      uiManager.displayHide();
      try {
        const users = await api.searchUser(event.target.value);

        if (users.length <= 0) return uiManager.isNullItem();

        console.log(users.length);

        const userProfile = new UserProfile(users[0]);
        const userDataManager = new UserDataManager(userProfile);

        userDataManager.fetchAllData().then((data) => {
          uiManager.updateUserProfile(userProfile, data);
          uiManager.displayShow();
        });
      } catch (error) {
        console.log("Error : ", error);
      } finally {
      }
    }
  });
