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
import {useEffectOnce} from "react-use";
import axios from 'axios';
import ChatItem from "@/Components/ChatItem";

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
        },
        link: {
            cursor: 'pointer'
        }

    })
);

const ShowChatPage = (props) => {
    const {
        auth: {
            user: {
                id: userId,
            }
        }
    } = props;
    const classes = useStyles();
    const [enteredMessage, setEnteredMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffectOnce(() => {
        window.Echo.join('chat')
            .here((users) =>{  //executed every time users first connects, e.g. on page refresh
                console.log("First connection! Users are ", users);
                setUsers(users);
            })
            .joining((user) => { // executed
                console.log("Someone is joining the channel: ", user);
                setUsers((users) =>[...users, user]);
            })
            .leaving((user) => { //executed
                console.log("Someone is leaving the channel: ", user);
                setUsers((users) => users.filter((u) => u.id !== user.id));
            })
            .listen('MessageSent', (e) =>{
                console.log("Received message! ", e.message)
                // debugger;
                setMessages((messages) =>
                    [
                        ...messages,
                        {message: e.message,
                            userId: e.user.id,
                            userName: e.user.name,
                            timestamp: new Date(e.timestamp)
                        }
                    ])
            })
        ;

    });

    // useEffectOnce(() => {
    //     window.Echo.private(`chat.greet.${userId}`)
    //         .listen('GreetingSent', (e) => {
    //             setMessages((messages) => [...messages, {message: e.message, timestamp: e.timestamp, isGreeting: true}]);
    //         })
    // })

    const sendMessage = (e) => {
        e.preventDefault();
        // console.log(enteredMessage);
        // debugger;
        axios.post('/chat/message', {message: enteredMessage})
            .then((res) => {
                // console.log(res);
                setEnteredMessage('');
            })
            .catch(e => {
                console.error(e.message);
            })

    }

    const greetUser = (userId) => {
        axios.post(`/chat/greet/${userId}`).then(() => {}).catch((e) => console.error(e.message));
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
                                        {messages.map(m => (
                                           <ChatItem messageObj={m} isMe={userId === m.userId} />
                                        ))}
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
                                            <li className={user.id !== userId ? classes.link : ''} onClick={() => greetUser(user.id)}>{user.name}</li>
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
