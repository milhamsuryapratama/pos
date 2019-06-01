import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { Container, Button, Form } from 'semantic-ui-react'
import Header from '../components/Header';

class TambahKategori extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kategori: ''
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

    simpanKategori = async () => {
        const { kategori } = this.state;
        let post = await axios.post("http://localhost:3001/tambah-kategori", { kategori: kategori }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        let response = await post.data;
        this.props.history.push("/admin/kategori");
    }

    render() {

        return (
            <Fragment>
                <Header />
                <Container>
                    <Form>
                        <Form.Field>
                            <label>Nama Kategori</label>
                            <input placeholder='Nama Kategori' onChange={(e) => this.setState({ kategori: e.target.value })} />
                        </Form.Field>
                        <Button type='submit' onClick={this.simpanKategori}>Submit</Button> <Button onClick={() => this.props.history.push("/admin/kategori")}>Cancle</Button>
                    </Form>
                </Container>
            </Fragment>
        );
    }
}

export default withRouter(TambahKategori);