const APIURL = 'https://api.github.com/users/'

const main = document.querySelector('.main');
const form = document.querySelector('.search-form');
const search = document.querySelector('.search-input');

getUser('florinpop17')

async function getUser(username) {
  const resp = await fetch(APIURL + username);
  const respData = await resp.json();

  createUserCard(respData);
  console.log(respData);
  getRepose(username);
}

async function getRepose(user) {
  const reps = await fetch(APIURL + user + '/repos');
  const respData = await reps.json();

  addReposeToCard(respData);
}

function createUserCard(user) {
  const cardHTML = `
  <div class="card">
      <div class="img-container">
        <img class="avatar" src="${(user.avatar_url) ? user.avatar_url : 'https://avatars.githubusercontent.com/u/9919?s=200&v=4'}" alt="${user.name}">
      </div>
      <div class="user-info" >
        <h2 class="user-info__name" >${user.name}</h2>
        <p class="user-info__bio" >${(user.bio) ? user.bio : ''}</p>

        <ul class="user-stat" >
          <li>${(user.followers) ? user.followers : 0}<strong>followers</strong></li> 
          <li>${(user.following) ? user.following : 0}<strong>following</strong></li> 
          <li>${(user.public_repos) ? user.public_repos : 0}<strong>repos</strong></li> 
        </ul>
        <div class="repos">
        </div>
      </div>
    </div>
  `;

  main.innerHTML = cardHTML;
}

function addReposeToCard(repos) {
  const reposEl = document.querySelector('.repos');
  repos.forEach(repo => {
    const repoEl = document.createElement('a');
    repoEl.classList.add('repos__link');

    repoEl.href = repo.html_url;
    repoEl.target = '_blank';
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  })
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = search.value;
  if (user) {
    getUser(user);
    search.value = '';
  }
})