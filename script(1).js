// DOM Elements
const adminBtn = document.getElementById('adminBtn');
const adminPanel = document.getElementById('adminPanel');
const closePanel = document.getElementById('closePanel');
const passwordForm = document.getElementById('passwordForm');
const passwordInput = document.getElementById('passwordInput');
const verifyPassword = document.getElementById('verifyPassword');
const uploadArea = document.getElementById('uploadArea');
const uploadForm = document.getElementById('uploadForm');
const uploadInfo = document.getElementById('uploadInfo');
const uploadBtn = document.getElementById('uploadBtn');
const fileInput = document.getElementById('fileInput');
const videoGrid = document.getElementById('videoGrid');
const videoPlayer = document.getElementById('videoPlayer');
const player = document.getElementById('player');
const closePlayer = document.getElementById('closePlayer');
const notification = document.getElementById('notification');
const videoTitle = document.getElementById('videoTitle');
const thumbnailUrl = document.getElementById('thumbnailUrl');
const thumbnailPreview = document.getElementById('thumbnailPreview');
const submitUpload = document.getElementById('submitUpload');
const thumbnailUploadBtn = document.getElementById('thumbnailUploadBtn');
const thumbnailInput = document.getElementById('thumbnailInput');
const overlay = document.getElementById('overlay');
const deleteConfirmation = document.getElementById('deleteConfirmation');
const confirmDelete = document.getElementById('confirmDelete');
const cancelDelete = document.getElementById('cancelDelete');

// Admin password (in a real app, this would be server-side)
const ADMIN_PASSWORD = "admin123";

// Load videos from localStorage or use sample data
let videos = JSON.parse(localStorage.getItem('axHubVideos')) || [
    {
        id: 'video-1',
        title: "Naruto Shippuden - Episode 1",
        thumbnail: "https://picsum.photos/seed/anime1/600/400.jpg",
        duration: "23:45",
        views: "1.2M",
        url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    },
    {
        id: 'video-2',
        title: "My Hero Academia - Season 6",
        thumbnail: "https://picsum.photos/seed/anime2/600/400.jpg",
        duration: "24:10",
        views: "950K",
        url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4"
    },
    {
        id: 'video-3',
        title: "Demon Slayer - Mugen Train Arc",
        thumbnail: "https://picsum.photos/seed/anime3/600/400.jpg",
        duration: "48:22",
        views: "2.3M",
        url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4"
    },
    {
        id: 'video-4',
        title: "Attack on Titan - Final Season",
        thumbnail: "https://picsum.photos/seed/anime4/600/400.jpg",
        duration: "45:15",
        views: "1.8M",
        url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
    },
    {
        id: 'video-5',
        title: "One Piece - Wano Arc",
        thumbnail: "https://picsum.photos/seed/anime5/600/400.jpg",
        duration: "22:50",
        views: "1.5M",
        url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4"
    },
    {
        id: 'video-6',
        title: "Jujutsu Kaisen - Season 2",
        thumbnail: "https://picsum.photos/seed/anime6/600/400.jpg",
        duration: "23:30",
        views: "1.1M",
        url: "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_10mb.mp4"
    }
];

// Save videos to localStorage
function saveVideos() {
    localStorage.setItem('axHubVideos', JSON.stringify(videos));
}

// Initialize video grid
function initVideoGrid() {
    videoGrid.innerHTML = '';
    
    videos.forEach((video) => {
        const videoCard = document.createElement('div');
        videoCard.className = 'video-card';
        videoCard.dataset.id = video.id;
        videoCard.innerHTML = `
            <img src="${video.thumbnail}" alt="${video.title}" class="video-thumbnail">
            <div class="play-overlay">
                <div class="play-btn">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="video-menu">
                <div class="menu-btn">
                    <i class="fas fa-ellipsis-v"></i>
                </div>
                <div class="menu-content">
                    <div class="menu-item delete-video">
                        <i class="fas fa-trash-alt"></i> Delete
                    </div>
                </div>
            </div>
            <div class="video-info">
                <h3 class="video-title">${video.title}</h3>
                <div class="video-meta">
                    <span><i class="far fa-clock"></i>${video.duration}</span>
                    <span><i class="far fa-eye"></i>${video.views}</span>
                </div>
            </div>
        `;
        
        // Add click event to play video
        const playBtn = videoCard.querySelector('.play-btn');
        playBtn.addEventListener('click', () => {
            playVideo(video.url, video.title);
        });
        
        // Add click event to delete video
        const deleteBtn = videoCard.querySelector('.delete-video');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            showDeleteConfirmation(video.id);
        });
        
        // Add click event to menu button
        const menuBtn = videoCard.querySelector('.menu-btn');
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu(videoCard.querySelector('.menu-content'));
        });
        
        videoGrid.appendChild(videoCard);
    });
}

// Play video function
function playVideo(url, title) {
    player.src = url;
    player.setAttribute('title', title);
    videoPlayer.classList.add('active');
    player.play();
}

// Toggle menu
function toggleMenu(menuContent) {
    // Close all other menus first
    document.querySelectorAll('.menu-content.active').forEach(menu => {
        if (menu !== menuContent) {
            menu.classList.remove('active');
        }
    });
    
    // Toggle the clicked menu
    menuContent.classList.toggle('active');
}

