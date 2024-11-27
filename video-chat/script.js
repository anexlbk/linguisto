let localStream;
let remoteStream;
let peerConnection;
let wsConnection;

const config = {
    wsUrl: window.location.hostname === 'localhost' ? 
           'ws://localhost:8080/ws' : 
           'wss://' + window.location.host + '/ws',
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
    ]
};

function connectWebSocket() {
    wsConnection = new WebSocket(config.wsUrl);
    
    wsConnection.onopen = () => {
        console.log('WebSocket connected');
        updateUIState('connected');
    };

    wsConnection.onclose = () => {
        console.log('WebSocket disconnected');
        updateUIState('disconnected');
        // Attempt to reconnect after 5 seconds
        setTimeout(connectWebSocket, 5000);
    };

    wsConnection.onmessage = async function(event) {
        try {
            const message = JSON.parse(event.data);
            handleSignalingMessage(message);
        } catch (error) {
            console.error('Error handling message:', error);
        }
    };
}

async function startCall() {
    try {
        // Update UI to show loading state
        updateUIState('connecting');
        
        // Request media permissions
        localStream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: true 
        });
        
        localVideo.srcObject = localStream;

        // Create and configure peer connection
        peerConnection = new RTCPeerConnection({ iceServers: config.iceServers });
        
        // Add tracks and set up handlers
        setupPeerConnection();
        
        // Create and send offer
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);
        
        sendSignalingMessage({
            type: 'offer',
            offer: offer
        });

        updateUIState('incall');
    } catch (error) {
        console.error('Error starting call:', error);
        updateUIState('error');
        showError('Could not access camera/microphone. Please check permissions.');
    }
}

function updateUIState(state) {
    const startButton = document.getElementById('startCallButton');
    const endButton = document.getElementById('endCallButton');
    
    switch(state) {
        case 'connecting':
            startButton.disabled = true;
            startButton.textContent = 'Connecting...';
            break;
        case 'incall':
            startButton.style.display = 'none';
            endButton.style.display = 'block';
            break;
        case 'error':
            startButton.disabled = false;
            startButton.textContent = 'Retry Call';
            break;
        default:
            startButton.disabled = false;
            startButton.textContent = 'Start Call';
            endButton.style.display = 'none';
    }
}

const socket = io('/');
const videoGrid = document.getElementById('video-grid');
const myPeer = new Peer();

const myVideo = document.createElement('video');
myVideo.muted = true;

const peers = {};

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(myVideo, stream);

    myPeer.on('call', call => {
        call.answer(stream);
        const video = document.createElement('video');
        call.on('stream', userVideoStream => {
            addVideoStream(video, userVideoStream);
        });
    });

    socket.on('user-connected', userId => {
        connectToNewUser(userId, stream);
    });
});

socket.on('user-disconnected', userId => {
    if (peers[userId]) peers[userId].close();
});

myPeer.on('open', id => {
    socket.emit('join-room', ROOM_ID, id);
});

function connectToNewUser(userId, stream) {
    const call = myPeer.call(userId, stream);
    const video = document.createElement('video');
    
    call.on('stream', userVideoStream => {
        addVideoStream(video, userVideoStream);
    });
    
    call.on('close', () => {
        video.remove();
    });

    peers[userId] = call;
}

function addVideoStream(video, stream) {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
    videoGrid.append(video);
}
