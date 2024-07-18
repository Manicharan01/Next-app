import { Button, Typography, Card, TextField } from '@mui/material';
import { useRouter } from 'next/router';

export default function Appbar({ }) {
    const router = useRouter();
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
        }}>
            <Typography variant="h5">Coursera</Typography>
            <div style={{
                display: 'flex',
                gap: '10px',
            }}>
                <Button variant="contained" onClick={
                    () => {
                        router.push('/signup');
                    }
                }>Sign Up</Button>
                <Button variant="contained">Log In</Button>
            </div>
        </div>
    )
};
