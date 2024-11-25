// Завантаження профілю з localStorage
document.addEventListener("DOMContentLoaded", function () {
    const name = localStorage.getItem("profileName");
    const email = localStorage.getItem("profileEmail");

    // Якщо профілю немає, перенаправити на реєстрацію
    if (!name || !email) {
        alert("Please complete registration or login.");
        window.location.href = "register.html"; // Перенаправлення на реєстрацію
        return;
    }

    // Відображення даних профілю
    document.getElementById("profile-name").textContent = name;
    document.getElementById("profile-email").textContent = email;
});

// Відкриття модального вікна для редагування профілю
document.getElementById("edit-profile-btn").onclick = function () {
    document.getElementById("edit-profile-modal").style.display = "flex";

    // Завантажити поточні дані в модальне вікно
    document.getElementById("edit-name").value = localStorage.getItem("profileName") || "";
    document.getElementById("edit-email").value = localStorage.getItem("profileEmail") || "";
};

// Закриття модального вікна
document.querySelector(".close-modal").onclick = function () {
    document.getElementById("edit-profile-modal").style.display = "none";
};

// Закриття модального вікна при кліку поза його межами
window.onclick = function (event) {
    if (event.target == document.getElementById("edit-profile-modal")) {
        document.getElementById("edit-profile-modal").style.display = "none";
    }
};

// Збереження змін у профілі
document.getElementById("edit-profile-form").onsubmit = function (event) {
    event.preventDefault();

    // Отримання нових значень
    const newName = document.getElementById("edit-name").value.trim();
    const newEmail = document.getElementById("edit-email").value.trim();

    // Оновлення даних у DOM
    document.getElementById("profile-name").textContent = newName;
    document.getElementById("profile-email").textContent = newEmail;

    // Збереження у localStorage
    localStorage.setItem("profileName", newName);
    localStorage.setItem("profileEmail", newEmail);

    // Закриття модального вікна
    document.getElementById("edit-profile-modal").style.display = "none";

    alert("Profile updated successfully!");
};