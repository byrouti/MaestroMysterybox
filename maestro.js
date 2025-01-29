// // Get prize and user from URL parameters
// const urlParams = new URLSearchParams(window.location.search);
// const prize = urlParams.get('prize');
// const userId = urlParams.get('user');

// // Check if user has already claimed a prize
// function hasUserClaimedPrize() {
//     const claimedPrizes = JSON.parse(localStorage.getItem('claimedPrizes') || '[]');
//     return claimedPrizes.includes(userId);
// }

// // Mark prize as claimed
// function markPrizeAsClaimed() {
//     const claimedPrizes = JSON.parse(localStorage.getItem('claimedPrizes') || '[]');
//     if (!claimedPrizes.includes(userId)) {
//         claimedPrizes.push(userId);
//         localStorage.setItem('claimedPrizes', JSON.stringify(claimedPrizes));
//     }
// }

// // Display the prize
// async function handlePrize() {
//     const prizeDisplay = document.getElementById('prize-display');

//     if (!prize || !userId) {
//         prizeDisplay.textContent = "Invalid prize link!";
//         document.querySelector('.contact-button').style.display = 'none';
//         return;
//     }

//     if (hasUserClaimedPrize()) {
//         prizeDisplay.textContent = "You have already claimed this prize!";
//         document.querySelector('.contact-button').style.display = 'none';
//         return;
//     }

//     // For local testing, display the prize without an API call
//     if (window.location.hostname === 'localhost') {
//         prizeDisplay.textContent = decodeURIComponent(prize);
//         markPrizeAsClaimed();
//         return;
//     }

//     try {
//         const response = await fetch(`/claim_prize?prize=${prize}&user=${userId}`);
//         const result = await response.json();

//         if (result.success) {
//             prizeDisplay.textContent = decodeURIComponent(prize);
//             markPrizeAsClaimed();
//         } else {
//             prizeDisplay.textContent = result.message || "Failed to claim prize.";
//             document.querySelector('.contact-button').style.display = 'none';
//         }
//     } catch (error) {
//         prizeDisplay.textContent = "Error claiming prize. Please try again.";
//         document.querySelector('.contact-button').style.display = 'none';
//     }
// }

// document.addEventListener('DOMContentLoaded', async () => {
//     const userId = new URLSearchParams(window.location.search).get('user_id');
//     const prizeStatus = document.getElementById('prize-status');
//     const prizeBox = document.getElementById('prize-box');
//     const message = document.getElementById('message');
//     const prizeDisplay = document.getElementById('prize-display');
//     const claimButton = document.getElementById('claim-button');

//     if (!userId) {
//         prizeStatus.innerHTML = '<p class="error">Invalid access. Please use the link provided by the bot.</p>';
//         return;
//     }

//     try {
//         const response = await fetch('/api/check-click', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ userId })
//         });

//         const data = await response.json();

//         if (data.success) {
//             prizeStatus.style.display = 'none';
//             prizeBox.style.display = 'block';
//             message.innerHTML = 'Congratulations! You\'ve won a Maestro Mystery Box prize!';
//             prizeDisplay.innerHTML = `Your unique prize code: ${data.prizeCode}`;
//             claimButton.style.display = 'block';
//         } else {
//             prizeStatus.innerHTML = `<p class="error">${data.message}</p>`;
//         }
//     } catch (error) {
//         prizeStatus.innerHTML = '<p class="error">Something went wrong. Please try again later.</p>';
//         console.error('Error:', error);
//     }
// });



function getRandomPrize() {
    const prizes = [
        "1 day",
        "2 days",
        "3 days",
        "4 days",
        "5 days",
        "6 days",
        "7 days",
        "8 days",
        "9 days",
        "10 days",
        "11 days",
        "12 days",
        "13 days",
        "14 days",
        "15 days",
        "16 days",
        "17 days",
        "18 days",
        "19 days",
        "20 days",
        "21 days",
        "22 days",
        "23 days",
        "24 days",
        "25 days",
        "26 days",
        "27 days",
        "28 days",
        "29 days",
        "30 days",
        "31 days",
        "1 month",
        "2 months",
        "3 months",
        "4 months",
        "5 months",
        "6 months",
        "7 months",
        "8 months",
        "9 months",
        "10 months",
        "11 months",
        "12 months",
    
    ];
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    document.getElementById("prize").textContent = randomPrize;
  }
  
  window.onload = getRandomPrize;
