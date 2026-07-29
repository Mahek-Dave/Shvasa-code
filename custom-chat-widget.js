window.addEventListener('load', function() {
  function initChatWidget() {
    // ============================================
    // CONFIGURATION 
    // ============================================
    const CONFIG = {
        whatsapp: {
            number: '17256969642', // Your WhatsApp number (with country code, no + or spaces)
            message: '' // Pre-filled message (optional)
        },
        messenger: {
            pageId: '107484734908547' // Your Facebook Page ID
        },
        instagram: {
            username: 'shvasa.yoga' // Your Instagram username
        },
        teamName: 'Shvasa Team', // Your team/business name
        teamInitial: 'S', // Initial for avatar
        replyTime: 'Typically replies in minutes', // Response time text
        welcomeMessage: "We're so pleased to meet you!", // Welcome heading
        bodyMessage: 'Reach out to us below on Whatsapp, Facebook or Instagram with any question and one of our team members will get back to you very soon.' // Main message
    };

    // ============================================
    // CSS Styles
    // ============================================
    const styles = `
        <style>
            .chat-widget {
                position: fixed;
                bottom: 20px;
                right: 20px;
                z-index: 9999;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            }

            .chat-button {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: #1877f2;
                border: none;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                transition: all 0.3s ease;
                position: relative;
            }

            .chat-button:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
            }

            .chat-button svg {
                width: 28px;
                height: 28px;
                fill: white;
            }

            .notification-badge {
                position: absolute;
                top: 0;
                right: 0;
                width: 16px;
                height: 16px;
                background: #ff4444;
                border-radius: 50%;
                border: 2px solid white;
                display: none;
            }

            .chat-modal {
                position: fixed;
                bottom: 90px;
                right: 20px;
                width: 380px;
                max-width: calc(100vw - 40px);
                background: white;
                border-radius: 16px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
                opacity: 0;
                transform: translateY(20px) scale(0.95);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                pointer-events: none;
                overflow: hidden;
            }

            .chat-modal.active {
                opacity: 1;
                transform: translateY(0) scale(1);
                pointer-events: all;
            }

            .modal-header {
                background: #1877f2;
                padding: 20px;
                color: white;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .header-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            .team-avatar {
                width: 48px;
                height: 48px;
                background: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                color: #1877f2;
                font-size: 18px;
                position: relative;
            }
            
            .shvasa-logo {
            		width: 100%;
                height: 100%;
            }

            .online-indicator {
                position: absolute;
                bottom: 0;
                right: 0;
                width: 14px;
                height: 14px;
                background: #00c853;
                border-radius: 50%;
                border: 2px solid white;
            }

            .team-info h3 {
                font-size: 18px;
                margin-bottom: 2px;
				color: white;
            }

            .team-info p {
                font-size: 13px;
                opacity: 0.9;
                color: white;
            }

            .close-btn-chat {
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 4px;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0.8;
                transition: opacity 0.2s;
            }

            .close-btn-chat:hover {
                opacity: 1;
            }

            .close-btn-chat svg {
                width: 24px;
                height: 24px;
            }

            .modal-body {
                padding: 24px;
            }

            .timestamp {
                text-align: center;
                color: #999;
                font-size: 12px;
                margin-bottom: 16px;
            }

            .message-bubble {
                background: #f0f2f5;
                padding: 16px;
                border-radius: 12px;
                margin-bottom: 24px;
            }

            .message-bubble p {
                color: #333;
                line-height: 1.5;
                font-size: 14px;
                margin-bottom: 12px;
            }

            .message-bubble p:last-child {
                margin-bottom: 0;
            }

            .chat-options {
                text-align: center;
            }

            .chat-options h4 {
                color: #333;
                font-size: 16px;
                margin-bottom: 16px;
            }

            .social-buttons {
                display: flex;
                gap: 12px;
                justify-content: center;
            }

            .social-btn {
                flex: 1;
                padding: 14px;
                border: none;
                border-radius: 12px;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                text-decoration: none;
            }

            .social-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }

            .whatsapp {
                background: #25d366;
            }

            .messenger {
                background: #0084ff;
            }

            .instagram {
                background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
            }

            .social-btn svg {
                width: 28px;
                height: 28px;
                fill: white;
            }

            @media (max-width: 480px) {
                .chat-modal {
                    width: calc(100vw - 40px);
                    bottom: 90px;
                }
                
                .social-buttons {
                    flex-direction: column;
                }
                
                .social-btn {
                    width: 100%;
                }
            }
        </style>
    `;

    // ============================================
    // HTML Template
    // ============================================
    const getCurrentTime = () => {
        const now = new Date();
        return now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    };

    const template = `
        ${styles}
        <div class="chat-widget">
            <button class="chat-button" id="chatButton">
                <svg viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l5.71-.97C9 21.64 10.46 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.38 0-2.67-.31-3.83-.86l-.27-.14-2.84.48.48-2.84-.14-.27C4.86 14.67 4.55 13.38 4.55 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8z"/>
                    <circle cx="9" cy="12" r="1"/>
                    <circle cx="12" cy="12" r="1"/>
                    <circle cx="15" cy="12" r="1"/>
                </svg>
                <span class="notification-badge"></span>
            </button>

            <div class="chat-modal" id="chatModal">
                <div class="modal-header">
                    <div class="header-content">
                        <div class="team-avatar">
                            <img src="https://cdn.prod.website-files.com/67691f03eb5bfa3289b3daed/69a68ca3ab3570d1160dc700_fb9668f8fec6dfacf41fb63d39250981_Shvasa-Logo-Plain.avif" class="shvasa-logo"></img>
                            <span class="online-indicator"></span>
                        </div>
                        <div class="team-info">
                            <h3>${CONFIG.teamName}</h3>
                            <p>${CONFIG.replyTime}</p>
                        </div>
                    </div>
                    <button class="close-btn-chat" id="closeBtnChat">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>
                </div>

                <div class="modal-body">
                    <div class="timestamp">${getCurrentTime()}</div>
                    
                    <div class="message-bubble">
                        <p><strong>${CONFIG.welcomeMessage}</strong></p>
                        <p>${CONFIG.bodyMessage}</p>
                    </div>

                    <div class="chat-options">
                        <h4><strong>Start Chat with:</strong></h4>
                        <div class="social-buttons">
                            <a href="#" class="social-btn whatsapp" id="whatsappBtn">
                                <svg viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                            </a>
                            <a href="#" class="social-btn messenger" id="messengerBtn">
                                <svg viewBox="0 0 24 24">
                                    <path d="M12 0C5.373 0 0 4.975 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.974 12-11.11C24 4.975 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8l3.131 3.259L19.752 8l-6.561 6.963z"/>
                                </svg>
                            </a>
                            <a href="#" class="social-btn instagram" id="instagramBtn">
                                <svg viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // ============================================
    // Initialize Widget
    // ============================================
  	let container = document.getElementById('chat-widget-container');
  	
  	if (!container) {
  	    container = document.createElement('div');
  	    container.id = 'chat-widget-container';
  	    document.body.appendChild(container);
  	}
  	
  	container.innerHTML = template;

    // ============================================
    // Event Handlers
    // ============================================
    const chatButton = document.getElementById('chatButton');
    const chatModal = document.getElementById('chatModal');
    const closeBtnChat = document.getElementById('closeBtnChat');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const messengerBtn = document.getElementById('messengerBtn');
    const instagramBtn = document.getElementById('instagramBtn');

    // Toggle modal
    chatButton.addEventListener('click', () => {
        chatModal.classList.toggle('active');
    });

    closeBtnChat.addEventListener('click', () => {
        chatModal.classList.remove('active');
    });

    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        if (!chatButton.contains(e.target) && !chatModal.contains(e.target)) {
            chatModal.classList.remove('active');
        }
    });

    // Detect if user is on mobile
    function isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    // WhatsApp handler
    whatsappBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const message = encodeURIComponent(CONFIG.whatsapp.message);
        const url = isMobile() 
            ? `whatsapp://send?phone=${CONFIG.whatsapp.number}&text=${message}`
            : `https://api.whatsapp.com/send?phone=${CONFIG.whatsapp.number}&text=${message}&type=phone_number&app_absent=0`;
        window.open(url, '_blank');
    });

    // Messenger handler
    messengerBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const url = isMobile()
            ? `fb-messenger://user/${CONFIG.messenger.pageId}`
            : `https://facebook.com/msg/${CONFIG.messenger.pageId}`;
        window.open(url, '_blank');
    });

    // Instagram handler
    instagramBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const url = `https://ig.me/m/${CONFIG.instagram.username}`;
        window.open(url, '_blank');
        
        if (isMobile()) {
            setTimeout(() => {
                window.location = `instagram://user?username=${CONFIG.instagram.username}`;
            }, 25);
        }
    });

    // Optional: Show notification badge after 2 seconds
    setTimeout(() => {
        const badge = document.querySelector('.notification-badge');
        if (badge) badge.style.display = 'block';
    }, 2000);
  } // end initChatWidget

  // ============================================
  // Scroll-gated trigger: attach widget only after user scrolls past 1 viewport height (100vh)
  // ============================================
  let widgetInitialized = false;

  function checkScrollAndInit() {
      if (widgetInitialized) return;

      if (window.scrollY >= window.innerHeight) {
          widgetInitialized = true;
          initChatWidget();
          window.removeEventListener('scroll', checkScrollAndInit);
      }
  }

  window.addEventListener('scroll', checkScrollAndInit, { passive: true });

  // Edge case: page loads already scrolled down (e.g. anchor link, back button)
  checkScrollAndInit();

});
