// ============================================
// FLOATING SURPRISE BUTTONS! 🎉
// ============================================

// Create floating surprise buttons
function createSurpriseButtons() {
    const buttons = [
        { emoji: '🌋', text: 'SHAKE IT!', action: earthquakeMode, color: '#ff006e' },
        { emoji: '🚀', text: 'LAUNCH!', action: rocketLaunch, color: '#0066ff' },
        { emoji: '🕺', text: 'DISCO!', action: discoMode, color: '#ff6b00' },
        { emoji: '💼', text: 'HIRE ME!', action: showJobOffer, color: '#00ff00' },
        { emoji: '🎊', text: 'PARTY!', action: confettiExplosion, color: '#ff006e' }
    ];
    
    const container = document.createElement('div');
    container.id = 'surprise-buttons';
    container.style.cssText = `
        position: fixed;
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 9999;
    `;
    
    buttons.forEach((btn, index) => {
        const button = document.createElement('button');
        button.innerHTML = `<span style="font-size: 1.5rem;">${btn.emoji}</span>`;
        button.title = btn.text;
        button.style.cssText = `
            background: ${btn.color};
            color: #fff;
            border: 3px solid #0a0a0a;
            padding: 1rem;
            font-weight: 900;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 60px;
            height: 60px;
            animation: float 3s ease-in-out infinite;
            animation-delay: ${index * 0.2}s;
            box-shadow: 5px 5px 0 rgba(0,0,0,0.2);
        `;
        
        button.addEventListener('click', btn.action);
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.2) translateX(10px)';
        });
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });
        
        container.appendChild(button);
    });
    
    document.body.appendChild(container);
}

