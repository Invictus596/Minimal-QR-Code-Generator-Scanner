import React, { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';
import { Box, Typography, Paper } from '@mui/material';

const QRCodeReader: React.FC = () => {
    const [result, setResult] = useState<string | null>(null);

    const handleScan = (data: any) => {
        if (data) {
            setResult(data);
        }
    };

    const handleError = (err: any) => {
        console.error(err);
    };

    return (
        <Box>
            <Typography variant="h2" gutterBottom>
                QR Code Reader
            </Typography>
            <Paper variant="outlined" sx={{ p: 2 }}>
                <Scanner
                    onScan={handleScan}
                    onError={handleError}
                />
            </Paper>
            {result && (
                <Box mt={2}>
                    <Typography variant="h6">Scanned Result:</Typography>
                    <Typography variant="body1">{result}</Typography>
                </Box>
            )}
        </Box>
    );
};

export default QRCodeReader;
