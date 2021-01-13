// javascript for index.html
const container = document.querySelector('.blogs');
const searchForm = document.querySelector('.search');

/*localStorage.clear;
window.onload = function () {
  if (localStorage.getItem("hasCodeRunBefore") === null) {
    let likedArticles = [0,0,0,0];
    localStorage.setItem("likedArticles", JSON.stringify(likedArticles));
      localStorage.setItem("hasCodeRunBefore", true);
  }
}*/


const renderPosts = async (term) => {
  console.log(term);
  let uri = 'http://localhost:3000/posts?_sort=likes&_order=desc';
  if (term) {
    uri += `&q=${term}`
  }

  const res = await fetch(uri);
  const posts = await res.json();
  console.log(posts);

  let template = '';
  posts.forEach(post => {
    template += `
      <div class="post">
        <h2>${post.title}</h2>
        <p><small>${post.likes} likes</small></p>
        <p>${post.body.slice(0, 200)}...</p>
        <a href="/details.html?id=${post.id}&likes=${post.likes}">Read more</a>
      </div>
      `
  });

  container.innerHTML = template;
}

// search
searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  renderPosts(searchForm.term.value.trim());
})

window.addEventListener('DOMContentLoaded', () => renderPosts());

//enter into the terminal json-server --watch data/db.json