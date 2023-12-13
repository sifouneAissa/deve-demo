import React, {useEffect,useState } from 'react';
import {Space, Table, Tag, Modal, Button, Form} from 'antd';
import {Inertia} from "@inertiajs/inertia";
const { Column, ColumnGroup } = Table;

const data = [
    {
        key: '1',
        firstName: 'John',
        lastName: 'Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        firstName: 'Jim',
        lastName: 'Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        firstName: 'Joe',
        lastName: 'Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];


export default function Users() {


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
        axios.get('/user')
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

    function deleteUser(item){
            axios.delete(`/user/${item.key}`)
                .then(response => {
                    console.log('User deleted:', item);
                    // After successful deletion, fetch updated data
                    fetchData();
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                });
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
                axios.get(`/user?page=${pagination.current}`)
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
                            <a onClick={() => deleteUser(record)}>Delete</a>
                        </Space>
                    )}
                />
            </Table>
        </>
    );
}



