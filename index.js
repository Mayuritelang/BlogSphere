// Select the blog post container
const blogContainer = document.getElementById('blog-posts');
const filterItems = document.querySelectorAll('.filter-item');

// Function to create the blog post HTML structure
function createBlogPost(post) {
    return `
       <a class="postpage-post-id" href="PostPage.html?id=${post.id}">
         <div class="post-box ${post.category}" data-category="${post.category}">
          <img class="post-img" src="${post.image}" alt="${post.title}">
          <div class="post-info">
              <h3 class="post-title">${post.title}</h3>
              <p class="post-author-date">By ${post.author} | ${post.published_date}</p>
              <p class="post-author-date">Reading time: ${post.reading_time}</p>
              <p class="post-content">${post.content}</p>
              <div class="tags">
                  ${post.tags ? post.tags.map(tag => `<span class="tag">${tag}</span>`).join('') : ''}
              </div>
          </div>
      </div>
       </a>
    `;
}
    

// Function to render all blog posts
function renderBlogPosts(posts) {
    blogContainer.innerHTML = posts.map(createBlogPost).join('');
}

function fetchAllBlogPosts() {
    const userBlogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const allBlogPosts = [...userBlogPosts, ...blogPosts];
    renderBlogPosts(allBlogPosts);
}

fetchAllBlogPosts();


function filterPosts(category) {
    const userBlogPosts = JSON.parse(localStorage.getItem('blogPosts')) || [];
    const allBlogPosts = [...userBlogPosts, ...blogPosts];

    // If 'all' is selected, show all posts
    const filteredPosts = category === 'all' ? allBlogPosts : allBlogPosts.filter(post => post.category === category);

    renderBlogPosts(filteredPosts);
}

filterItems.forEach(item => {
    item.addEventListener('click', () => {
        filterItems.forEach(i => i.classList.remove('active-filter'));
        item.classList.add('active-filter');
        const category = item.getAttribute('data-filter');
        filterPosts(category);
    });
});

fetchAllBlogPosts();

// Navbar Background Change on Scroll
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        header.classList.add("shadow");
    } else {
        header.classList.remove("shadow");

    }
});
