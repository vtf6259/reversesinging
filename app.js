const audioCtx = new AudioContext();
if (navigator.mediaDevices) {
  navigator.mediaDevices.getUserMedia({"audio": true}).then((stream) => {
    const microphone = audioCtx.createMediaStreamSource(stream);
    // `microphone` can now act like any other AudioNode
    console.log(microphone)
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
