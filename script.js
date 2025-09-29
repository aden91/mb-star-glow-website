// script.js

// -------------------------------------
// FUNGSI 1: JAM REAL-TIME 
// -------------------------------------

function updateClock() {
    const now = new Date();
    // Opsi waktu dalam format Indonesia (WIB)
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        timeZoneName: 'short',
        timeZone: 'Asia/Jakarta' 
    };
    const formattedTime = now.toLocaleDateString('id-ID', options);
    
    // Update elemen di index.html
    const clockElement = document.getElementById('real-time-clock');
    if (clockElement) {
        clockElement.textContent = formattedTime;
    }
}

updateClock(); 
setInterval(updateClock, 1000); 


// -------------------------------------
// FUNGSI 2: CHATBOT SIMULASI INTERAKTIF
// -------------------------------------

const chatbotIcon = document.getElementById('chatbot-icon');
const chatbotContainer = document.getElementById('chatbot-container');
const closeChatbot = document.getElementById('close-chatbot');
const chatbotBody = document.getElementById('chatbot-body');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const waLink = "https://wa.me/6285156522383?text=Halo%20Admin%20MB%20Star%20Glow%2C%20saya%20ingin%20booking%20Facial%20Home%20Service%20setelah%20konsultasi%20dengan%20GlowBot.";


// Buka/Tutup Chatbot
if (chatbotIcon && chatbotContainer) {
    chatbotIcon.addEventListener('click', () => {
        chatbotContainer.style.display = 'flex';
        chatbotIcon.style.display = 'none';
        userInput.focus();
    });

    closeChatbot.addEventListener('click', () => {
        chatbotContainer.style.display = 'none';
        chatbotIcon.style.display = 'flex';
    });
}

// Menangani Pesan Kirim
if (sendBtn) {
    sendBtn.addEventListener('click', sendMessage);
}

if (userInput) {
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}


function sendMessage() {
    const messageText = userInput.value.trim();
    if (messageText === "") return;

    // Tampilkan pesan pengguna
    appendMessage(messageText, 'user-message');
    userInput.value = '';

    // Beri jeda 0.8 detik untuk respons bot
    setTimeout(() => {
        respondToUser(messageText.toLowerCase());
    }, 800);
}

function appendMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);
    
    if (type === 'bot-message') {
        messageDiv.innerHTML = text; // Izinkan HTML untuk tombol WA
    } else {
        messageDiv.textContent = text;
    }
    
    if (chatbotBody) {
        chatbotBody.appendChild(messageDiv);
        // Gulir ke bawah
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }
}

function respondToUser(query) {
    let response = "";

    if (query.includes('harga') || query.includes('biaya')) {
        response = "Untuk informasi harga lengkap, silakan kunjungi halaman <a href='layanan.html' target='_blank'>Layanan & Harga</a> kami. Apakah Anda ingin tahu rekomendasi paket berdasarkan masalah kulit Anda?";
    } else if (query.includes('booking') || query.includes('pesan')) {
        response = "Proses booking sangat mudah! Anda bisa langsung klik tombol di bawah ini untuk terhubung dengan admin kami dan memilih jadwal: " +
                   `<a href="${waLink}" target="_blank" class="chatbot-booking-btn">Booking Via WhatsApp</a>`;
    } else if (query.includes('acne') || query.includes('jerawat')) {
        response = "Untuk kulit berjerawat, kami merekomendasikan paket **FACIAL ACNE** (Rp 200.000). Paket ini fokus pada pembersihan komedo dan peradangan. Ingin langsung booking?";
    } else if (query.includes('kusam') || query.includes('glowing')) {
        response = "Kami punya paket **FACIAL GLOWING** (Rp 250.000) yang populer untuk mengatasi kulit kusam dan mengembalikan kilau sehat. Ingin detail lebih lanjut atau booking?";
    } else if (query.includes('alamat')) {
         response = "MB Star Glow adalah Home Service. Therapist kami datang ke rumah Anda. Kantor pusat kami berada di Krian, Sidoarjo. Ingin coba layanan home service kami?";
    } else if (query.includes('terima kasih')) {
        response = "Sama-sama! Senang bisa membantu Anda. Jangan ragu menghubungi kami lagi!";
    } else {
        response = "Mohon maaf, saya belum mengerti pertanyaan Anda. Coba tanyakan 'harga', 'booking', atau jenis masalah kulit seperti 'acne' atau 'kusam'.";
    }

    appendMessage(response, 'bot-message');
}