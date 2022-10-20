import React, {useState, useEffect} from 'react';
import {makeStyles, createStyles} from '@mui/styles';
import {Box, Card, CardContent, Container, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import AuthenticatedLayout from "../Layouts/AuthenticatedLayout";
import {range} from "lodash";
import './Game.css';

const useStyles = makeStyles((theme) =>
    createStyles({
            heada: {
                color: theme.palette.primary.main,
                fontWeight: 'bold'
            },
            card: {
                marginTop: theme.spacing(2.5),
            },
            hr: {
                color: theme.palette.grey.main,
                background: theme.palette.grey.main,
                borderColor: theme.palette.grey.main,
                height: '1px',
                width: '100%',
                opacity: 0.5
            },
            time: {
                color: theme.palette.primary.main,
                fontSize: '1rem'
            },
            lose: {
                color: theme.palette.error.main,

            },
            win: {
                color: '#1f6b1f',
                fontSize: '1.5rem'
            }
        }
    ));


const GamePage = (props) => {
    const classes = useStyles();
    const [selectedBet, setSelectedBet] = useState(0);
    const [timer, setTimer] = useState(15);
    const [isSpinning, setIsSpinning] = useState(false);
    const [winningNumber, setWinningNumber] = useState(0);
    const [hasResult, setHasResult] = useState(false);
    const [didWin, setDidWin] = useState(null);

    useEffect(() => {
        window.Echo.channel('game')
            .listen('RemainingTimeChanged', (e) => {
                setHasResult(false);
                setDidWin(null);
                setTimer(e.time);
                setIsSpinning(true);
                setWinningNumber(0);
            })
            .listen('WinningNumberGenerated', (e) => {
                setIsSpinning(false);
                setWinningNumber(e.number);
                setHasResult(true);
                debugger;
                if (selectedBet === e.number) {
                    setDidWin(true)
                } else {
                    setDidWin(false);
                }
            })
    },[]);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className={classes.heada}>Dashboard</h2>}
        >
            <Container maxWidth="sm">
                <Card className={classes.card}>
                    <CardContent>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center'}}>
                            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                                <Typography variant="h4">Game</Typography>
                            </Box>
                            <img src='img/circle.png' className={isSpinning ? 'refresh' : ''} alt="" height="250" width="250"/>
                            {hasResult && winningNumber !== 0 &&
                                <Typography variant="h5">{winningNumber}</Typography>}
                            <hr className={classes.hr}/>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: 2
                            }}>
                                <InputLabel>Your Bet</InputLabel>
                                <Select value={selectedBet} onChange={(e) => setSelectedBet(e.target.value)}
                                        label="Not in">
                                    {range(1, 12).map((num) => (
                                        <MenuItem value={num}>{num}</MenuItem>
                                    ))}
                                </Select>
                            </Box>
                            <p>Your bet is {selectedBet}</p>
                            <hr className={classes.hr}/>
                            <p className={classes.time}>Remaining Time</p>
                            {timer}
                            <hr className={classes.hr}/>
                            {hasResult &&
                                <p className={didWin ? classes.win : classes.lose}>
                                    {didWin ? 'You won!' : 'You lost. Better luck next time!'}
                                </p>
                            }
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </AuthenticatedLayout>
    )
};

export default GamePage;
