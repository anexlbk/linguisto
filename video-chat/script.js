let localStream;
let remoteStream;
let peerConnection;

const servers = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },  // Free STUN server provided by Google
    ]
};

const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startCallButton = document.getElementById('startCallButton');
const endCallButton = document.getElementById('endCallButton');

startCallButton.addEventListener('click', startCall);
endCallButton.addEventListener('click', endCall);

async function startCall() {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;

        // Create a peer connection
        peerConnection = new RTCPeerConnection(servers);

        // Add local stream tracks to peer connection
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

        // When remote stream is added, show it in remote video
        peerConnection.ontrack = event => {
            if (!remoteStream) {
                remoteStream = new MediaStream();
                remoteVideo.srcObject = remoteStream;
            }
            remoteStream.addTrack(event.track);
        };

        // Handle ICE candidates
        peerConnection.onicecandidate = event => {
            if (event.candidate) {
                // Send ICE candidate to the remote peer (handled by your signaling server)
                console.log('New ICE candidate:', event.candidate);
            }
        };

        // Create offer and set local description
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        console.log('Offer created:', offer);

        // Here you'd send the offer to the remote peer using your signaling server
    } catch (error) {
        console.error('Error accessing media devices.', error);
    }
}

function endCall() {
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
        localVideo.srcObject = null;
        remoteVideo.srcObject = null;
    }
}
