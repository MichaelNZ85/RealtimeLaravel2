import React, {useEffect, useState} from 'react';
import {Card, Typography} from "@mui/material";
import axios from 'axios';
import {isEmpty} from 'lodash';

const UsersPage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('/api/users')
            .then((response) => {
                setUsers(response.data);
            })
    }, []);

    useEffect(() => {
        window.Echo.channel('users')
            .listen('UserCreated', (e) => {
                setUsers(users => [...users, e.user]);
            })
    }, [])

    return (
        <Card>
            <Typography variant="h4">Users</Typography>
            <ul>
                {!isEmpty(users) && users.map((user) => (
                    <li>{user.name }</li>
                ))}
            </ul>
        </Card>
    )
};

export default UsersPage;
