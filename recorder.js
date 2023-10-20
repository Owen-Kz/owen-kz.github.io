// const startRecordButton = document.getElementById('startRecord');
// const stopRecordButton = document.getElementById('stopRecord');
let mediaRecorder;
let recordedChunks = [];

// Request permission to access screen and audio
async function startRecordingLive() {
    const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });

    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        recordedChunks = [];

        // Create a unique filename with the current date
        const currentDate = new Date().toISOString().replace(/[^0-9]/g, '');
        const filename = `asfi_video_record_${currentDate}.webm`;


        // Convert the recorded video to MP4 format
        const videoUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = videoUrl;
        a.download = filename; // Save as MP4
        a.click();
        window.URL.revokeObjectURL(videoUrl);

        // Stop all tracks in the stream
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    };

    mediaRecorder.start();
    // startRecordButton.disabled = true;
    // stopRecordButton.disabled = false;
}

// Stop recording
function stopRecordingLive() {
    mediaRecorder.stop();
    // startRecordButton.disabled = false;
    // stopRecordButton.disabled = true;
}

// startRecordButton.addEventListener('click', startRecording);
// stopRecordButton.addEventListener('click', stopRecording);
