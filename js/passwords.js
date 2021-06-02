document.getElementById("passwords-link").innerText = lang[localStorage.lang]["passwords"];
document.getElementById("import-export-link").innerText = lang[localStorage.lang]["import_export"];
document.getElementById("theme-link").innerText = lang[localStorage.lang]["theme"];
document.getElementById("signout-link").innerText = lang[localStorage.lang]["signout"];

document.getElementById("passwords-link-mobile").innerText = lang[localStorage.lang]["passwords"];
document.getElementById("import-export-link-mobile").innerText = lang[localStorage.lang]["import_export"];
document.getElementById("theme-link-mobile").innerText = lang[localStorage.lang]["theme"];
document.getElementById("signout-link-mobile").innerText = lang[localStorage.lang]["signout"];

switch(localStorage.lang){
    case "sl":
        document.getElementById("lang-link").innerText = "Slovenian";
        document.getElementById("lang-link-mobile").innerText = "Slovenian";
    break;
    default:
        document.getElementById("lang-link").innerText = "English";
        document.getElementById("lang-link-mobile").innerText = "English";
    break;
}

document.getElementById("search").placeholder = lang[localStorage.lang]["search"];
document.getElementById("add-password-btn").innerText = lang[localStorage.lang]["add_password"];

document.getElementById("delete-account-title").innerText = lang[localStorage.lang]["delete_account"];
document.getElementById("delete-account-text").innerText = lang[localStorage.lang]["delete_account_info"];
document.getElementById("delete-account-btn").innerText = lang[localStorage.lang]["delete_account"];

document.getElementById("dialog-button-cancel").innerText = lang[localStorage.lang]["cancel"];

function displayPasswords(){
    let html_passwords = "";

    if(localStorage.passwords !== null && typeof(localStorage.passwords) !== 'undefined'){
        const passwords = JSON.parse(localStorage.passwords);
        for(let i = 0; i < passwords.length; i++){
            html_passwords += "<tr class='passwordsBorderColor'><td class='px-8 py-4 whitespace-nowrap'><div class='flex items-center'><div class='flex-shrink-0 h-10 w-10'>";
            //Icon
            html_passwords += "<img class='h-10 w-10 rounded-full' src='https://www.google.com/s2/favicons?domain=" + passwords[i].website + "' alt=''>";
            html_passwords += "</div><div class='ml-4'><div class='tertiaryColor text-sm font-medium'>";
            //Url
            html_passwords += passwords[i].website;
            html_passwords += "</div><div class='secondaryColor text-sm'>";
            //Username
            html_passwords += passwords[i].username;
            html_passwords += "</div></div></div></td><td class='px-1 py-4 whitespace-nowrap'>";
            //Copy username
            html_passwords += "<a id='copy-username-" + passwords[i].id + "' href='#'>";
            html_passwords += "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='#2c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='12' cy='7' r='4' /><path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' /></svg></a></td><td class='px-1 py-4 whitespace-nowrap'>";
            //Copy password
            html_passwords += "<a id='copy-password-" + passwords[i].id + "' href='#'>";
            html_passwords += "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='#2c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='8' cy='15' r='4' /><line x1='10.85' y1='12.15' x2='19' y2='4' /><line x1='18' y1='5' x2='20' y2='7' /><line x1='15' y1='8' x2='17' y2='10' /></svg></a></td><td class='px-1 py-4 whitespace-nowrap'>";
            //Edit Password
            html_passwords += "<a id='edit-password-" + passwords[i].id + "' href='#'>";
            html_passwords += "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='#2c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3' /><path d='M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3' /><line x1='16' y1='5' x2='19' y2='8' /></svg></a></td><td class='px-1 py-4 whitespace-nowrap'>";
            //Delete Password
            html_passwords += "<a id='delete-password-" + passwords[i].id + "' href='#'>";
            html_passwords += "<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='#2c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M19 19h-11l-4 -4a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9 9' /><line x1='18' y1='12.3' x2='11.7' y2='6' /></svg></a></td></tr>";
        }

        document.getElementById("table-data").innerHTML = html_passwords;

        for(let i = 0; i < passwords.length; i++){

            const decrypted_password = CryptoJS.AES.decrypt(passwords[i].password, localStorage.password).toString(CryptoJS.enc.Utf8);
            const data = passwords[i].id + " " + passwords[i].website + " " + passwords[i].username + " " + decrypted_password;

            document.getElementById("copy-username-" + passwords[i].id).addEventListener("click", () => {
                copyToClipboard(passwords[i].username);
            });

            document.getElementById("copy-password-" + passwords[i].id).addEventListener("click", () => {
                copyToClipboard(decrypted_password);
            });

            document.getElementById("edit-password-" + passwords[i].id).addEventListener("click", () => {
                changeDialog(4,data);
                show('dialog');
            });

            document.getElementById("delete-password-" + passwords[i].id).addEventListener("click", () => {
                changeDialog(6, passwords[i].id);
                show('dialog');
            });
        }
    }
}

