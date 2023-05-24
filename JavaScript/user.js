function userAccount(){
var username = sessionStorage.getItem('username');
var pfp = sessionStorage.getItem('pfp');

    if (!username) {
      // Prompt the user to fill in their username
      var input = prompt('Please enter your username:');
      
      if (input) {
        sessionStorage.setItem('username', input);

        var pfpInput = prompt('Please enter a link to pfp:');
        if (pfpInput) {
            sessionStorage.setItem('pfp', pfpInput);
            location.reload()
        }
      }
    } else if (!pfp) {
        var pfpInput = prompt('Please enter a link to pfp:');
        if (pfpInput) {
            sessionStorage.setItem('pfp', pfpInput);
            location.reload()
        }
    } else if (username && pfp) {
// Create elements for the profile picture and username
    var pfpElement = document.createElement('img');
    pfpElement.className = 'pfp';
    pfpElement.src = pfp;
    
    var usernameElement = document.createElement('span');
    usernameElement.className = 'username';
    usernameElement.textContent = username;
    
    // Get the user-card element
    var userCardElement = document.querySelector('.user-card');
    
    // Append the elements to the user-card
    userCardElement.appendChild(pfpElement);
    userCardElement.appendChild(usernameElement);
    }
}

function logOut(){
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('pfp');
    location.reload()
}

document.getElementById('usercard').addEventListener('click', logOut)