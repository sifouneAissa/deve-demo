import { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import {Button, Card, Form, Input, Typography, Checkbox, Space, DatePicker, message as antdMessage} from 'antd';
import {Inertia} from "@inertiajs/inertia";

function Create(props) {


    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        birth : ''
    });

    useEffect(() => {

        return () => {
            reset('password', 'password_confirmation');
        };
    },  []);

    const submit = () => {

        post(route('user.store'),{
            onError (){
                antdMessage.error("Error occurred");
            },
            onSuccess () {
                antdMessage.success("User Created");
                Inertia.visit(route('user.index'));
            }
        });


    };

    return (
        <>
            <Head title="Add User" />

            <Card className='auth-card '>

                <Typography.Title style={{ fontWeight: 400, marginBottom: 30 }} level={4}>Laravel Inertia React App</Typography.Title>

                <Form
                    name="basic"
                    layout='vertical'
                    initialValues={data}
                    onFieldsChange={(changedFields) => {
                        changedFields.forEach(item => {
                            setData(item.name[0], item.value);
                        })
                    }}
                    onFinish={submit}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        validateStatus={errors.name && 'error'}
                        help={errors.name}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        validateStatus={errors.email && 'error'}
                        help={errors.email}
                    >
                        <Input type='email' />
                    </Form.Item>

                    <Form.Item
                        label="Birth Date"
                        name="birth"
                        validateStatus={errors.birth && 'error'}
                        help={errors.birth}
                        >
                        <DatePicker  />
                    </Form.Item>


                    <Form.Item
                        label="Password"
                        name="password"
                        validateStatus={errors.password && 'error'}
                        help={errors.password}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="password_confirmation"
                        validateStatus={errors.password_confirmation && 'error'}
                        help={errors.password_confirmation}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Space size={16}>
                        <Button type="primary" htmlType="submit" loading={processing}>
                            Submit
                        </Button>
                    </Space>
                </Form>
            </Card>
        </>
    );
}

Create.layout = page => <AuthenticatedLayout children={page} />

export default Create;

