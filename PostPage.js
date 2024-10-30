// Navbar Background Change on Scroll
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        header.classList.add("shadow");
    } else {
        header.classList.remove("shadow");
    }
});

function getPostIdFromURL() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

    function fetchAndDisplayPostContent() {
        // Get the post ID from the URL
        const postId = getPostIdFromURL();
    
        // Get user-created blog posts from localStorage
        const userBlogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    
        // Combine predefined posts with user-created posts
        const allBlogPosts = [...userBlogPosts, ...blogPosts];  // Assuming `blogPosts` holds predefined posts
    
        // Find the specific post by ID
        const post = allBlogPosts.find(p => p.id == postId);
    
        // Check if the post exists and display content
        if (post) {
            document.querySelector('.post-header .header-content').innerHTML = `
                <a href="index.html" class="back-home">Back To Home</a>
                <h1 class="header-title">${post.title}</h1>
            `;
    
            document.querySelector('.post-content-post-container').innerHTML = `
                <img class="header-img" src="${post.image}" alt="${post.title}">
                <p class="post-description">${post.content}</p>
            `;
        } else {
            // If no post is found, display an error message
            document.querySelector('.post-content-post-container').innerHTML = `
                <p>Sorry, the post you are looking for could not be found.</p>
            `;
        }
    }
    
    // Call the function on page load
    document.addEventListener('DOMContentLoaded', fetchAndDisplayPostContent);
    

