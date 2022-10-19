import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head} from '@inertiajs/inertia-react';
import {makeStyles, createStyles} from '@mui/styles';
import {Container, Card, CardContent, Box, Typography} from "@mui/material";

const useStyles = makeStyles((theme) =>
    createStyles({

        }
    ));

export default function Dashboard(props) {
    const classes = useStyles();
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className={classes.heada}>Dashboard</h2>}
        >
            <Head title="Dashboard"/>




        </AuthenticatedLayout>
    );
}
