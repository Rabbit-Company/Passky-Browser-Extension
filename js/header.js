if(localStorage.theme == null || typeof(localStorage.theme) == 'undefined') localStorage.theme = 0;
if(localStorage.lang == null || typeof(localStorage.lang) == 'undefined') localStorage.lang = "en";

if(localStorage.theme == 0){
    document.getElementById("css-theme").href = "css/themes/dark.css";
}else{
    document.getElementById("css-theme").href = "css/themes/light.css";
}

if(!(localStorage.lang == "en" || localStorage.lang == "sl")) localStorage.lang = "en";