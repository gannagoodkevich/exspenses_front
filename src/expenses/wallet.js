import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import {useState} from "react";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});


export default function WalletCard() {
    const classes = useStyles();
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState(0);
    const [status, setStatus] = useState('active');


    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    axios.get('http://localhost:3001/wallets/60d2327dc372c36452292c88')
        .then(response => {
            setAmount(response.data.amount);
            setCurrency(getKeyByValue(response.data.currency, true));
            if (!response.data.active){
                setStatus('not active')
            }
        })
        .catch(error => console.log(error))

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {amount} {currency}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {status}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}