// SURPRISE 1: EARTHQUAKE MODE! 🌋
function earthquakeMode() {
    document.body.style.animation = 'earthquake 0.5s ease 3';
    
    const msg = document.createElement('div');
    msg.innerHTML = '🌋 EARTHQUAKE! 🌋';
    msg.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 5rem;
        font-weight: 900;
        color: #ff006e;
        z-index: 10001;
        text-shadow: 5px 5px 0 #0a0a0a;
        animation: shake 0.5s ease infinite;
        pointer-events: none;
    `;
    document.body.appendChild(msg);
    
    setTimeout(() => {
        document.body.style.animation = '';
        msg.remove();
    }, 1500);
}

// SURPRISE 2: NASA ROCKET LAUNCH! 🚀
function rocketLaunch() {
    // Create fullscreen overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to bottom, #001a33 0%, #003366 50%, #ff6b00 100%);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        padding-bottom: 10%;
    `;
    document.body.appendChild(overlay);
    
    // Mission Control Text
    const missionControl = document.createElement('div');
    missionControl.style.cssText = `
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translateX(-50%);
        text-align: center;
        color: #fff;
        font-weight: 900;
        z-index: 10002;
    `;
    missionControl.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">🎯 MISSION CONTROL</div>
        <div id="mission-status" style="font-size: 1.5rem; color: #00ff00;">INITIATING LAUNCH SEQUENCE...</div>
    `;
    overlay.appendChild(missionControl);
    
    // Countdown Display
    const countdownDisplay = document.createElement('div');
    countdownDisplay.style.cssText = `
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translateX(-50%);
        font-size: 10rem;
        font-weight: 900;
        color: #ff006e;
        text-shadow: 0 0 30px #ff006e;
        z-index: 10002;
    `;
    overlay.appendChild(countdownDisplay);
    
    // Launch Pad
    const launchPad = document.createElement('div');
    launchPad.style.cssText = `
        width: 200px;
        height: 50px;
        background: #333;
        border: 5px solid #666;
        position: relative;
        z-index: 10001;
    `;
    overlay.appendChild(launchPad);
    
    // Rocket
    const rocket = document.createElement('div');
    rocket.innerHTML = '🚀';
    rocket.style.cssText = `
        position: absolute;
        bottom: 50px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 8rem;
        z-index: 10001;
        transition: all 0.5s ease;
    `;
    overlay.appendChild(rocket);
    
    // Countdown sequence
    const messages = [
        "T-MINUS 10 SECONDS",
        "ALL SYSTEMS GO",
        "ENGINES ARMED",
        "FINAL CHECKS COMPLETE",
        "IGNITION SEQUENCE START"
    ];
    
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
        if (messageIndex < messages.length) {
            document.getElementById('mission-status').textContent = messages[messageIndex];
            messageIndex++;
        }
    }, 1000);
    
    // Countdown from 3
    let count = 3;
    countdownDisplay.textContent = count;
    
    const countdownInterval = setInterval(() => {
        count--;
        countdownDisplay.textContent = count;
        
        // Shake effect on countdown
        overlay.style.animation = 'shake 0.2s ease';
        setTimeout(() => overlay.style.animation = '', 200);
        
        if (count === 0) {
            clearInterval(countdownInterval);
            clearInterval(messageInterval);
            countdownDisplay.textContent = 'LIFTOFF!';
            document.getElementById('mission-status').textContent = '🔥 WE HAVE LIFTOFF! 🔥';
            
            // Create smoke/fire effect
            createSmoke(overlay);
            
            // Launch rocket
            setTimeout(() => {
                rocket.style.bottom = '150%';
                rocket.style.transform = 'translateX(-50%) rotate(0deg) scale(2)';
                rocket.style.transition = 'all 2s ease-out';
                
                // Screen shake during launch
                document.body.style.animation = 'earthquake 0.3s ease infinite';
            }, 300);
            
            // Success celebration
            setTimeout(() => {
                document.body.style.animation = '';
                successCelebration(overlay);
            }, 2300);
            
            // Remove overlay
            setTimeout(() => {
                overlay.style.opacity = '0';
                overlay.style.transition = 'opacity 1s ease';
                setTimeout(() => overlay.remove(), 1000);
            }, 5000);
        }
    }, 1000);
}

function createSmoke(container) {
    // Create multiple smoke particles
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const smoke = document.createElement('div');
            smoke.textContent = '💨';
            smoke.style.cssText = `
                position: absolute;
                bottom: 50px;
                left: calc(50% + ${(Math.random() - 0.5) * 100}px);
                font-size: ${Math.random() * 3 + 2}rem;
                z-index: 10000;
                transition: all 2s ease;
                opacity: 0.8;
            `;
            container.appendChild(smoke);
            
            setTimeout(() => {
                smoke.style.bottom = `${Math.random() * 200 + 100}px`;
                smoke.style.opacity = '0';
                smoke.style.transform = `scale(${Math.random() * 2 + 1})`;
            }, 10);
            
            setTimeout(() => smoke.remove(), 2000);
        }, i * 50);
    }
    
    // Fire effect
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const fire = document.createElement('div');
            fire.textContent = '🔥';
            fire.style.cssText = `
                position: absolute;
                bottom: 50px;
                left: calc(50% + ${(Math.random() - 0.5) * 80}px);
                font-size: ${Math.random() * 2 + 1.5}rem;
                z-index: 10000;
                transition: all 1.5s ease;
                opacity: 1;
            `;
            container.appendChild(fire);
            
            setTimeout(() => {
                fire.style.bottom = `${Math.random() * 150 + 50}px`;
                fire.style.opacity = '0';
            }, 10);
            
            setTimeout(() => fire.remove(), 1500);
        }, i * 40);
    }
}

function successCelebration(container) {
    // Success message
    const success = document.createElement('div');
    success.innerHTML = `
        <div style="font-size: 5rem; margin-bottom: 1rem;">🎉 MISSION SUCCESS! 🎉</div>
        <div style="font-size: 2rem; margin-bottom: 1rem;">ROCKET REACHED ORBIT!</div>
        <div style="font-size: 1.5rem;">🌟 Achievement Unlocked: Space Explorer! 🌟</div>
    `;
    success.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: #fff;
        font-weight: 900;
        z-index: 10003;
        animation: bounce 0.5s ease infinite;
    `;
    container.appendChild(success);
    
    // Fireworks
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFirework(container, Math.random() * window.innerWidth, Math.random() * window.innerHeight * 0.5);
        }, i * 500);
    }
}

function createFirework(container, x, y) {
    const colors = ['#ff006e', '#0066ff', '#00ff00', '#ff6b00', '#ffff00'];
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = Math.random() * 150 + 100;
        
        particle.style.cssText = `
            position: absolute;
            left: ${x}px;
            top: ${y}px;
            width: 10px;
            height: 10px;
            background: ${color};
            border-radius: 50%;
            z-index: 10002;
            transition: all 1.5s ease;
            box-shadow: 0 0 10px ${color};
        `;
        container.appendChild(particle);
        
        setTimeout(() => {
            particle.style.left = `${x + Math.cos(angle) * velocity}px`;
            particle.style.top = `${y + Math.sin(angle) * velocity}px`;
            particle.style.opacity = '0';
        }, 10);
        
        setTimeout(() => particle.remove(), 1500);
    }
}

