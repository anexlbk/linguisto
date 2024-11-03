
// script.js
window.onload = function() {
    TweenMax.fromTo(".moveFromTop", 1, {y: "-100%", opacity: 0}, {y: "0%", opacity: 1});
};

// Fetch profiles on page load
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/api/profiles')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            // Code to populate profile data on the page
        })
        .catch(error => console.error('Error fetching profiles:', error));
});

// Example function to submit a review
function submitReview(profileId, review) {
    fetch('http://localhost:3000/api/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ profileId, review })
    })
    .then(response => response.text())
    .then(message => console.log(message))
    .catch(error => console.error('Error submitting review:', error));
}
