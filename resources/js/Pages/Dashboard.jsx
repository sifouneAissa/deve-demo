import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head,Link } from '@inertiajs/inertia-react';
import {Card, Typography, message as antdMessage, Button} from 'antd';
import Users from "@/Pages/Dash/Users";
import React, {useEffect, useState} from 'react';

function Dashboard(props) {


    const [usersCount, setUsersCount] = useState([]);

    function fetchData() {
        axios.get('/cusers')
            .then(response => {
                setUsersCount(response.data);
                // print("check");
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    useEffect(() => {
        if (props.message) {
            // Display message as a toast
            antdMessage.success(props.message);
        }
        fetchData();

    }, [props.message]);

    return (
        <>
            <Head title="Dashboard" />
            <Card title={`Welcome, ${props.auth.user.name}`}>
                <Typography.Text>You're logged in!</Typography.Text>

                <Card title={`Number of users`} className="mt-5">
                    <Typography.Text style={{ fontSize: '20px' }} strong={true}>{usersCount} </Typography.Text>
                       Users
                </Card>
            </Card>
        </>
    );
}

Dashboard.layout = page => <AuthenticatedLayout children={page} />

export default Dashboard;