// Show delete confirmation
function showDeleteConfirmation(videoId) {
    overlay.classList.add('active');
    deleteConfirmation.classList.add('active');
    
    // Set up event listener for confirmation
    confirmDelete.onclick = () => {
        deleteVideo(videoId);
        hideDeleteConfirmation();
    };
    
    // Set up event listener for cancellation
    cancelDelete.onclick = hideDeleteConfirmation;
}

// Hide delete confirmation
function hideDeleteConfirmation() {
    overlay.classList.remove('active');
    deleteConfirmation.classList.remove('active');
}

// Delete video
function deleteVideo(videoId) {
    videos = videos.filter(video => video.id !== videoId);
    saveVideos();
    initVideoGrid();
    
    notification.textContent = "Video deleted successfully!";
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Toggle admin panel
adminBtn.addEventListener('click', () => {
    adminPanel.classList.add('active');
});

closePanel.addEventListener('click', () => {
    adminPanel.classList.remove('active');
});

// Verify admin password
verifyPassword.addEventListener('click', () => {
    const password = passwordInput.value;
    
    if (password === ADMIN_PASSWORD) {
        passwordForm.style.display = 'none';
        uploadArea.classList.add('active');
        uploadForm.classList.add('active');
        uploadInfo.classList.add('active');
        notification.textContent = "Admin access granted!";
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    } else {
        notification.textContent = "Incorrect password! Access denied.";
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
});

// Upload button click
uploadBtn.addEventListener('click', () => {
    fileInput.click();
});

// Thumbnail upload button click
thumbnailUploadBtn.addEventListener('click', () => {
    thumbnailInput.click();
});

// Update thumbnail preview when URL changes
thumbnailUrl.addEventListener('input', updateThumbnailPreview);

// Update thumbnail preview when file is selected
thumbnailInput.addEventListener('change', updateThumbnailFromUpload);

function updateThumbnailPreview() {
    const url = thumbnailUrl.value.trim();
    if (url) {
        thumbnailPreview.innerHTML = `<img src="${url}" alt="Thumbnail preview">`;
    } else {
        thumbnailPreview.innerHTML = `<p class="thumbnail-preview-text">Thumbnail preview will appear here</p>`;
    }
}

function updateThumbnailFromUpload() {
    if (thumbnailInput.files.length > 0) {
        const file = thumbnailInput.files[0];
        const url = URL.createObjectURL(file);
        thumbnailPreview.innerHTML = `<img src="${url}" alt="Thumbnail preview">`;
    }
}

// Submit upload
submitUpload.addEventListener('click', () => {
    const title = videoTitle.value.trim() || "Untitled Video";
    
    // Get thumbnail from preview or URL input
    let thumbnail = '';
    const previewImg = thumbnailPreview.querySelector('img');
    
    if (previewImg) {
        thumbnail = previewImg.src;
    } else if (thumbnailUrl.value.trim()) {
        thumbnail = thumbnailUrl.value.trim();
    } else {
        thumbnail = `https://picsum.photos/seed/${Math.random().toString(36).substring(7)}/600/400.jpg`;
    }
    
    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];
        
        // Check if it's an MP4 file
        if (file.type === 'video/mp4') {
            // Create a new video object
            const newVideo = {
                id: 'video-' + Date.now(), // Unique ID
                title: title,
                thumbnail: thumbnail,
                duration: "00:00", // Would be calculated from actual video
                views: "0",
                url: URL.createObjectURL(file) // Create a temporary URL for the uploaded file
            };
            
            // Add the new video to the beginning of the array
            videos.unshift(newVideo);
            
            // Save to localStorage
            saveVideos();
            
            // Reinitialize the grid to show the new video instantly
            initVideoGrid();
            
            // Show notification
            notification.textContent = "Video uploaded successfully!";
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
            
            // Reset form
            videoTitle.value = '';
            thumbnailUrl.value = '';
            thumbnailPreview.innerHTML = `<p class="thumbnail-preview-text">Thumbnail preview will appear here</p>`;
            fileInput.value = '';
        } else {
            notification.textContent = "Please upload an MP4 video file.";
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }
    } else {
        notification.textContent = "Please select a video file to upload.";
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
});

// Close admin panel when clicking outside
document.addEventListener('click', (e) => {
    if (!adminPanel.contains(e.target) && e.target !== adminBtn && adminPanel.classList.contains('active')) {
        adminPanel.classList.remove('active');
    }
    
    // Close menu when clicking outside
    if (!e.target.closest('.menu-btn') && !e.target.closest('.menu-content')) {
        document.querySelectorAll('.menu-content.active').forEach(menu => {
            menu.classList.remove('active');
        });
    }
});

// Close video player when clicking outside
videoPlayer.addEventListener('click', (e) => {
    if (e.target === videoPlayer) {
        videoPlayer.classList.remove('active');
        player.pause();
        player.src = '';
    }
});

// Close delete confirmation when clicking outside
overlay.addEventListener('click', hideDeleteConfirmation);

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    // Revoke object URLs to prevent memory leaks
    videos.forEach(video => {
        if (video.url.startsWith('blob:')) {
            URL.revokeObjectURL(video.url);
        }
    });
});

// Initialize the page
window.addEventListener('DOMContentLoaded', () => {
    initVideoGrid();
});