
var usersarray = [];
if (localStorage.getItem("users") != null) {
    usersarray = JSON.parse(localStorage.getItem("users"));
}

function login() {

    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    let spanEmail = document.getElementById("spanEmail");
    let spanPass = document.getElementById("spanPass");

    spanEmail.innerHTML = "";
    spanPass.innerHTML = "";

    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let user = usersarray.find(user => user.email === email);

    if (!emailRegex.test(email) || !user) {
        spanEmail.innerHTML = `<h6>Email is not valid or does not exist.</h6>`;
        return;
    }

    if (password.length < 10 || user.password !== password) {
        spanPass.innerHTML = `<h6>Password is incorrect.</h6>`;
        return;
    }

    localStorage.setItem("loggedInUser", user.id);
    alert("Login successful!");

    localStorage.removeItem("cart");
    window.location.href = "index.html";
}
