import React, { Component, Fragment } from 'react';
import { Container, Button, Form } from 'semantic-ui-react'
import Header from '../components/Header';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Kategori_edit extends Component {

    constructor(props) {
        super(props);
        this.state = {
            new_kategori: ''
        }
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        axios.get(`http://localhost:3001/edit-kategori/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                this.setState({ new_kategori: response.data[0].kategori_nama })
            })
            .catch((error) => {
                localStorage.removeItem('token');
                window.location.href = '/';
            })
    }

    updateKategori = async (id) => {
        let update = await axios.post(`http://localhost:3001/update-kategori/${id}`, { kategori: this.state.new_kategori }, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        let response = update.data;
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
                            <input placeholder='Nama Kategori' value={this.state.new_kategori} onChange={(e) => this.setState({ new_kategori: e.target.value })} />
                        </Form.Field>
                        <Button type='submit' onClick={() => this.updateKategori(this.props.match.params.id)}>Update</Button> <Button onClick={() => this.props.history.push("/admin/kategori")}>Cancle</Button>
                    </Form>
                </Container>
            </Fragment>
        );
    }
}

export default withRouter(Kategori_edit);