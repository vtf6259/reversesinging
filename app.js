if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
}

function sleep(ms) {
  setTimeout(null, ms)
}
const audioCtx = new AudioContext();
if (navigator.mediaDevices) {
  navigator.mediaDevices.getUserMedia({"audio": true}).then((stream) => {
    const stopButton = document.getElementById("stop")
    const startButton = document.getElementById("start")
    const recordingtext = document.getElementById("recordingtext")
    const blobLink = document.getElementById("bloblink")
    const mediaRecorder = new MediaRecorder(stream);
    let chunks = [];
    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
    mediaRecorder.onstop = (e) => {
      //const audio = document.createElement("audio")
      const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" })
      chunks = []
      const audioURL = window.URL.createObjectURL(blob)
      console.log(audioURL)
      blobLink.href = audioURL
      //window.open(audioURL, '_blank').focus()
      
      //audio.src = audioURL;

  };
    startButton.addEventListener("click", (event)=> {
      mediaRecorder.start()
      startButton.disabled = true
      stopButton.disabled = false
      recordingtext.innerText = "Recording"
    })
    stopButton.addEventListener("click", (event)=> {
      mediaRecorder.stop()
      startButton.disabled = false
      stopButton.disabled = true
      recordingtext.innerText = "Not recording"
    })
    
  }).catch((err) => {
    // browser unable to access microphone
    // (check to see if microphone is attached)
    alert("Unable to get microphone")
  });
} else {
  // browser unable to access media devices
  // (update your browser)
  window.location.replace("/update.html")
}
