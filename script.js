document.addEventListener('DOMContentLoaded', async () => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    const arObject = document.getElementById('ar-object');

    // Zugriff auf die Kamera
    navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;
        });

    // TensorFlow.js Modell laden
    const model = await cocoSsd.load();

    // Objekterkennung starten
    setInterval(async () => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const predictions = await model.detect(canvas);

        // Überprüfen, ob ein Objekt erkannt wurde
        if (predictions.length > 0) {
            arObject.setAttribute('visible', true);
        } else {
            arObject.setAttribute('visible', false);
        }
    }, 100);
});
