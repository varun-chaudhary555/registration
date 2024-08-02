const hamBurger = document.querySelector(".toggle-btn");

hamBurger.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("expand");
});


document.addEventListener("DOMContentLoaded", () => {
    const editBtn = document.getElementById("edit-btn");
    const saveBtn = document.getElementById("save-btn");
    const cancelBtn = document.getElementById("cancel-btn");
    const editForm = document.getElementById("edit-form");
    const profileContent = document.querySelector(".profile-content");

    editBtn.addEventListener("click", () => {
        profileContent.classList.add("d-none");
        editForm.classList.remove("d-none");
    });

    cancelBtn.addEventListener("click", () => {
        editForm.classList.add("d-none");
        profileContent.classList.remove("d-none");
    });

    saveBtn.addEventListener("click", () => {
        const fullname = document.getElementById("edit-fullname").value;
        const email = document.getElementById("edit-email").value;
        const phone = document.getElementById("edit-phone").value;
        const address = document.getElementById("edit-address").value;
        const dob = document.getElementById("edit-dob").value;
        const occupation = document.getElementById("edit-occupation").value;
        const company = document.getElementById("edit-company").value;
        const website = document.getElementById("edit-website").value;

        document.getElementById("profile-fullname").textContent = fullname;
        document.getElementById("profile-email-display").textContent = email;
        document.getElementById("profile-phone").textContent = phone;
        document.getElementById("profile-address").textContent = address;
        document.getElementById("profile-dob").textContent = dob;
        document.getElementById("profile-occupation").textContent = occupation;
        document.getElementById("profile-company").textContent = company;
        document.getElementById("profile-website").textContent = website;

        editForm.classList.add("d-none");
        profileContent.classList.remove("d-none");
    });
});
