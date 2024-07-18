import { Button, TextField, Card, Typography } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '@/config'
import { useRouter } from 'next/router';
import { useState } from 'react';
import { adminState } from '../store/atoms/admin'
import { useRecoilState } from 'recoil';

export default function SignUp() {
    const router = useRouter();
    const [admins, setAdmin] = useRecoilState(adminState)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div>
            < div style={{
                paddingTop: '150px',
                marginBottom: '10px',
                display: 'flex',
                justifyContent: 'center',
            }} >
                <Typography variant={"h6"}>
                    Welcome to Coursera. Signup below!
                </Typography>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <Card variant="outlined" style={{
                    width: '400px',
                    padding: '20px',
                }}>
                    <TextField
                        fullWidth={true}
                        type="text"
                        label="Username"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                    <br /><br />
                    <TextField
                        fullWidth={true}
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                    <br /><br />
                    <Button
                        size={"large"}
                        variant="contained"
                        onClick={
                            async () => {
                                await fetch(`${BASE_URL}/api/routes/admin/signup`, {
                                    method: 'POST',
                                    body: JSON.stringify({
                                        username,
                                        password,
                                    }),
                                    headers: {
                                        "content-Type": "application/json",
                                    },
                                }).then((response) => {
                                    response.json().then((text) => {
                                        localStorage.setItem('token', text.token);
                                        alert(text.message)
                                        setAdmin([...admins, { username: username, password: password }])
                                        router.push('/courses');
                                    })
                                });
                            }
                        }
                    >Sign Up</Button>
                </Card>
            </div>
        </div>
    )
};