displayPasswords();

try{
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        if(tabs[0].url !== null && typeof(tabs[0].url) !== 'undefined'){
            document.getElementById("search").value = new URL(tabs[0].url).hostname.replace("www.", "");
            filterPasswords();
        }
    });
}catch{}

document.getElementById("search").addEventListener("keyup", () => {
    filterPasswords();
});

document.getElementById("dialog-button-cancel").addEventListener("click", () => {
    hide('dialog');
});

document.getElementById("delete-account-btn").addEventListener("click", () => {
    changeDialog(1);
    show('dialog');
});

document.getElementById("signout-link-mobile").addEventListener("click", () => {
    logout();
});

document.getElementById("theme-link").addEventListener("click", () => {
    changeTheme();
});

document.getElementById("theme-link-mobile").addEventListener("click", () => {
    changeTheme();
});

document.getElementById("lang-link").addEventListener("click", () => {
    changeLanguage();
});

document.getElementById("lang-link-mobile").addEventListener("click", () => {
    changeLanguage();
});

document.getElementById("main-menu-toggle-btn").addEventListener("click", () => {
    toggleMenu();
});

document.getElementById("add-password-btn").addEventListener("click", () => {
    changeDialog(0);
    show('dialog');
});

document.getElementById("signout-link").addEventListener("click", () => {
    logout();
});

function updateGeneratedPassword(upper, number, special){
    let password = "";
    let length = document.getElementById('btn-length').value;
    let lowers = "abcdefghijklmnopqrstuvwxyz";
    let uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numbers = "1234567890";
    let specials = "!@#$%?&*";

    for (let i = 0; i < length; i++) password += lowers.charAt(randRange(0, lowers.length));

    password = password.split("");

    if(upper){
        let upper_amount = Math.floor(length / 2 - Math.random() * (length / 2) + 1);
        for(let i = 0; i < upper_amount; i++){
            password[randRange(0, password.length)] = uppers.charAt(randRange(0, uppers.length));
        }
    }

    if(number){
        let number_amount = Math.floor(length / 2 - Math.random() * (length / 2) + 1);
        for(let i = 0; i < number_amount; i++){
            password[randRange(0, password.length)] = numbers.charAt(randRange(0, numbers.length));
        }
    }

    if(special){
        let special_amount = randRange(1, 3);
        for(let i = 0; i < special_amount; i++){
            password[randRange(0, password.length)] = specials.charAt(randRange(0, specials.length));
        }
    }

    password = password.join("");

    document.getElementById('generated-password').innerText = password;
}

