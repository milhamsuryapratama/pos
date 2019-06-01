import React, { Component, Fragment } from 'react';
import { Table, Button, Container } from 'semantic-ui-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import convertRupiah from 'rupiah-format';
import MUIDataTable from "mui-datatables";

const columns = [
    {
        name: "kode",
        label: "Kode Barang",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "nama",
        label: "Nama Barang",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "satuan",
        label: "Satuan",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "harpok",
        label: "Harga Pokok",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "harjul",
        label: "Harga Jual",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "grosir",
        label: "Harga Grosir",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "stok",
        label: "Stok",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "min_stok",
        label: "Minim Stok",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "kategori",
        label: "Kategori",
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
    },
];

const options = {
    filterType: 'checkbox'
};

class Barang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            barang: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3001/barang', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then((response) => {
                this.setState({ barang: response.data })
            })
            .catch((error) => {
                localStorage.removeItem('token');
                window.location.href = '/';
            })
    }

    hapusBarang = (index, id) => {
        const { barang } = this.state;
        axios.get(`http://localhost:3001/hapus-barang/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(() => {
                barang.splice(index, 1);
                this.setState({ barang })
            })
            .catch((error) => {
                localStorage.removeItem('token');
                window.location.href = '/';
            })
    }

    render() {
        let brn = [];
        this.state.barang.map((data, index) => {
            brn.push({
                kode: data.barang_id,
                nama: data.barang_nama,
                satuan: data.barang_satuan,
                harpok: convertRupiah.convert(data.barang_harpok),
                harjul: convertRupiah.convert(data.barang_harjul),
                grosir: convertRupiah.convert(data.barang_harjul_grosir),
                stok: data.barang_stok,
                min_stok: data.barang_min_stok,
                kategori: data.kategori_nama,
                aksi: <Fragment><Link to={`/admin/edit-barang/${data.barang_id}`}><Button primary>Edit</Button></Link> <Button primary onClick={() => this.hapusBarang(index, data.barang_id)}>Hapus</Button></Fragment>
            })
        })
        return (
            <Fragment>
                <Header />
                <Container>
                    <Table celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.Cell colSpan="3"><Link to="/admin/tambah-barang">Tambah</Link></Table.Cell>
                            </Table.Row>
                        </Table.Header>
                        <MUIDataTable
                            title={"Data Barang"}
                            data={brn}
                            columns={columns}
                            options={options}
                        />
                    </Table>
                </Container>
            </Fragment>
        );
    }
}

export default Barang;