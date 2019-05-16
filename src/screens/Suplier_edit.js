import React, { Component, Fragment } from 'react';
import { Form, Container, Button } from 'semantic-ui-react';
import Header from '../components/Header';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Suplier_edit extends Component {
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
        const { id } = this.props.match.params;

        axios.get(`http://localhost:3001/admin/edit-suplier/${id}`)
            .then((response) => {
                this.setState({
                    suplier: {
                        nama: response.data[0].suplier_nama,
                        alamat: response.data[0].suplier_alamat,
                        telepon: response.data[0].suplier_notelp
                    }
                })
            })
            .catch((error) => {
                alert(error);
            })
    }

    handleSuplierData = e => {
        const { suplier } = this.state;
        suplier[e.target.name] = e.target.value;
        this.setState({ suplier });
    }

    updateDataSuplier = async () => {
        const { id } = this.props.match.params;
        const { suplier } = this.state;
        let post = await axios.post(`http://localhost:3001/admin/update-suplier/${id}`, { suplier: suplier });
        let response = post.data;
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
                                value={this.state.suplier.nama}
                                onChange={this.handleSuplierData}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Alamat Suplier</label>
                            <textarea
                                name="alamat"
                                value={this.state.suplier.alamat}
                                onChange={this.handleSuplierData}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Telepon Suplier</label>
                            <input
                                type="text"
                                name="telepon"
                                value={this.state.suplier.telepon}
                                onChange={this.handleSuplierData}
                            />
                        </Form.Field>
                        <Button type='submit' onClick={this.updateDataSuplier}>Submit</Button> <Button onClick={() => this.props.history.push("/admin/suplier")}>Cancle</Button>
                    </Form>
                </Container>
            </Fragment>
        );
    }
}

export default withRouter(Suplier_edit);