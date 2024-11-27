// script.js

document.querySelectorAll(".tab-link").forEach((tabLink) => {
    tabLink.addEventListener("click", function() {
        // Remove active class from all tabs and contents
        document.querySelectorAll(".tab-link").forEach((link) => link.classList.remove("active"));
        document.querySelectorAll(".tab-content").forEach((content) => content.classList.remove("active"));
        
        // Add active class to clicked tab and corresponding content
        tabLink.classList.add("active");
        const contentId = tabLink.getAttribute("data-tab");
        document.getElementById(contentId).classList.add("active");
    });
});
document.getElementById("accessButton").addEventListener("click", async () => {
    try {
        // Request camera and microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        
        // Assign the stream to the video element
        const videoElement = document.getElementById("videoElement");
        videoElement.srcObject = stream;

        // Optional: handle the stream if you need audio processing
        // const audioTracks = stream.getAudioTracks();
        // (Further audio processing code if needed)

    } catch (error) {
        console.error("Error accessing media devices.", error);
        alert("Unable to access camera and microphone. Please check your permissions.");
    }
});