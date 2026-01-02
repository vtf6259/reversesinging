if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
}

function sleep(ms) {
  setTimeout(null, ms)
}
const audioCtx = new AudioContext();
if (navigator.mediaDevices) {
  navigator.mediaDevices.getUserMedia({"audio": true}).then((stream) => {
    const mediaRecorder = new MediaRecorder(stream);
    let chunks = [];
    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
    mediaRecorder.onstop = (e) => {
      const audio = document.createElement("audio")
      const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
      chunks = [];
      const audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;
  };
    //mediaRecorder.start()
    //await sleep(2000)
    //mediaRecorder.stop()
    
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
