(function() {
    // La tua speciale nomenclatura dei giorni
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

    // Inizializza quando la pagina è caricata
    document.addEventListener('DOMContentLoaded', function() {
        // Aggiunge gli stili CSS dinamicamente
        const styles = `
            .calendar-strip {
                display: flex;
                gap: 10px;
                align-items: center;
                overflow-x: auto;
                padding: 20px;
                max-width: 100vw;
            }
            
            .day-square {
                width: 69px;
                height: 69px;
                background: white;
                border: 2px solid #ddd;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                font-size: 14px;
                transition: all 0.3s ease;
                flex-shrink: 0;
            }
            
            .today {
                background: #007cba;
                color: white;
                border-color: #005a87;
                transform: scale(1.1);
                font-weight: bold;
            }
            
            .weekday {
                background: white;
                color: #133984;
                border-color: #133984;
            }
            
            .terradi {
                background: white;
                color: #009240;
                border-color: #009240;
            }
            
            .soledi {
                background: white;
                color: #da251d;
                border-color: #da251d;
            }
            
            .day-number {
                font-size: 32px;
                font-weight: bold;
            }
            
            .day-name {
                font-size: 16px;
                font-weight: bold;
                text-align: center;
                line-height: 1.1;
                margin-top: 4px;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
        
        // Inizializza il calendario
        createCalendarStrip();
        scheduleDailyUpdate();
        window.addEventListener('resize', centerToday);
    });
})();