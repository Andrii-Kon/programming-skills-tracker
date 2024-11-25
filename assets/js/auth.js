// Ключ для зберігання користувачів у localStorage
const USERS_KEY = 'users';

// Підготовка після завантаження DOM
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

// Функція обробки реєстрації
function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const confirmPassword = document.getElementById('confirm-password').value.trim();

    // Перевірка паролів
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Отримання списку користувачів
    let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    if (users.some(user => user.email === email)) {
        alert('User already exists!');
        return;
    }

    // Додавання нового користувача
    users.push({ name, email, password });
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    // Збереження профілю
    localStorage.setItem('profileName', name);
    localStorage.setItem('profileEmail', email);

    alert('Registration successful! You can now log in.');
    window.location.href = 'login.html';
}

// Функція обробки авторизації
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();

    // Отримання списку користувачів
    const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
        alert('Invalid email or password!');
        return;
    }

    // Збереження профілю
    localStorage.setItem('profileName', user.name);
    localStorage.setItem('profileEmail', user.email);

    // Перенаправлення на головну сторінку
    window.location.href = '../index.html'; // Перехід на головну сторінку
}