function updateEpoch() {
    let epoch = Math.floor(Date.now() / 1000);
    document.getElementById("epoch").textContent = epoch;
}
updateEpoch();
setInterval(updateEpoch, 1000);