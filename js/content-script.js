chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let username = null;
  let password = null;
  let usernameFilled = false;
  let passwordFilled = false;

  if(typeof(request.password) !== 'undefined') password = request.password;
  if(typeof(request.username) !== 'undefined') username = request.username;

  let inputs = document.getElementsByTagName("input");
  for(let i = 0; i < inputs.length; i++){
    let type = inputs[i].type.toLowerCase();

    if(password !== null && type === "password" && !passwordFilled) {
      inputs[i].value = password;
      passwordFilled = true;
      continue;
    }
    
    if(username !== null && !usernameFilled && (type === "email" || type === "text")){
      inputs[i].value = username;
      usernameFilled = true;
      continue;
    }
  }
});