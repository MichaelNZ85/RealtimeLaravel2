import React from 'react';
import { Link } from '@inertiajs/inertia-react';
import GuestLayout from '../Layouts/GuestLayout';
import {Box, Container, Typography} from "@mui/material";

export default function Welcome() {
    return (
        <><GuestLayout>
            <Container maxWidth="md">
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                    <Typography variant="h4" component="span">Giggity giggity goo!</Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
                        <Link href="/login">Login</Link>
                        <Link href="/register">Register</Link>
                    </Box>
                </Box>
            </Container>
        </GuestLayout></>
    );
}