function changeDialog(style, text){
    switch(style){
        case 1:
            //Delete account dialog
            document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' /></svg>";
    
            document.getElementById('dialog-title').innerText = lang[localStorage.lang]["delete_account"];
            document.getElementById('dialog-text').innerText = lang[localStorage.lang]["delete_account_confirmation"];
    
            document.getElementById('dialog-button').className = "dangerButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
            document.getElementById('dialog-button').innerText = lang[localStorage.lang]["delete"];
            document.getElementById('dialog-button').onclick = () => deleteAccount();
        break;
        case 2:
            //Add password error
            document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' /></svg>";
    
            document.getElementById('dialog-title').innerText = lang[localStorage.lang]["error"];
            document.getElementById('dialog-text').innerText = text;
    
            document.getElementById('dialog-button').className = "dangerButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
            document.getElementById('dialog-button').innerText = lang[localStorage.lang]["try_again"];
            document.getElementById('dialog-button').onclick = () => changeDialog(0);
        break;
        case 3:
            //Password added successfully
            document.getElementById('dialog-icon').className = "mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-green-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 13l4 4L19 7' /></svg>";
    
            document.getElementById('dialog-title').innerText = lang[localStorage.lang]["success"];

            let message = lang[localStorage.lang]["add_password_success"];
            switch(text){
                case 1: 
                    message = lang[localStorage.lang]["change_password_success"];
                break;
                case 2:
                    message = lang[localStorage.lang]["remove_password_success"];
                break;
            }
            document.getElementById('dialog-text').innerText = message;
    
            document.getElementById('dialog-button-cancel').style.display = 'none';

            document.getElementById('dialog-button').className = "successButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
            document.getElementById('dialog-button').innerText = lang[localStorage.lang]["okay"];
            document.getElementById('dialog-button').onclick = () => refreshPasswords();
        break;
        case 4:
            //Edit password dialog
            const e_data = text.split(" ");

            document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='8' cy='15' r='4' /><line x1='10.85' y1='12.15' x2='19' y2='4' /><line x1='18' y1='5' x2='20' y2='7' /><line x1='15' y1='8' x2='17' y2='10' /></svg>";

            document.getElementById('dialog-title').innerText = lang[localStorage.lang]["edit_password"];

            document.getElementById('dialog-text').innerHTML = "<div class='rounded-md shadow-sm -space-y-px'><div><label for='website' class='sr-only'>Website</label><input id='website' name='website' type='text' autocomplete='website' value='" + e_data[1] + "' required class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='" + lang[localStorage.lang]["website"] + "'></div><div><label for='username' class='sr-only'>Username</label><input id='username' name='username' type='text' autocomplete='username' value='" + e_data[2] + "' required class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='" + lang[localStorage.lang]["username"] + "'></div>   <div><div class='flex rounded-md shadow-sm'><div class='relative flex items-stretch flex-grow focus-within:z-10'><input id='password' name='password' type='password' autocomplete='current-password' value='" + e_data[3] + "' required class='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-bl-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm' placeholder='" + lang[localStorage.lang]["password"] + "'></div><button id='btn-password-generator' class='secondaryColor tertiaryBackgroundColor primaryBorderColor -ml-px relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-br-mdfocus:outline-none'><svg xmlns='http://www.w3.org/2000/svg' class='primaryStrokeColor' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' stroke='#2c3e50' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><rect x='3' y='3' width='6' height='6' rx='1' /><rect x='15' y='15' width='6' height='6' rx='1' /><path d='M21 11v-3a2 2 0 0 0 -2 -2h-6l3 3m0 -6l-3 3' /><path d='M3 13v3a2 2 0 0 0 2 2h6l-3 -3m0 6l3 -3' /></svg></button></div></div>";

            document.getElementById('dialog-button').className = "primaryButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
            document.getElementById('dialog-button').innerText = lang[localStorage.lang]["change"];
            document.getElementById('dialog-button').onclick = () => editPassword(e_data[0]);

            document.getElementById('btn-password-generator').onclick = () => changeDialog(5, text);
        break;
        case 5:
            //Password Generator dialog
            const pg_data = text.split(" ");

            let btn_upper_enabled = true;
            let btn_numbers_enabled = true;
            let btn_special_enabled = true;

            document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><rect x='3' y='3' width='6' height='6' rx='1' /><rect x='15' y='15' width='6' height='6' rx='1' /><path d='M21 11v-3a2 2 0 0 0 -2 -2h-6l3 3m0 -6l-3 3' /><path d='M3 13v3a2 2 0 0 0 2 2h6l-3 -3m0 6l3 -3' /></svg>";

            document.getElementById('dialog-title').innerText = lang[localStorage.lang]["password_generator"];

            document.getElementById('dialog-text').innerHTML = "<div class='flex items-center justify-between'><span class='flex-grow flex flex-col'><span class='tertiaryColor text-sm font-medium'>A-Z</span></span><button type='button' id='btn-upper' class='flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none' role='switch' aria-checked='false'><span aria-hidden='true' class='secondaryBackgroundColor pointer-events-none absolute w-full h-full rounded-md'></span><span id='btn-upper-color' aria-hidden='true' class='primaryBackgroundColor pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'></span><span id='btn-upper-animation' aria-hidden='true' class='secondaryBackgroundColor translate-x-0 pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full shadow transform ring-0 transition-transform ease-in-out duration-200'></span></button></div><div class='flex items-center justify-between'><span class='flex-grow flex flex-col'><span class='tertiaryColor text-sm font-medium'>0-9</span></span><button type='button' id='btn-numbers' class='flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none' role='switch' aria-checked='false'><span aria-hidden='true' class='secondaryBackgroundColor pointer-events-none absolute w-full h-full rounded-md'></span><span id='btn-numbers-color' aria-hidden='true' class='primaryBackgroundColor pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'></span><span id='btn-numbers-animation' aria-hidden='true' class='secondaryBackgroundColor translate-x-0 pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full shadow transform ring-0 transition-transform ease-in-out duration-200'></span></button></div><div class='flex items-center justify-between'><span class='flex-grow flex flex-col'><span class='tertiaryColor text-sm font-medium'>!@#$%?&*</span></span><button type='button' id='btn-special' class='flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none' role='switch' aria-checked='false'><span aria-hidden='true' class='secondaryBackgroundColor pointer-events-none absolute w-full h-full rounded-md'></span><span id='btn-special-color' aria-hidden='true' class='primaryBackgroundColor pointer-events-none absolute h-4 w-9 mx-auto rounded-full transition-colors ease-in-out duration-200'></span><span id='btn-special-animation' aria-hidden='true' class='secondaryBackgroundColor translate-x-0 pointer-events-none absolute left-0 inline-block h-5 w-5 border border-gray-200 rounded-full shadow transform ring-0 transition-transform ease-in-out duration-200'></span></button></div><div class='flex items-center justify-between'><span class='flex-grow flex flex-col'><span class='tertiaryColor text-sm font-medium'>" + lang[localStorage.lang]["length"] + "</span></span><input type='range' id='btn-length' min='8' max='30' value='10' class='primaryBackgroundColor flex-shrink-0 group relative rounded-full inline-flex items-center justify-center h-5 w-10 cursor-pointer focus:outline-none'></div><div class='flex items-center justify-between'><span class='secondaryColor flex-grow flex flex-col' id='generated-password'></span></div>";

            document.getElementById('dialog-button').className = "primaryButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";

            updateGeneratedPassword(btn_upper_enabled, btn_numbers_enabled, btn_special_enabled);

            document.getElementById('btn-upper').onclick = () => {
                btn_upper_enabled = !btn_upper_enabled;
                animateButton('btn-upper', btn_upper_enabled);
                updateGeneratedPassword(btn_upper_enabled, btn_numbers_enabled, btn_special_enabled);
            }
            document.getElementById('btn-numbers').onclick = () =>{
                btn_numbers_enabled = !btn_numbers_enabled;
                animateButton('btn-numbers', btn_numbers_enabled);
                updateGeneratedPassword(btn_upper_enabled, btn_numbers_enabled, btn_special_enabled);
            }
            document.getElementById('btn-special').onclick = () => {
                btn_special_enabled = !btn_special_enabled;
                animateButton('btn-special', btn_special_enabled);
                updateGeneratedPassword(btn_upper_enabled, btn_numbers_enabled, btn_special_enabled);
            }
            document.getElementById('btn-length').onchange = () => {
                updateGeneratedPassword(btn_upper_enabled, btn_numbers_enabled, btn_special_enabled);
            }

            if(pg_data[0] == null){
                document.getElementById('dialog-button').innerText = lang[localStorage.lang]["copy"];
                document.getElementById('dialog-button').onclick = () => copyToClipboard(document.getElementById('generated-password').innerText);
            }else if(pg_data[0] == "-1"){
                document.getElementById('dialog-button').innerText = lang[localStorage.lang]["use"];
                document.getElementById('dialog-button').onclick = () => {
                    text = pg_data[0] + " " + pg_data[1] + " " + pg_data[2] + " " + document.getElementById('generated-password').innerText;
                    changeDialog(0, text);
                }
            }else{
                document.getElementById('dialog-button').innerText = lang[localStorage.lang]["use"];
                document.getElementById('dialog-button').onclick = () => {
                    text = pg_data[0] + " " + pg_data[1] + " " + pg_data[2] + " " + document.getElementById('generated-password').innerText;
                    changeDialog(4, text);
                }
            }

            animateButton('btn-upper', btn_upper_enabled);
            animateButton('btn-numbers', btn_numbers_enabled);
            animateButton('btn-special', btn_special_enabled);
        break;
        case 6:
            //Delete password dialog
            document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-red-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'><path stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' /></svg>";
    
            document.getElementById('dialog-title').innerText = lang[localStorage.lang]["delete_password"];
            document.getElementById('dialog-text').innerText = lang[localStorage.lang]["delete_password_confirmation"];
    
            document.getElementById('dialog-button').className = "dangerButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
            document.getElementById('dialog-button').innerText = lang[localStorage.lang]["delete"];
            document.getElementById('dialog-button').onclick = () => deletePassword(text);
        break;
        default:
            //Add password dialog
            document.getElementById('dialog-icon').className = "mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10";
            document.getElementById('dialog-icon').innerHTML = "<svg class='h-6 w-6 text-blue-600' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' aria-hidden='true'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><circle cx='8' cy='15' r='4' /><line x1='10.85' y1='12.15' x2='19' y2='4' /><line x1='18' y1='5' x2='20' y2='7' /><line x1='15' y1='8' x2='17' y2='10' /></svg>";

            document.getElementById('dialog-title').innerText = lang[localStorage.lang]["add_password"];

            document.getElementById('dialog-text').innerHTML = "<div class='rounded-md shadow-sm -space-y-px'><div><label for='website' class='sr-only'>Website</label><input id='website' name='website' type='text' autocomplete='website' required class='appearance-none rounded-none relative block w-full px-3 py-2 border rounded-t-md focus:outline-none focus:z-10 sm:text-sm' placeholder='" + lang[localStorage.lang]["website"] + "'></div><div><label for='username' class='sr-only'>Username</label><input id='username' name='username' type='text' autocomplete='username' required class='appearance-none rounded-none relative block w-full px-3 py-2 border focus:outline-none sm:text-sm' placeholder='" + lang[localStorage.lang]["username"] + "'></div><div><div class='flex rounded-md shadow-sm'><div class='relative flex items-stretch flex-grow focus-within:z-10'><input id='password' name='password' type='password' autocomplete='current-password' required class='appearance-none rounded-none relative block w-full px-3 py-2 border rounded-bl-md focus:outline-none sm:text-sm' placeholder='" + lang[localStorage.lang]["password"] + "'></div><button id='btn-password-generator' class='secondaryColor tertiaryBackgroundColor primaryBorderColor -ml-px relative inline-flex items-center space-x-2 px-4 py-2 border text-sm font-medium rounded-br-md focus:outline-none'><svg xmlns='http://www.w3.org/2000/svg' class='primaryStrokeColor' width='24' height='24' viewBox='0 0 24 24' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'><path stroke='none' d='M0 0h24v24H0z' fill='none'/><rect x='3' y='3' width='6' height='6' rx='1' /><rect x='15' y='15' width='6' height='6' rx='1' /><path d='M21 11v-3a2 2 0 0 0 -2 -2h-6l3 3m0 -6l-3 3' /><path d='M3 13v3a2 2 0 0 0 2 2h6l-3 -3m0 6l3 -3' /></svg></button></div></div>";

            document.getElementById('dialog-button').className = "primaryButton inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium focus:outline-none sm:w-auto sm:text-sm";
            document.getElementById('dialog-button').innerText = lang[localStorage.lang]["add"];
            document.getElementById('dialog-button').onclick = () => addPassword();

            if(text != null){
                const data = text.split(" ");
                document.getElementById("website").value = data[1];
                document.getElementById("username").value = data[2];
                document.getElementById("password").value = data[3];
            }else{
                try{
                    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
                        if(tabs[0].url !== null && typeof(tabs[0].url) !== 'undefined'){
                            document.getElementById("website").value = new URL(tabs[0].url).hostname.replace("www.", "");
                        }
                    });
                }catch{}
            }

            document.getElementById('btn-password-generator').onclick = () => changeDialog(5, "-1" + " " + document.getElementById("website").value + " " + document.getElementById("username").value + " " + document.getElementById("password").value);
        break;
    }
}

