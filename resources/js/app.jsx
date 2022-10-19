import './bootstrap';
import '../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import {createTheme, ThemeProvider} from "@mui/material";

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#791313',
        },
        secondary: {
            main: '#f50057',
        },
        error: {
            main: '#ff1000',
        },
        grey: {
            main: '#999999'
        }
    },
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider theme={theme}>
                <App {...props} />
            </ThemeProvider>
        );
    },
});

InertiaProgress.init({ color: '#4B5563' });
