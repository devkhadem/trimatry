const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    document.querySelectorAll(".nav-menu li a").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));
}

const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
        }
    });
}, observerOptions);

document.querySelectorAll(".animate-on-scroll").forEach((el) => observer.observe(el));

// Gallery Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Live Chat Widget Logic
const liveAgentBtn = document.getElementById('liveAgentBtn');
const chatWidget = document.getElementById('chatWidget');
const closeChat = document.getElementById('closeChat');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');
const chatBody = document.getElementById('chatBody');

if (liveAgentBtn && chatWidget && closeChat) {
    liveAgentBtn.addEventListener('click', () => {
        chatWidget.classList.toggle('active');
    });

    closeChat.addEventListener('click', () => {
        chatWidget.classList.remove('active');
    });

    // Simple Message Handling
    const handleMessage = () => {
        const text = chatInput.value.trim();
        if (text) {
            // Add User Message
            const userMsg = document.createElement('div');
            userMsg.className = 'chat-message user';
            userMsg.textContent = text;
            chatBody.appendChild(userMsg);
            chatInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;

            // Auto Reply after 1 second
            setTimeout(() => {
                const botMsg = document.createElement('div');
                botMsg.className = 'chat-message bot';
                botMsg.textContent = "Thank you for your message. We will get back to you shortly.";
                chatBody.appendChild(botMsg);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);
        }
    };

    sendMessage.addEventListener('click', handleMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleMessage();
    });
}