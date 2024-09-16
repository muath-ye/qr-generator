document.getElementById('generate-btn').addEventListener('click', () => {
    const text = document.getElementById('text-input').value;
    const canvas = document.getElementById('qr-code');
    if (text) {
        QRCode.toCanvas(canvas, text, function (error) {
            if (error) console.error(error);
            console.log('QR code generated!');
        });
    }
});

// Add QRCode library
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js';
document.body.appendChild(script);

// Register the Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('Service Worker registered:', registration))
            .catch(error => console.log('Service Worker registration failed:', error));
    });
}
