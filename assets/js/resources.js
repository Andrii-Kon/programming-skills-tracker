// Store bookmarks in localStorage
let bookmarkedResources = JSON.parse(localStorage.getItem('bookmarkedResources')) || [];

// Function to update bookmark buttons state
function updateBookmarkButtonsState() {
    document.querySelectorAll('.bookmark-btn').forEach(button => {
        const resourceElement = button.closest('li');
        const resourceUrl = resourceElement.querySelector('a').href;

        const isBookmarked = bookmarkedResources.some(bookmark => bookmark.url === resourceUrl);

        button.textContent = isBookmarked ? 'Added' : 'Bookmark';
        button.disabled = isBookmarked;
    });
}

// Function to add bookmark
function addBookmark(resourceElement) {
    const link = resourceElement.querySelector('a');
    const description = resourceElement.querySelector('p');

    const newBookmark = {
        id: Date.now(),
        url: link.href,
        title: link.textContent,
        description: description.textContent
    };

    // Check if resource is already bookmarked
    const isAlreadyBookmarked = bookmarkedResources.some(
        bookmark => bookmark.url === newBookmark.url
    );

    if (isAlreadyBookmarked) {
        alert('Цей ресурс вже додано до закладок!');
        return false;
    }

    bookmarkedResources.push(newBookmark);
    localStorage.setItem('bookmarkedResources', JSON.stringify(bookmarkedResources));
    displayBookmarkedResources();
    updateBookmarkButtonsState();
    return true;
}

// Function to remove bookmark
function removeBookmark(id) {
    bookmarkedResources = bookmarkedResources.filter(bookmark => bookmark.id !== id);
    localStorage.setItem('bookmarkedResources', JSON.stringify(bookmarkedResources));
    displayBookmarkedResources();
    updateBookmarkButtonsState();
}

// Function to display bookmarked resources
function displayBookmarkedResources() {
    const bookmarkedList = document.getElementById('bookmarked-resources');
    bookmarkedList.innerHTML = '';

    bookmarkedResources.forEach(bookmark => {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="${bookmark.url}" target="_blank">${bookmark.title}</a>
            <p>${bookmark.description}</p>
            <button class="remove-bookmark-btn" data-id="${bookmark.id}">Delete</button>
        `;
        bookmarkedList.appendChild(li);
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-bookmark-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = Number(e.target.getAttribute('data-id'));
            removeBookmark(id);
        });
    });
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Display existing bookmarks
    displayBookmarkedResources();

    // Initial update of bookmark buttons state
    updateBookmarkButtonsState();

    // Add click handlers for bookmark buttons
    document.querySelectorAll('.bookmark-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const resourceElement = e.target.closest('li');
            addBookmark(resourceElement);
        });
    });
});