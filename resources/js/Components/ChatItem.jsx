import React, {useMemo} from 'react';
import {Box} from "@mui/material";
import {makeStyles, createStyles, useTheme} from '@mui/styles';
import {DateTime} from 'luxon';
import {isEmpty} from "lodash";

const useStyles = makeStyles((theme) =>
    createStyles({
            wrapper: {
                width: '100%',
                display: 'flex',
                flexDirection: 'row',
                marginTop: theme.spacing(1.5),
                marginBottom: theme.spacing(1.5),
                marginRight: theme.spacing
            },
            chatItem: {
                maxWidth: '50%',
                padding: theme.spacing(1.2),
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                color: '#fff',
                borderRadius: '10px'

            },
            userName: {
                fontWeight: 'bold',
                fontSize: '1rem'

            },
            time: {
                fontSize: '0.8rem',
                fontStyle: 'italic'
            }
        }
    ));

const ChatItem = ({messageObj, isMe, isGreeting}) => {
    const classes  =useStyles();
    const theme = useTheme();

    const displayTimestamp = useMemo(() =>{
        const timestamp = messageObj?.timestamp;
        if (isEmpty(timestamp)) {
            return null;
        }
        let timeObj;
        if (typeof timestamp === 'string') {
            timeObj = DateTime.fromISO(timestamp);
        } else {
            timeObj = DateTime.fromISO(timestamp.toISOString());
        }
        return timeObj.toLocaleString(DateTime.TIME_24_SIMPLE)
    }, [messageObj.timestamp]);

    if (isGreeting) {
        return (
            <Box className={classes.wrapper} sx={{justifyContent: isMe ? 'flex-end' : 'flex-start'}}>
                <Box className={classes.chatItem} sx={{backgroundColor: isMe ? '#595858' : theme.palette.primary.main}}>
                    <span className={classes.userName}>{messageObj.userName} just poked you!</span>
                </Box>
            </Box>
        );
    }

    return (
        <Box className={classes.wrapper} sx={{justifyContent: isMe ? 'flex-end' : 'flex-start'}}>
            <Box className={classes.chatItem} sx={{backgroundColor: isMe ? '#595858' : theme.palette.primary.main}}>
                {!isMe && <span className={classes.userName}>{messageObj.userName}</span>}
            <span>{messageObj.message}</span>
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', width: '100%', paddingTop: 0.3}}>
                <span className={classes.time}>{displayTimestamp}</span>
            </Box>
        </Box>
        </Box>
    )
};

export default ChatItem;
