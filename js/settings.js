if(!isSessionValid()) window.location.href = 'index.html';

document.getElementById("passwords-link").innerText = lang[localStorage.lang]["passwords"];
document.getElementById("import-export-link").innerText = lang[localStorage.lang]["import_export"];
document.getElementById("signout-link").innerText = lang[localStorage.lang]["signout"];

document.getElementById("passwords-link-mobile").innerText = lang[localStorage.lang]["passwords"];
document.getElementById("import-export-link-mobile").innerText = lang[localStorage.lang]["import_export"];
document.getElementById("signout-link-mobile").innerText = lang[localStorage.lang]["signout"];

document.getElementById("dialog-button-cancel").innerText = lang[localStorage.lang]["cancel"];

document.getElementById("settings-lang").value = localStorage.lang;
document.getElementById("settings-theme").value = localStorage.theme;
document.getElementById("settings-session").value = localStorage.sessionDuration;

document.getElementById("settings-lang").addEventListener("change", () => {
    localStorage.lang = document.getElementById("settings-lang").value;
    location.reload();
});

document.getElementById("settings-theme").addEventListener("change", () => {
    localStorage.theme = document.getElementById("settings-theme").value;
    document.getElementById("css-theme").href = "css/themes/" + localStorage.theme + ".css";
});

document.getElementById("settings-session").addEventListener("change", () => {
    localStorage.sessionDuration = document.getElementById("settings-session").value;
    location.reload();
});

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