// SURPRISE 3: DISCO MODE! 🕺
function discoMode() {
    const disco = document.createElement('div');
    disco.innerHTML = '🕺 DISCO MODE! 💃';
    disco.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 5rem;
        font-weight: 900;
        color: #fff;
        z-index: 10001;
        text-shadow: 5px 5px 0 #0a0a0a;
        animation: disco 0.2s ease infinite;
        pointer-events: none;
    `;
    document.body.appendChild(disco);
    
    // Disco lights
    document.body.style.animation = 'disco 0.2s ease infinite';
    
    setTimeout(() => {
        document.body.style.animation = '';
        disco.remove();
    }, 5000);
}

// SURPRISE 4: JOB OFFER! 💼
function showJobOffer() {
    const offer = document.createElement('div');
    offer.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">💼</div>
        <div style="font-size: 2rem; font-weight: 900; margin-bottom: 1rem;">JOB OFFER!</div>
        <div style="font-size: 1.2rem; margin-bottom: 1rem;">Congratulations! You're hired!</div>
        <div style="font-size: 1rem; margin-bottom: 0.5rem;">Position: Senior Awesome Developer</div>
        <div style="font-size: 1rem; margin-bottom: 1rem;">Salary: ∞ Coffee + Unlimited Pizza 🍕</div>
        <button onclick="this.parentElement.remove()" style="margin-top: 1rem; padding: 1rem 2rem; background: #00ff00; border: 3px solid #0a0a0a; font-weight: 900; cursor: pointer; font-size: 1rem;">ACCEPT! 🎉</button>
        <button onclick="this.parentElement.remove()" style="margin-top: 1rem; margin-left: 1rem; padding: 1rem 2rem; background: #ff006e; color: #fff; border: 3px solid #0a0a0a; font-weight: 900; cursor: pointer; font-size: 1rem;">DECLINE 😢</button>
    `;
    offer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        color: #0a0a0a;
        padding: 3rem;
        border: 5px solid #0a0a0a;
        z-index: 10002;
        text-align: center;
        box-shadow: 20px 20px 0 rgba(0,0,0,0.2);
        animation: slideIn 0.5s ease;
    `;
    document.body.appendChild(offer);
}

// SURPRISE 5: CONFETTI EXPLOSION! 🎊
function confettiExplosion() {
    const colors = ['#0066ff', '#ff006e', '#00ff00', '#ff6b00'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 15 + 5;
        const startX = Math.random() * window.innerWidth;
        const endY = window.innerHeight + 100;
        
        confetti.style.cssText = `
            position: fixed;
            left: ${startX}px;
            top: -20px;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            z-index: 9999;
            transition: all 3s ease;
            pointer-events: none;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.style.top = endY + 'px';
            confetti.style.opacity = '0';
            confetti.style.transform = 'rotate(720deg)';
        }, 10);
        
        setTimeout(() => confetti.remove(), 3000);
    }
    
    // Show message
    const msg = document.createElement('div');
    msg.innerHTML = '🎊 PARTY TIME! 🎊';
    msg.style.cssText = `
        position: fixed;
        top: 30%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 5rem;
        font-weight: 900;
        color: #ff006e;
        z-index: 10001;
        text-shadow: 5px 5px 0 #0a0a0a;
        animation: bounce 0.5s ease infinite;
        pointer-events: none;
    `;
    document.body.appendChild(msg);
    setTimeout(() => msg.remove(), 3000);
}

// Add all animations
const surpriseStyle = document.createElement('style');
surpriseStyle.textContent = `
    @keyframes earthquake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
        20%, 40%, 60%, 80% { transform: translateX(10px); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
        25% { transform: translate(-50%, -50%) rotate(-5deg); }
        75% { transform: translate(-50%, -50%) rotate(5deg); }
    }
    
    @keyframes disco {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes explode {
        0% { transform: translate(-50%, -50%) scale(0); }
        50% { transform: translate(-50%, -50%) scale(1.5); }
        100% { transform: translate(-50%, -50%) scale(1); }
    }
    
    @keyframes slideIn {
        from { transform: translate(-50%, -150%); }
        to { transform: translate(-50%, -50%); }
    }
    
    @keyframes bounce {
        0%, 100% { transform: translate(-50%, -50%) scale(1); }
        50% { transform: translate(-50%, -50%) scale(1.1); }
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
`;
document.head.appendChild(surpriseStyle);

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        createSurpriseButtons();
        console.log('🎉 SURPRISE BUTTONS LOADED!');
    });
} else {
    // DOM already loaded
    createSurpriseButtons();
    console.log('🎉 SURPRISE BUTTONS LOADED!');
}
