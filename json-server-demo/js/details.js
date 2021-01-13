// javascript for details.html
const id = new URLSearchParams(window.location.search).get('id');
const likeCount = new URLSearchParams(window.location.search).get('likes');
const container = document.querySelector('.details');
const deleteBtn = document.querySelector('.delete');
const likeBtn = document.querySelector('.likes');

let num = parseInt(likeCount);

//let likes = [localStorage.getItem("likedArticles")];

const renderDetails = async () => {
  const res = await fetch('http://localhost:3000/posts/' + id);
  if (!res.ok) {
    window.location.replace("/");
  }
  const post = await res.json();

  const template = `
    <h1>${post.title}</h1>    
    <p><small>${post.likes} likes</small></p>
    <p>${post.body}</p>
    <p> Like Count is ${num}</p>
    <p> Like Count is ${likes.indexOf(id)}</p>
  `

  container.innerHTML = template;
}

likeBtn.addEventListener('click', async () => {
  num+=1;
  const res = await fetch('http://localhost:3000/posts/' + id, {
    method: "PATCH", 
      body: JSON.stringify({
        likes: num 
      }),
      headers: { 'Content-Type': 'application/json' }
  });  
  window.location.replace("/");
})

deleteBtn.addEventListener('click', async () => {
  const res = await fetch('http://localhost:3000/posts/' + id, {
    method: 'DELETE'
  });
  window.location.replace("/");
});








window.addEventListener('DOMContentLoaded', renderDetails);