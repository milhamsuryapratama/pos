import React, { Component, Fragment } from 'react';
import { Table, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MUIDataTable from "mui-datatables";

const columns = [
    {
        name: "kategori_nama",
        label: "Nama Kategori",
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

class TampilKategori extends Component {

    render() {
        let n = [];
        this.props.kategori.map((data, index) => {
            n.push({
                kategori_nama: data.kategori_nama,
                kategori_id: data.kategori_id,
                aksi: <Fragment><Link to={`/admin/edit-kategori/${data.kategori_id}`}><Button primary>Edit</Button></Link> <Button primary onClick={() => this.props.hapus(data.kategori_id, index)}>Hapus</Button></Fragment>
            })
        })
        return (
            <Fragment>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan="3"><Link to="/admin/tambah-kategori">Tambah</Link></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                </Table>

                <MUIDataTable
                    title={"Data Kategori"}
                    data={n}
                    columns={columns}
                    options={options}
                />
            </Fragment>
        );
    }
}

export default TampilKategori;