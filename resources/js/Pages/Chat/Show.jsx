import React, {useEffect, useState} from 'react';
import {
    Box, Button,
    Card,
    CardContent,
    Container,
    Grid,

    TextField,
    Typography
} from "@mui/material";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import {createStyles, makeStyles} from "@mui/styles";

const useStyles = makeStyles((theme) =>
    createStyles({
        heada: {
            color: theme.palette.primary.main,
            fontWeight: 'bold'
        },
        card: {
            marginTop: theme.spacing(2.5),
        },
        msgList: {
            overflow: 'auto',
            height: '45vh',
        },
        onlineList: {
            overflow: 'auto',
            height: '45vh',

        },
        usersList: {
            border: `1px solid ${theme.palette.primary.main}`,
            padding: theme.spacing(1),

        },
        onlineTitle: {
            color: theme.palette.primary.main,
            textAlign: 'center',
            fontSize: '1.3rem',
            paddingBottom: 2
        }
        // hr: {
        //     color: theme.palette.grey.main,
        //     background: theme.palette.grey.main,
        //     borderColor: theme.palette.grey.main,
        //     height: '1px',
        //     width: '100%',
        //     opacity: 0.5
        // },
    })
);

const ShowChatPage = (props) => {
    const classes = useStyles();
    const [enteredMessage, setEnteredMessage] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        window.Echo.join('chat')
            .here((users) =>{  //executed every time users first connects, e.g. on page refresh
                console.log("First connection! Users are ", users);
                setUsers(users);
            })
            .joining((user) => { // executed
                console.log("Joining channel. Your user object is ", user);
                setUsers([...users, user]);
            })
            .leaving((user) => { //executed
                console.log("You are the weakest link. Goodbye", user);
                setUsers((users) => users.filter((u) => u.id !== user.id));
            });

    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(message);
        //todo send request here
        setEnteredMessage('');
    }

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className={classes.heada}>Dashboard</h2>}
        >
            <Container maxWidth="lg">
                <Card className={classes.card}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                                    <ul className={classes.msgList}>
                                        <li>Test1: Meow</li>
                                        <li>Test2: Big purrs</li>
                                    </ul>
                                </Box>
                                <form onSubmit={sendMessage}>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12}>
                                            <Box sx={{display: 'flex', flexDirection: 'row', gap: 1}}>
                                                <TextField
                                                    fullWidth
                                                    variant="outlined"
                                                    size="small"
                                                    value={enteredMessage}
                                                    onChange={(e) => setEnteredMessage(e.target.value)}
                                                />
                                                <Button type="submit" variant="contained" onClick={sendMessage}>Send</Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Grid>
                            <Grid item xs={2}>
                                <Box className={classes.usersList}>
                                    <Typography variant="body1" className={classes.onlineTitle}><strong>Online now!</strong></Typography>
                                    <ul className={classes.onlineList}>
                                        {users.map(user => (
                                            <li>{user.name}</li>
                                        ))}
                                    </ul>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Container>
        </AuthenticatedLayout>
    )
};

export default ShowChatPage;
