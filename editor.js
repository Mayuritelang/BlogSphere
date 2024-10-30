// Navbar Background Change on Scroll
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        header.classList.add("shadow");
    } else {
        header.classList.remove("shadow");

    }
});

// Select the form element
const blogForm = document.getElementById('blogForm');
const defaultImageURL = './default-post-img.jpg';

// Event listener for form submission
blogForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the form from refreshing the page

    // Collect form data
    const title = blogForm.title.value;
    const content = blogForm.content.value;
    const imageFile = blogForm.image.files[0];
    const author = blogForm.author.value;
    const publishDate = blogForm.publishDate.value; 
    const publishTime = blogForm.publishTime.value;
    const tags = blogForm.tags.value.split(',').map(tag => tag.trim());

    // Convert image file to a Base64 string (for preview or saving purposes)
    let imageData = '';
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            imageData = event.target.result;
            saveBlogPost(title, content, imageData, author, publishDate, publishTime, tags); // Save after reading the image
        };
        reader.readAsDataURL(imageFile);
    } else {
        saveBlogPost(title, content, imageData, author, publishDate, publishTime, tags); // Save without image
    }
});

// Function to save the blog post data (you can extend this to save to a database or API)
function saveBlogPost(title, content, imageData, author, publishDate, publishTime, tags) {
    // Create a blog object
    const blogPost = {
        id: Date.now(),
        title: title,
        content: content,
        image: imageData || defaultImageURL,
        author: author,
        published_date: publishDate,
        reading_time: publishTime,
        tags: tags,
        date: new Date().toLocaleDateString(),
    };

    // Retrieve existing posts from localStorage or start with an empty array
    const blogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    blogPosts.push(blogPost);

    // Save updated array back to localStorage
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));

    // Redirect back to the homepage or show a success message
    alert('Blog post saved!');
    window.location.href = 'index.html';
}
