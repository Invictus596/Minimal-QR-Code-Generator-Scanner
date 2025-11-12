import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { TextField, Box, Typography } from '@mui/material';

const QRCodeGenerator: React.FC = () => {
    const [text, setText] = useState('');

    return (
        <Box>
            <Typography variant="h2" gutterBottom>
                QR Code Generator
            </Typography>
            <TextField
                label="Enter text or URL"
                variant="outlined"
                fullWidth
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            {text && (
                <Box mt={4} display="flex" justifyContent="center">
                    <QRCode value={text} size={256} />
                </Box>
            )}
        </Box>
    );
};

export default QRCodeGenerator;
