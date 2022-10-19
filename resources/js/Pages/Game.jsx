import React, {useState} from 'react';
import {makeStyles, createStyles} from '@mui/styles';
import {Box, Card, CardContent, Container, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import AuthenticatedLayout from "../Layouts/AuthenticatedLayout";
import {range} from "lodash";

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
                fontSize: '2rem'
            }
        }
    ));


const GamePage = (props) => {
    const classes = useStyles();
    const [selectedBet, setSelectedBet] = useState(null);
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
                            <img src='img/circle.png' alt="" height="250" width="250"/>
                            <Typography variant="body1"></Typography>
                            <hr className={classes.hr} />
                            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 2}}>
                                <InputLabel>Your Bet</InputLabel>
                                <Select value={selectedBet}  onChange={(e) => setSelectedBet(e.target.value)} label="Not in">
                                    {range(1, 12).map((num) => (
                                        <MenuItem value={num}>{num}</MenuItem>
                                    ))}
                                </Select>
                            </Box>
                            <hr className={classes.hr} />
                            <p className={classes.time}>Remaining Time</p>
                            <hr className={classes.hr} />

                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </AuthenticatedLayout>
    )
};

export default GamePage;
