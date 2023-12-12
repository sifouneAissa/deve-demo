import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, } from '@inertiajs/inertia-react';
import { Card, Typography,message as antdMessage } from 'antd';
import Users from "@/Pages/Dash/Users";
import { useEffect } from 'react';

function Dashboard(props) {
    useEffect(() => {
        if (props.message) {
            // Display message as a toast
            antdMessage.success(props.message);
        }
    }, [props.message]);

    return (
        <>
            <Head title="Dashboard" />
            <Card title={`Welcome, ${props.auth.user.name}`}>
                <Typography.Text>You're logged in!</Typography.Text>
            </Card>
            <Users key="users" />
        </>
    );
}

Dashboard.layout = page => <AuthenticatedLayout children={page} />

export default Dashboard;
