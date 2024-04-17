let lastRotationDegree = 0;  // Global variable to store the last used rotation degree

document.getElementById('rolling-dice').addEventListener('click', function() {
    // Play the dice roll sound
    const audio = document.getElementById('dice-roll-audio');
    audio.currentTime = 0;  // Rewind to the start if already playing
    audio.play();

    // Calculate a random rotation degree between -10 and 10
    lastRotationDegree = Math.floor(Math.random() * 41) - 20;

    // Hide all sides and show the rolling dice GIF with rotation
    hideAllSides();
    const diceGif = document.getElementById('dice-gif');
    diceGif.style.transform = 'rotate(' + lastRotationDegree + 'deg)';
    diceGif.classList.add('active');

    // Simulate rolling for 800 milliseconds
    setTimeout(function() {
        // Hide the GIF after rolling
        diceGif.classList.remove('active');
        diceGif.style.transform = ''; // Reset transform if needed for any reason

        // Generate a random dice roll between 1 and 6
        const result = Math.floor(Math.random() * 6) + 1;

        // Display the corresponding dice side with the same rotation
        showSide(result);
        console.log("Dice rolled: " + result); // Optional: Output the result to the console
    }, 800); // Rolling duration in milliseconds
});

function hideAllSides() {
    document.querySelectorAll('.side').forEach(img => {
        img.classList.remove('active');
        img.style.transform = ''; // Reset the transform to clear previous rotations
    });
}

function showSide(number) {
    const sideElement = document.getElementById('side' + number);
    sideElement.style.transform = 'rotate(' + lastRotationDegree + 'deg)';
    sideElement.classList.add('active');
}

// Initially show side 1 with no rotation
showSide(1);
