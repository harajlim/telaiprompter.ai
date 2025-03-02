document.addEventListener('DOMContentLoaded', function() {
    const phones = document.querySelectorAll('.phone-mockup');
    const phonesContainer = document.querySelector('.phones-showcase');
    
    // Create carousel indicators
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'carousel-indicators';
    phonesContainer.appendChild(indicatorsContainer);
    
    // Create navigation arrows
    const navContainer = document.createElement('div');
    navContainer.className = 'carousel-nav';
    navContainer.innerHTML = `
        <div class="nav-arrow prev-arrow">←</div>
        <div class="nav-arrow next-arrow">→</div>
    `;
    phonesContainer.appendChild(navContainer);
    
    // Create indicators
    phones.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === 0) indicator.classList.add('active');
        indicatorsContainer.appendChild(indicator);
        
        indicator.addEventListener('click', () => {
            showPhone(index);
        });
    });
    
    const indicators = document.querySelectorAll('.indicator');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    
    let currentIndex = 0;
    
    // Show first phone by default
    phones[0].classList.add('active');
    
    // Handle swipe
    let startX, moveX;
    phonesContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });
    
    phonesContainer.addEventListener('touchmove', (e) => {
        moveX = e.touches[0].clientX;
    });
    
    phonesContainer.addEventListener('touchend', () => {
        if (startX - moveX > 50) { // Swipe left
            showNextPhone();
        } else if (moveX - startX > 50) { // Swipe right
            showPrevPhone();
        }
    });
    
    // Navigation functions
    prevArrow.addEventListener('click', showPrevPhone);
    nextArrow.addEventListener('click', showNextPhone);
    
    function showPrevPhone() {
        currentIndex = (currentIndex - 1 + phones.length) % phones.length;
        showPhone(currentIndex);
    }
    
    function showNextPhone() {
        currentIndex = (currentIndex + 1) % phones.length;
        showPhone(currentIndex);
    }
    
    function showPhone(index) {
        phones.forEach(phone => phone.classList.remove('active'));
        indicators.forEach(ind => ind.classList.remove('active'));
        
        phones[index].classList.add('active');
        indicators[index].classList.add('active');
        currentIndex = index;
    }
}); 