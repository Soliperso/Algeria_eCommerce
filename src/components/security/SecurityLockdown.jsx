import React from 'react';
import {
    Box,
    Paper,
    Typography,
    Button,
    Container,
    Alert,
    Stack
} from '@mui/material';
import { Block, Security } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SecurityLockdown = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md" sx={{ mt: 8 }}>
            <Paper
                elevation={6}
                sx={{
                    p: 6,
                    textAlign: 'center',
                    background: 'linear-gradient(135deg, #ff1744 0%, #d32f2f 100%)',
                    color: 'white'
                }}
            >
                <Block sx={{ fontSize: 80, mb: 3, animation: 'pulse 2s infinite' }} />

                <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                    🚨 SECURITY LOCKDOWN ACTIVE
                </Typography>

                <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
                    Potential Security Breach Detected
                </Typography>

                <Alert
                    severity="error"
                    sx={{
                        my: 4,
                        fontSize: '1.1rem',
                        '& .MuiAlert-message': { fontWeight: 'bold' }
                    }}
                >
                    ALL ADMINISTRATIVE ACCESS HAS BEEN SUSPENDED
                </Alert>

                <Stack spacing={2} sx={{ mb: 4, textAlign: 'left', maxWidth: 600, mx: 'auto' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Security Measures Activated:
                    </Typography>
                    <Typography variant="body1">
                        🔒 All admin routes are blocked and inaccessible
                    </Typography>
                    <Typography variant="body1">
                        🔑 Admin access keys have been revoked and disabled
                    </Typography>
                    <Typography variant="body1">
                        🛡️ User management functions are locked down
                    </Typography>
                    <Typography variant="body1">
                        📊 Analytics and sensitive data access suspended
                    </Typography>
                    <Typography variant="body1">
                        🚫 All administrative privileges temporarily suspended
                    </Typography>
                </Stack>

                <Typography variant="h6" gutterBottom sx={{ color: 'warning.light', mb: 3 }}>
                    If you are an authorized administrator:
                </Typography>

                <Stack spacing={2} sx={{ mb: 4 }}>
                    <Typography variant="body1">
                        1. Contact the system security officer immediately
                    </Typography>
                    <Typography variant="body1">
                        2. Verify your identity through secure channels
                    </Typography>
                    <Typography variant="body1">
                        3. Request emergency access restoration if needed
                    </Typography>
                </Stack>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                    <Button
                        variant="contained"
                        color="warning"
                        size="large"
                        onClick={() => navigate('/')}
                        sx={{
                            fontWeight: 'bold',
                            minWidth: 200,
                            py: 1.5
                        }}
                    >
                        RETURN TO SAFE AREA
                    </Button>
                </Box>

                <Typography variant="caption" sx={{ mt: 4, display: 'block', opacity: 0.8 }}>
                    Security Incident ID: {Date.now().toString(36).toUpperCase()}
                </Typography>
            </Paper>
        </Container>
    );
};

export default SecurityLockdown;
