function aggiornaOra() {
    const ora = new Date();
    document.getElementById('orologio').textContent = ora.toLocaleTimeString('it-IT');
}
aggiornaOra();
setInterval(aggiornaOra, 1000);