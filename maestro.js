function getRandomPrize() {
    const prizes = [
        "1 Maestro premium account for 1 month",
        "2 Maestro premium account for 1 week",
        "3 Maestro premium account for 1 week",
        "4 Maestro premium account for 1 week",
        "5 Maestro premium account for 1 week",
        "6 Maestro premium account for 1 week",
        "7 Maestro premium account for 3 days",
        "8 Maestro premium account for 3 days",
        "9 Maestro premium account for 1 day",
        "10 Maestro premium account for 1 day"
    ];
    
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    document.getElementById("prize").textContent = randomPrize;
}
  
window.onload = getRandomPrize;
