(function() {
    const dayNames = {
        0: 'Soledì',
        1: 'Lunadì',
        2: 'Atomdì', 
        3: 'Acquadì',
        4: 'Ventodì',
        5: 'Fuocodì',
        6: 'Terradì'
    };

    function createCalendarStrip() {
        const calendarStrip = document.getElementById('calendarStrip');
        if (!calendarStrip) return;
        
        calendarStrip.innerHTML = '';

        const today = new Date();
        const daysToShow = 30;
        const daysEachSide = Math.floor(daysToShow / 2);

        for (let i = daysEachSide; i > 0; i--) {
            const pastDate = new Date(today);
            pastDate.setDate(today.getDate() - i);
            createDaySquare(pastDate, false);
        }

        createDaySquare(today, true);

        for (let i = 1; i <= daysEachSide; i++) {
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + i);
            createDaySquare(futureDate, false);
        }

        centerToday();
    }

    function createDaySquare(date, isToday) {
        const calendarStrip = document.getElementById('calendarStrip');
        const daySquare = document.createElement('div');
        
        const dayNumber = date.getDate();
        const dayOfWeek = date.getDay();
        const dayName = dayNames[dayOfWeek];
        
        daySquare.className = 'day-square';
        
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            daySquare.classList.add('weekday');
        } else if (dayOfWeek === 6) {
            daySquare.classList.add('terradi');
        } else if (dayOfWeek === 0) {
            daySquare.classList.add('soledi');
        }
        
        if (isToday) {
            daySquare.classList.add('today');
        }
        
        daySquare.innerHTML = `
            <div class="day-number">${dayNumber}</div>
            <div class="day-name">${dayName}</div>
        `;
        
        calendarStrip.appendChild(daySquare);
    }

    function centerToday() {
        const calendarStrip = document.getElementById('calendarStrip');
        const todayElement = document.querySelector('.today');
        
        if (todayElement && calendarStrip) {
            const containerWidth = calendarStrip.clientWidth;
            const todayOffset = todayElement.offsetLeft;
            const todayWidth = todayElement.clientWidth;
            
            calendarStrip.scrollLeft = todayOffset - (containerWidth / 2) + (todayWidth / 2);
        }
    }

    function scheduleDailyUpdate() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const timeUntilMidnight = tomorrow - now;
        
        setTimeout(() => {
            createCalendarStrip();
            setInterval(createCalendarStrip, 24 * 60 * 60 * 1000);
        }, timeUntilMidnight);
    }

    // Inizializza quando il DOM è pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCalendar);
    } else {
        initCalendar();
    }

    function initCalendar() {
        createCalendarStrip();
        scheduleDailyUpdate();
        window.addEventListener('resize', centerToday);
    }
})();