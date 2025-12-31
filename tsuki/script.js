new Typed('#typed-text', {
    strings: ['Absofuckinlutelyyy.'],
    typeSpeed: 150,
    showCursor: false,
    loop: true
});

const DISCORD_ID = '918805451158749214';

function updatePresence() {
    fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`)
        .then(response => response.json())
        .then(data => {
            const presence = data.data;
            const activities = presence.activities;
            
            if (activities && activities.length > 0) {
                const activity = activities.find(act => act.assets) || activities[0];
                
                if (activity.assets) {
                    let imageUrl = '';
                    
                    if (activity.type === 2) {
                        imageUrl = activity.assets.large_image;
                        if (imageUrl.startsWith('spotify:')) {
                            imageUrl = `https://i.scdn.co/image/${imageUrl.replace('spotify:', '')}`;
                        }
                    } else {
                        const imageKey = activity.assets.large_image;
                        if (imageKey.startsWith('mp:')) {
                            imageUrl = `https://media.discordapp.net/${imageKey.replace('mp:', '')}`;
                        } else {
                            imageUrl = `https://cdn.discordapp.com/app-assets/${activity.application_id}/${imageKey}.png`;
                        }
                    }
                    
                    document.getElementById('discord-activity-image').src = imageUrl;
                    document.getElementById('discord-activity-image').style.display = 'block';
                }

                const activityTexts = activities.map(activity => {
                    if (activity.type === 2) {
                        return `${activity.details}\nby ${activity.state}`;
                    } else if (activity.type === 4) {
                        return `${activity.state || ''}`;
                    } else {
                        return `${activity.name}\n${activity.details || ''}\n${activity.state || ''}`.trim();
                    }
                });
                
                document.getElementById('discord-activity-details').textContent = activityTexts.join('\n\n');
            } else {
                document.getElementById('discord-activity-image').style.display = 'none';
                document.getElementById('discord-activity-details').textContent = 'No current activity';
            }
        })
        .catch(error => console.log('Error fetching presence:', error));
}
updatePresence();
setInterval(updatePresence, 300);



const bgAudio = document.getElementById('bg-audio');
const volumeSlider = document.getElementById('volume-slider');
const volumeIcon = document.getElementById('volume-icon');
const bgVideo = document.getElementById('bg-video');
const entranceOverlay = document.getElementById('entrance-overlay');

volumeSlider.addEventListener('input', (e) => {
    const value = e.target.value;
    bgAudio.volume = value / 100;
    bgVideo.volume = value / 100;
    volumeIcon.className = `bx ${value == 0 ? 'bxs-volume-mute' : 'bxs-volume-full'}`;
});

volumeIcon.addEventListener('click', () => {
    if (bgAudio.volume > 0) {
        bgAudio.volume = 0;
        bgVideo.volume = 0;
        volumeSlider.value = 0;
        volumeIcon.className = 'bx bxs-volume-mute';
    } else {
        bgAudio.volume = 1;
        bgVideo.volume = 1;
        volumeSlider.value = 100;
        volumeIcon.className = 'bx bxs-volume-full';
    }
});

entranceOverlay.addEventListener('click', () => {
    entranceOverlay.style.opacity = '0';
    setTimeout(() => {
        entranceOverlay.style.display = 'none';
        bgVideo.play();
        bgAudio.play();
    }, 500);
});

// Create stars
function createStars() {
    const starsContainer = document.getElementById('starfield');
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';

        // Randomly assign sizes
        const sizeClass = Math.random() > 0.7 ? 'large' : Math.random() > 0.4 ? '' : 'small';
        if (sizeClass) star.classList.add(sizeClass);

        starsContainer.appendChild(star);
    }
}

// Create particles
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.id = 'particles';
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.zIndex = '-1';
    particlesContainer.style.pointerEvents = 'none';
    document.body.appendChild(particlesContainer);

    const particleCount = 150;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        // Randomly assign sizes
        const sizeClass = Math.random() > 0.6 ? 'large' : Math.random() > 0.3 ? 'medium' : 'small';
        particle.classList.add(sizeClass);

        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 10 + 's';
        particle.style.animationDuration = (Math.random() * 5 + 10) + 's';
        particle.style.background = `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 50}, ${Math.floor(Math.random() * 100) + 150}, 0.3)`;
        particlesContainer.appendChild(particle);
    }
}

createStars();
createParticles();

// Gallery Modal Functionality
function openModal(img) {
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-image');
    modal.style.display = 'block';
    modalImg.src = img.src;
}

function closeModal() {
    document.getElementById('gallery-modal').style.display = 'none';
}

// Close modal when clicking outside or on close button
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('gallery-modal');
    const closeBtn = document.getElementsByClassName('close')[0];

    closeBtn.onclick = closeModal;

    modal.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };
});

