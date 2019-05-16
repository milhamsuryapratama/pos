import React, { Component, Fragment } from 'react';
import { Container, Button, Form } from 'semantic-ui-react';
import axios from 'axios';

import Header from '../components/Header';
import TampilKategori from '../components/TampilKategori';

class Kategori extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data_kategori: []
        }
    }

    componentDidMount() {
        axios.get("http://localhost:3001/kategori")
            .then(response => {
                this.setState({ data_kategori: response.data })
            })
            .catch(error => {
                console.log(error);
            })
    }

    hapusKategori = (id, index) => {
        const { data_kategori } = this.state;
        axios.get(`http://localhost:3001/hapus-kategori/${id}`)
            .then((response) => {
                data_kategori.splice(index, 1);
                this.setState({ data_kategori })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {

        return (
            <Fragment>
                <Header />
                <Container>
                    {/* <Form>
                        <Form.Field>
                            <label>Nama Kategori</label>
                            <input placeholder='Nama Kategori' onChange={(e) => this.setState({ kategori: e.target.value })} />
                        </Form.Field>
                        <Button type='submit' onClick={this.simpanKategori}>Submit</Button>
                    </Form> */}
                    <TampilKategori kategori={this.state.data_kategori} hapus={(id, index) => this.hapusKategori(id, index)} />
                </Container>
            </Fragment>
        )
    }
}

export default Kategori;