if(!isSessionValid()) window.location.href = 'index.html';

document.getElementById("passwords-link").innerText = lang[localStorage.lang]["passwords"];
document.getElementById("import-export-link").innerText = lang[localStorage.lang]["import_export"];
document.getElementById("signout-link").innerText = lang[localStorage.lang]["signout"];

document.getElementById("passwords-link-mobile").innerText = lang[localStorage.lang]["passwords"];
document.getElementById("import-export-link-mobile").innerText = lang[localStorage.lang]["import_export"];
document.getElementById("signout-link-mobile").innerText = lang[localStorage.lang]["signout"];

document.getElementById("dialog-button-cancel").innerText = lang[localStorage.lang]["cancel"];

document.getElementById("signout-link").addEventListener("click", () => {
    logout();
});

document.getElementById("signout-link-mobile").addEventListener("click", () => {
    logout();
});

document.getElementById("main-menu-toggle-btn").addEventListener("click", () => {
    toggleMenu();
});

document.getElementById("dialog-button-cancel").addEventListener("click", () => {
    hide('dialog');
});