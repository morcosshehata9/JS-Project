var usersarray = [];


if (localStorage.getItem("users") != null) {
    usersarray = JSON.parse(localStorage.getItem("users"));
}

function validateName(name) {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(name);
}

function SignUp() {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirm-password").value;

    let spanName = document.getElementById("spanName");
    let spanEmail = document.getElementById("spanEmail");
    let spanPass = document.getElementById("spanPass");
    let spanConfirmPass = document.getElementById("spanConfirmPass");
    let accoutCreate = document.getElementById("accoutCreate");

    spanName.innerHTML = "";
    spanEmail.innerHTML = "";
    spanPass.innerHTML = "";
    spanConfirmPass.innerHTML = "";

    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (name.length == 0) {
        let h6 = document.createElement("h6");
        h6.innerHTML = "Name required";
        spanName.appendChild(h6);
    }
    else if (!emailRegex.test(email) || email.length == 0) {
        let h6 = document.createElement("h6");
        h6.innerHTML = "Email is not valid";
        spanEmail.appendChild(h6);
    }
    else if (usersarray.some(user => user.email === email)) {
        let h6 = document.createElement("h6");
        h6.innerHTML = "Email already exists";
        spanEmail.appendChild(h6);
    }
    else if (password.length < 10) {
        let h6 = document.createElement("h6");
        h6.innerHTML = "The password must be at least 10 characters long";
        spanPass.appendChild(h6);
    }
    else if (password != confirmPassword) {
        let h6 = document.createElement("h6");
        h6.innerHTML = "Passwords do not match";
        spanConfirmPass.appendChild(h6);
    }
    else {
        spanName.innerHTML = "";
        spanEmail.innerHTML = "";
        spanPass.innerHTML = "";
        spanConfirmPass.innerHTML = "";

        // Generate a unique ID for the user
        let id = usersarray.length > 0
            ? usersarray[usersarray.length - 1].id + 1
            : 1; // Default to 1 if the array is empty

        var user = {
            "id": id, // Assign the ID
            "name": name,
            "email": email,
            "password": password,
        };
        usersarray.push(user);
        storageUsers();
    }
}


function storageUsers() {
    localStorage.setItem("users", JSON.stringify(usersarray));

    document.getElementById("todeletejs").style = "display:none";


    var finalMessage = document.getElementById("h2")
    finalMessage.style.color = "green";
    finalMessage.innerHTML = `Your account has been created successfully! <br> You can now login Now`;
}
