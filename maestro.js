// Get prize from URL parameters
const urlParams = new URLSearchParams(window.location.search);
const prize = urlParams.get('prize');

// Display the prize
if (prize) {
    document.getElementById('prize-display').textContent = decodeURIComponent(prize);
} else {
    document.getElementById('prize-display').textContent = "Mystery Prize";
}
