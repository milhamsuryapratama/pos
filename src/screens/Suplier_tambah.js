import React, { Component, Fragment } from 'react';
import { Form, Container, Button } from 'semantic-ui-react';
import Header from '../components/Header';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Suplier_tambah extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suplier: {
                nama: '',
                alamat: '',
                telepon: ''
            }
        }
    }

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

    handleSuplierData = e => {
        const { suplier } = this.state;
        suplier[e.target.name] = e.target.value;
        this.setState({ suplier });
    }

    simpanDataSuplier = async () => {
        const { suplier } = this.state;
        let post = await axios.post('http://localhost:3001/admin/tambah-suplier', { suplier: suplier }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        let response = await post.data;
        if (response) {
            this.props.history.push("/admin/suplier");
        }
    }

    render() {
        return (
            <Fragment>
                <Header />
                <Container>
                    <h2>Tambah Data Suplier</h2>
                    <Form>
                        <Form.Field>
                            <label>Nama Suplier</label>
                            <input
                                type="text"
                                name="nama"
                                value={this.state.nama}
                                onChange={this.handleSuplierData}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Alamat Suplier</label>
                            <textarea
                                name="alamat"
                                value={this.state.alamat}
                                onChange={this.handleSuplierData}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Telepon Suplier</label>
                            <input
                                type="text"
                                name="telepon"
                                value={this.state.telepon}
                                onChange={this.handleSuplierData}
                            />
                        </Form.Field>
                        <Button type='submit' onClick={this.simpanDataSuplier}>Submit</Button> <Button onClick={() => this.props.history.push("/admin/suplier")}>Cancle</Button>
                    </Form>
                </Container>
            </Fragment>
        );
    }
}

export default withRouter(Suplier_tambah);