function addPassword(){
    check_login();

    const website = document.getElementById("website").value;
    const username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(website.length == 0 || username.length == 0 || password.length == 0) return;

    if(!(username.length >= 3 && username.length <= 255) || username.includes(" ")){
        changeDialog(2, lang[localStorage.lang]["username_validation"]);
        return;
    }

    if(username.includes("'") || username.includes('"') || username.includes("\\")){
        changeDialog(2, lang[localStorage.lang]["username_validation2"]);
        return;
    }

    if(!(password.length >= 8 && password.length <= 255) || password.includes(" ")){
        changeDialog(2, lang[localStorage.lang]["password_validation"]);
        return;
    }

    if(password.includes("'") || password.includes('"') || password.includes("\\")){
        changeDialog(2, lang[localStorage.lang]["password_validation2"]);
        return;
    }

    if(!(website.length >= 5 && website.length <= 255) || website.includes(" ")){
        changeDialog(2, lang[localStorage.lang]["website_validation"]);
        return;
    }

    if(website.includes("'") || website.includes('"') || website.includes("\\")){
        changeDialog(2, lang[localStorage.lang]["website_validation2"]);
        return;
    }

    password = CryptoJS.AES.encrypt(password, localStorage.password).toString();
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", localStorage.url + "/?action=savePassword");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(localStorage.username + ":" + sha512(localStorage.password)));
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if(xhr.status != 200){
                changeDialog(2, lang[localStorage.lang]["server_unreachable"]);
                return;
            }

            const json = JSON.parse(xhr.responseText);

            if(typeof json['error'] === 'undefined'){
                changeDialog(2, lang[localStorage.lang]["server_unreachable"]);
                return;
            }

            if(json['error'] != 0){
                changeDialog(2, errors[localStorage.lang][json['error']]);
                return;
            }

            changeDialog(3, 0);
        }

    };
    xhr.send("website=" + website + "&username=" + username + "&password=" + encodeURIComponent(password));
}

