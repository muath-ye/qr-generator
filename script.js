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
