import React, {useEffect} from 'react';
import { Link } from '@inertiajs/inertia-react';
import GuestLayout from '../Layouts/GuestLayout';
import {Box, Container, Typography} from "@mui/material";
import {isEmpty} from "lodash";
import {Inertia} from "@inertiajs/inertia";

export default function Welcome(props) {
    const {auth: {user: userObj}}  =props;

    useEffect(() => {
        if (!isEmpty(userObj)) {
            Inertia.visit('/dashboard');
        }
    }, [userObj]);

    return (
        <><GuestLayout>
            <Container maxWidth="md">
                <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
                    <Typography variant="h4" component="span">Giggity giggity goo!</Typography>
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
                        {isEmpty(userObj) &&
                            <><Link href="/login">Login</Link>
                                <Link href="/register">Register</Link></>
                        }
                        {!isEmpty(userObj) &&
                            <Link href="/dashboard">Go to dashboard</Link>
                        }
                    </Box>
                </Box>
            </Container>
        </GuestLayout></>
    );
}
