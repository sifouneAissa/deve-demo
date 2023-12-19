import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, } from '@inertiajs/inertia-react';
import {Card, Typography, message as antdMessage, Button} from 'antd';
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
            <Head title="Users index" />
            <Users key="users" />
        </>
    );
}

Dashboard.layout = page => <AuthenticatedLayout children={page} />

export default Dashboard;