function editPassword(password_id){
    check_login();

    const website = document.getElementById("website").value;
    const username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(password_id.length == 0 || website.length == 0 || username.length == 0 || password.length == 0) return;

    if(!(username.length >= 3 && username.length <= 255) || username.includes(" ")){
        changeDialog(2, lang[localStorage.lang]["username_validation"]);
        return;
    }

    if(username.includes("'") || username.includes('"') || username.includes("\\")){
        changeDialog(2, lang[localStorage.lang]["username_validation2"]);
        return;
    }

    if(!(password.length >= 8 && password.length <= 255) || password.includes(" ")){
        changeDialog(2, lang[localStorage.lang]["password_validation"]);
        return;
    }

    if(password.includes("'") || password.includes('"') || password.includes("\\")){
        changeDialog(2, lang[localStorage.lang]["password_validation2"]);
        return;
    }

    if(!(website.length >= 5 && website.length <= 255) || website.includes(" ")){
        changeDialog(2, lang[localStorage.lang]["website_validation"]);
        return;
    }

    if(website.includes("'") || website.includes('"') || website.includes("\\")){
        changeDialog(2, lang[localStorage.lang]["website_validation2"]);
        return;
    }

    password = CryptoJS.AES.encrypt(password, localStorage.password).toString();
    
    var xhr = new XMLHttpRequest();
    xhr.open("POST", localStorage.url + "/?action=editPassword");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(localStorage.username + ":" + sha512(localStorage.password)));
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if(xhr.status != 200){
                changeDialog(2, lang[localStorage.lang]["server_unreachable"]);
                return;
            }

            const json = JSON.parse(xhr.responseText);

            if(typeof json['error'] === 'undefined'){
                changeDialog(2, lang[localStorage.lang]["server_unreachable"]);
                return;
            }

            if(json['error'] != 0){
                changeDialog(2, errors[localStorage.lang][json['error']]);
                return;
            }

            changeDialog(3, 1);
        }

    };
    xhr.send("password_id=" + password_id + "&website=" + website + "&username=" + username + "&password=" + encodeURIComponent(password));
}

function deletePassword(password_id){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", localStorage.url + "/?action=deletePassword");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(localStorage.username + ":" + sha512(localStorage.password)));
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if(xhr.status != 200){
                changeDialog(2, lang[localStorage.lang]["server_unreachable"]);
                return;
            }
            
            const json = JSON.parse(xhr.responseText);

            if(typeof json['error'] === 'undefined'){
                changeDialog(2, lang[localStorage.lang]["server_unreachable"]);
                return;
            }

            if(json['error'] != 0){
                changeDialog(2, errors[localStorage.lang][json['error']]);
                return;
            }
  
            changeDialog(3, 2);
        }

    };
    xhr.send("password_id=" + password_id);
}

function deleteAccount(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", localStorage.url + "/?action=deleteAccount");

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Authorization", "Basic " + btoa(localStorage.username + ":" + sha512(localStorage.password)));
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {

        if(xhr.readyState === 4){
            if(xhr.status != 200) return;
            
            const json = JSON.parse(xhr.responseText);

            if(typeof json['error'] === 'undefined') return;
            if(json['error'] != 0) return;
            
            logout();
        }

    };
    xhr.send("");
}

function filterPasswords(){
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("table-passwords");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
}