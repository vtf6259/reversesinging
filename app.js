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
    let audioblob = ""
    const playButton = document.getElementById("play")
    const mediaRecorder = new MediaRecorder(stream);
    let chunks = [];
    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };
    mediaRecorder.onstop = (e) => {

      const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" })
      chunks = []
      const audioURL = window.URL.createObjectURL(blob)
      console.log(audioURL)
      audioblob = audioURL

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
    playButton.addEventListener("click", async (event) =>{
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const resp = await fetch(audioblob);
      const arrayBuffer = await resp.arrayBuffer();
      const audioBuf = await ctx.decodeAudioData(arrayBuffer);

      // reverse each channel in-place
      for (let c = 0; c < audioBuf.numberOfChannels; c++) {
        const channel = audioBuf.getChannelData(c);
        for (let i = 0, j = channel.length - 1; i < j; i++, j--) {
          const t = channel[i];
          channel[i] = channel[j];
          channel[j] = t;
        }
      }
    
      const voice = ctx.createBufferSource();
      voice.buffer = audioBuf;
      voice.connect(ctx.destination);
      voice.start()
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
