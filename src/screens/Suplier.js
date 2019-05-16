import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Table, Container, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";
import Header from '../components/Header';

const columns = [
    {
        name: "nama",
        label: "Nama Suplier",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "alamat",
        label: "Alamat Suplier",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "telepon",
        label: "Telepon Suplier",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "aksi",
        label: "Aksi",
        options: {
            filter: true,
            sort: true,
        }
    }
];

const options = {
    filterType: 'checkbox'
};

class Suplier extends Component {
    constructor(props) {
        super(props);
        this.state = {
            suplier: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/admin/suplier')
            .then((response) => {
                this.setState({ suplier: response.data })
            })
            .catch((error) => {
                alert(error)
            })
    }

    hapusSuplier = (id, index) => {
        const { suplier } = this.state;
        axios.get(`http://localhost:3001/admin/hapus-suplier/${id}`)
            .then((response) => {
                suplier.splice(index, 1);
                this.setState({ suplier })
            })
            .catch((error) => {
                alert(error);
            })
    }

    render() {
        let sup = [];
        this.state.suplier.map((data, index) => {
            sup.push({
                nama: data.suplier_nama,
                alamat: data.suplier_alamat,
                telepon: data.suplier_notelp,
                aksi: <Fragment><Link to={`/admin/edit-suplier/${data.suplier_id}`}><Button primary>Edit</Button></Link> <Button primary onClick={() => this.hapusSuplier(data.suplier_id, index)}>Hapus</Button></Fragment>
            })
        })
        return (
            <Fragment>
                <Header />
                <Container>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell colSpan="3"><Link to="/admin/tambah-suplier">Tambah</Link></Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                    </Table>

                    <MUIDataTable
                        title={"Data Suplier"}
                        data={sup}
                        columns={columns}
                        options={options}
                    />
                </Container>
            </Fragment>
        );
    }
}

export default Suplier;