
document.addEventListener('DOMContentLoaded', (event) => {
    let   user = JSON.parse(localStorage.user);
    document.querySelector('#username').textContent = `Hello ${user.name}`;
  
});
// function getData() {
//   const response = await fetch('https://ghibliapi.herokuapp.com/films')
//   const data = await response.json()
// data.forEach(movie => {
//   // Log each movie's title
//   console.log(movie.title)
// })
// }