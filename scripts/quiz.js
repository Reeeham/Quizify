
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    let username = sessionStorage.getItem('user')['name'];
    console.log('username', username);
    document.querySelector('#username').textContent = username;
});
