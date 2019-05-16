import React, { Component, Fragment } from 'react';
import { Button, Form, Container } from 'semantic-ui-react';
import Header from '../components/Header';
import Select from 'react-select';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Barang_tambah extends Component {
    constructor(props) {
        super(props);
        this.state = {
            kategori: [],
            selectedOption: null,
            barang: {
                nama: '',
                kategori: '',
                satuan: '',
                harpok: '',
                eceran: '',
                grosir: '',
                stok: '',
                minim_stok: ''
            }
        }
    }

    componentDidMount() {
        let arrObj = [];
        axios.get("http://localhost:3001/kategori")
            .then((response) => {
                response.data.map((data, index) => {
                    arrObj.push({
                        value: data.kategori_id,
                        label: data.kategori_nama
                    })
                })
                this.setState({ kategori: arrObj })
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleBarangData = e => {
        const { barang } = this.state;
        if (e.value) {
            barang['kategori'] = e.value;
            this.setState({ selectedOption: e });
        } else {
            barang[e.target.name] = e.target.value;
        }
        this.setState({ barang });
    }

    handleRpFormat = e => {
        const { barang } = this.state;
        barang[e.target.name] = this.formatRupiah(e.target.value);
        this.setState({ barang });
    }

    formatRupiah = (angka) => {
        var number_string = angka.replace(/[^,\d]/g, '').toString(),
            split = number_string.split(','),
            sisa = split[0].length % 3,
            rupiah = split[0].substr(0, sisa),
            ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if (ribuan) {
            var separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        }

        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return rupiah;
    }

    simpanDataBarang = async () => {
        const { barang } = this.state;
        let post = await axios.post('http://localhost:3001/tambah-barang', { barang: barang });
        let response = await post.data;
        this.props.history.push("/admin/barang");
    }

    render() {
        console.log(this.state.barang.harpok)
        return (
            <Fragment>
                <Header />
                <Container>
                    <Form>
                        <Form.Field>
                            <label>Nama Barang</label>
                            <input
                                placeholder='Nama Barang'
                                name="nama"
                                onChange={this.handleBarangData}
                                value={this.state.barang.nama}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Kategori</label>
                            <Select
                                value={this.state.selectedOption}
                                options={this.state.kategori}
                                onChange={this.handleBarangData}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Satuan</label>
                            <input
                                type="text"
                                name="satuan"
                                placeholder="input satuan"
                                value={this.state.barang.satuan}
                                onChange={this.handleBarangData}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Harga Pokok</label>
                            <input
                                type="text"
                                name="harpok"
                                placeholder="harga pokok"
                                value={'Rp. ' + this.state.barang.harpok}
                                onChange={this.handleRpFormat}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Harga Eceran</label>
                            <input
                                type="text"
                                name="eceran"
                                placeholder="harga eceran"
                                value={'Rp. ' + this.state.barang.eceran}
                                onChange={this.handleRpFormat}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Harga Grosir</label>
                            <input
                                type="text"
                                name="grosir"
                                value={'Rp. ' + this.state.barang.grosir}
                                placeholder="harga grosir"
                                onChange={this.handleRpFormat}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Stok</label>
                            <input
                                type="text"
                                name="stok"
                                placeholder="input stok"
                                value={this.state.barang.stok}
                                onChange={this.handleBarangData}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Minimal Stok</label>
                            <input
                                type="number"
                                name="minim_stok"
                                placeholder="input minimal stok"
                                value={this.state.barang.minim_stok}
                                onChange={this.handleBarangData}
                            />
                        </Form.Field>
                        <Button type='submit' onClick={this.simpanDataBarang}>Submit</Button> <Button onClick={() => this.props.history.push("/admin/barang")}>Cancle</Button>
                    </Form>
                </Container>
            </Fragment>
        );
    }
}

export default withRouter(Barang_tambah);