import React from 'react';
import Header from '../components/Header';
import Content from '../components/Content';
import axios from 'axios';

class Dashboard extends React.Component {

    componentDidMount() {
        axios.get("http://localhost:3001/admin/checkExpiredToken", {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                localStorage.removeItem('token');
                window.location.href = '/';
            })
    }

    render() {
        return (
            <div>
                <Header />
                <Content />
            </div>
        )
    }
}

export default Dashboard;