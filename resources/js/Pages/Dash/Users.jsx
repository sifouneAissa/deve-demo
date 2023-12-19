import React, {useEffect,useState } from 'react';
import {Space, Table, Tag, Modal, Button, Form, message as antdMessage} from 'antd';
import {Inertia} from "@inertiajs/inertia";
const { Column, ColumnGroup } = Table;

export default function Users() {


    const [modal, contextHolder] = Modal.useModal();
    const [paginationInfo, setPaginationInfo] = useState({});
    const [userData, setUserData] = useState([]);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [deleteRecord, setDeleteRecord] = useState(null);

    function setUpUserData(data){
        let d = data.data;
        let list = [];

        d.map((item) => {
            list.push({
                'key' : item.id,
                'name' : item.name,
                'email' : item.email,
                'age' : item.age,
            });
        });

        return list;
    }

    useEffect(() => {
        fetchData();
    }, []); // Run this effect only once, similar to componentDidMount in class components

    function fetchData() {
        axios.get('/users')
            .then(response => {
                setPaginationInfo({
                    current: response.data.current_page,
                    pageSize: response.data.per_page,
                    total: response.data.total,
                    showSizeChanger: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                });

                setUserData(setUpUserData(response.data)); // Set fetched data to state
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    async function deleteUser(item) {

        const confirmed = await modal.confirm({title: 'Are you sure?'});
        if(confirmed) {

            axios.delete(`/user/${item.key}`)
                .then(response => {
                    console.log('User deleted:', item);
                    fetchData();
                    antdMessage.success("User Deleted");
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                    antdMessage.success("Error occurred");
                });
        }
    }
    const handleButtonClick = () => {
        Inertia.visit(route('user.create'));
    };
    return (
        <>

            <Space size={20} className="float-right mt-5" >
                <Button type="primary"  onClick={handleButtonClick} >
                    Add User
                </Button>
            </Space>
            <Table
            dataSource={userData}
            pagination={paginationInfo}
            onChange={(pagination) => {
                // Handle pagination change, for example, fetch new data for the next page
                axios.get(`/users?page=${pagination.current}`)
                    .then(response => {

                        setPaginationInfo({
                            current: response.data.current_page,
                            pageSize: response.data.per_page,
                            total: response.data.total,
                            showSizeChanger: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        });

                        setUserData(setUpUserData(response.data)); // Set fetched data to state
                    })
                    .catch(error => {
                        console.error('Error fetching data:', error);
                    });
            }}
                >
                <Column title="Name" dataIndex="name"  />
                <Column title="Email" dataIndex="email"  />
                <Column title="Age (Years)" dataIndex="age"  />
                <Column
                    title="Action"
                    render={(_, record) => (
                        <Space size="middle">
                            <a onClick={() => deleteUser(record)} style={{ color: 'red' }}>Delete</a>
                            {contextHolder}
                        </Space>
                    )}
                />
            </Table>
        </>
    );
}



