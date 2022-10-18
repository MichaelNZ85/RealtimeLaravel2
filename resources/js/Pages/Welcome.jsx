import React from 'react';
import { Link, Head } from '@inertiajs/inertia-react';
import GuestLayout from '../Layouts/GuestLayout';
import {Container, Typography} from "@mui/material";

export default function Welcome(props) {
    return (
        <><GuestLayout>
            <Container maxWidth="md">
                <Typography variant="h2" component="span">Giggity giggity goo!</Typography>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
            </Container>
        </GuestLayout></>
    );
}
