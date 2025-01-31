document.getElementById('generate-btn').addEventListener('click', () => {
    const text = document.getElementById('text-input').value;
    const canvas = document.getElementById('qr-code');
    const downloadButtons = document.getElementById('download-buttons');
    const foregroundColor = document.getElementById('foreground-color').value;
    const backgroundColor = document.getElementById('background-color').value;

    if (text) {
        // First, draw the basic QR code
        QRCode.toCanvas(canvas, text, {
            color: {
                dark: foregroundColor,
                light: backgroundColor
            }
        }, function (error) {
            if (error) {
                console.error(error);
                return;
            }

            console.log('QR code generated!');
            downloadButtons.classList.remove('hidden'); // Show download buttons
        });
    }
});

// Download QR Code as SVG
document.getElementById('download-svg').addEventListener('click', () => {
    const text = document.getElementById('text-input').value;
    const foregroundColor = document.getElementById('foreground-color').value;
    const backgroundColor = document.getElementById('background-color').value;

    const options = {
        color: {
            dark: foregroundColor,
            light: backgroundColor
        }
    };

    if (text) {
        QRCode.toString(text, { type: 'svg', color: options.color }, function (error, svg) {
            if (error) {
                console.error(error);
                return;
            }
            const blob = new Blob([svg], { type: 'image/svg+xml' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'qrcode.svg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        });
    }
});

// Download QR Code as PNG
document.getElementById('download-png').addEventListener('click', () => {
    const canvas = document.getElementById('qr-code');
    canvas.toBlob(function (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'qrcode.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 'image/png');
});

// scan qr
document.addEventListener("DOMContentLoaded", function () {
    const scanBtn = document.getElementById("scan-qr-btn");
    const qrReader = document.getElementById("qr-reader");
    const resultDisplay = document.getElementById("qr-result");

    let scannerActive = false;

    scanBtn.addEventListener("click", function () {
        if (!scannerActive) {
            qrReader.style.display = "block"; // Show QR Scanner
            startScanner();
            scanBtn.textContent = "Stop Scanner";
        } else {
            stopScanner();
            scanBtn.textContent = "Scan QR Code";
        }
        scannerActive = !scannerActive;
    });

    function startScanner() {
        const html5QrCode = new Html5Qrcode("qr-reader");

        html5QrCode.start(
            { facingMode: "environment" }, // Use back camera
            {
                fps: 10,    // Frames per second
                qrbox: 250, // Scanner size
            },
            (decodedText) => {
                resultDisplay.innerHTML = `<strong>Scanned Result:</strong> ${decodedText}`;
                html5QrCode.stop(); // Stop scanning
                scannerActive = false;
                scanBtn.textContent = "Scan QR Code";
                qrReader.style.display = "none";
            },
            (errorMessage) => {
                console.warn(errorMessage); // Log errors if needed
            }
        ).catch((err) => {
            console.error("Error starting scanner:", err);
        });
    }

    function stopScanner() {
        Html5Qrcode.getCameras().then((cameras) => {
            if (cameras.length > 0) {
                const html5QrCode = new Html5Qrcode("qr-reader");
                html5QrCode.stop();
                qrReader.style.display = "none";
            }
        }).catch((err) => {
            console.error("Error stopping scanner:", err);
        });
    }
});

// upload qr to scan it
document.getElementById("qr-file").addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const html5QrCode = new Html5Qrcode("qr-reader");
    html5QrCode.scanFile(file, true)
        .then(decodedText => {
            document.getElementById("qr-result").innerHTML = `<strong>Scanned Result:</strong> ${decodedText}`;
        })
        .catch(err => console.error("QR Code not found", err));
});
