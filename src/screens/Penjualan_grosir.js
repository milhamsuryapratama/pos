import React, { Component, Fragment } from 'react';
import Header from '../components/Header';
import { Container, Form, Grid, Button, Table, Menu, Icon } from 'semantic-ui-react';
import axios from 'axios';
import convertRupiah from 'rupiah-format';
import { empty } from 'rxjs';

class Penjualan_grosir extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {
                kode: '',
                nama: '',
                satuan: '',
                stok: '',
                harga: '',
                harpok: '',
                jumlah: 1,
                subttl: 0
            },
            cart: [],
            detail_bayar: {
                bayar: '',
                kembalian: ''
            }
        }
    }

    handleKodeBarang = async (e) => {
        const { detail } = this.state;

        detail['kode'] = e.target.value;
        this.setState({ detail });

        if (this.state.detail.kode === '') {
            this.setState({
                detail: {
                    ...this.state.detail,
                    nama: '',
                    satuan: '',
                    stok: '',
                    harga: '',
                    harpok: '',
                    jumlah: 0
                }
            })
        }

        let post = await axios.get(`http://localhost:3001/edit-barang/${this.state.detail.kode}`);
        let response = await post.data;
        // console.log(response);
        if (response) {
            if (response.length == 0) {
                this.setState({
                    detail: {
                        ...this.state.detail,
                        nama: '',
                        satuan: '',
                        stok: '',
                        harga: '',
                        harpok: '',
                        jumlah: 0
                    }
                })
            } else {
                this.setState({
                    detail: {
                        ...this.state.detail,
                        kode: response[0].barang_id,
                        nama: response[0].barang_nama,
                        satuan: response[0].barang_satuan,
                        stok: response[0].barang_stok,
                        harga: response[0].barang_harjul_grosir,
                        harpok: response[0].barang_harpok
                    }
                })
            }
        }
    }

    handleDetail = e => {
        const { detail } = this.state;
        detail[e.target.name] = e.target.value;
        this.setState({ detail });
    }

    handleJumlah = e => {
        const { detail } = this.state;
        detail['jumlah'] = e.target.value;
        this.setState({ detail });
    }

    handleCart = async () => {
        const { cart } = this.state;
        const { detail } = this.state;
        const { detail_bayar } = this.state;
        detail['subttl'] = detail['jumlah'] * detail['harga'];
        let push = await cart.push(this.state.detail);
        let setSt = await this.setState({
            cart,
            detail: {
                kode: '',
                nama: '',
                satuan: '',
                stok: '',
                harga: '',
                harpok: '',
                jumlah: 1,
                subttl: 0
            }
        });

        if (this.state.detail_bayar.bayar != '') {
            var n = this.state.cart.reduce((prev, current) => {
                return prev + current.subttl
            }, 0);

            detail_bayar['kembalian'] = this.formatRupiah(parseInt(detail_bayar['bayar'].replace('.', '') - n).toString());
            this.setState({ detail_bayar });
        }
    }

    hapusCart = async index => {
        const { cart } = this.state;
        const { detail_bayar } = this.state;
        cart.splice(index, 1);
        let set = await this.setState({ cart });

        var n = this.state.cart.reduce((prev, current) => {
            return prev + current.subttl
        }, 0);

        if (n == 0) {
            detail_bayar['bayar'] = '';
            detail_bayar['kembalian'] = '';
        } else {
            detail_bayar['kembalian'] = this.formatRupiah(parseInt(detail_bayar['bayar'].replace('.', '') - n).toString());
        }
        this.setState({ detail_bayar });
    }

    handleBayar = e => {
        const { detail_bayar } = this.state;
        var n = this.state.cart.reduce((prev, current) => {
            return prev + current.subttl
        }, 0);
        detail_bayar['bayar'] = this.formatRupiah(e.target.value);
        detail_bayar['kembalian'] = this.formatRupiah(parseInt(this.state.detail_bayar.bayar.replace('.', '') - n).toString());
        this.setState({ detail_bayar });
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

    simpanGrosir = async () => {
        const { cart, detail_bayar } = this.state;
        let post = await axios.post('http://localhost:3001/admin/tambah-grosir', { cart: cart, detail_bayar: detail_bayar });
        let resGrosir = await post.data;
        if (resGrosir) {
            alert('sukses');
            this.resetData();
        }
    }

    resetData = () => {
        this.setState({
            detail: {
                kode: '',
                nama: '',
                satuan: '',
                stok: '',
                harga: '',
                harpok: '',
                jumlah: 1,
                subttl: 0
            },
            cart: [],
            detail_bayar: {
                bayar: '',
                kembalian: ''
            }
        })
    }

    render() {
        var n = this.state.cart.reduce((prev, current) => {
            return prev + current.subttl
        }, 0);

        if (parseInt(this.state.detail_bayar.bayar.replace('.', '')) < parseInt(n)) {
            var kembali = '-' + this.state.detail_bayar.kembalian;
        } else {
            var kembali = this.state.detail_bayar.kembalian;
        }

        return (
            <Fragment>
                <Header />
                <Container>
                    <h3>Form Penjualan (Grosir)</h3>
                    <Form>
                        <Grid columns={6} divided>
                            <Grid.Row>
                                <Grid.Column>
                                    <Form.Field>
                                        <label>Kode Barang</label>
                                        <input
                                            type="text"
                                            value={this.state.detail.kode}
                                            onChange={this.handleKodeBarang}
                                        />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label>Nama Barang</label>
                                        <input
                                            type="text"
                                            name="nama"
                                            value={this.state.detail.nama}
                                            onChange={this.handleDetail}
                                        />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label>Satuan</label>
                                        <input
                                            type="text"
                                            name="satuan"
                                            value={this.state.detail.satuan}
                                            onChange={this.handleDetail}
                                        />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label>Stok</label>
                                        <input
                                            type="text"
                                            name="stok"
                                            value={this.state.detail.stok}
                                            onChange={this.handleDetail}
                                        />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label>Harga</label>
                                        <input
                                            type="text"
                                            name="harga"
                                            value={this.state.detail.harga == undefined ? 0 : this.formatRupiah(this.state.detail.harga.toString())}
                                            onChange={this.handleDetail}
                                        />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <label>Jumlah</label>
                                        <input
                                            type="number"
                                            value={this.state.detail.jumlah}
                                            onChange={this.handleJumlah}
                                            required
                                        />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column>
                                    <Form.Field>
                                        <Button onClick={this.handleCart}>OK</Button>
                                    </Form.Field>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    </Form>

                    <Grid>
                        <Grid.Row>
                            <Table celled>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Kode Barang</Table.HeaderCell>
                                        <Table.HeaderCell>Nama Barang</Table.HeaderCell>
                                        <Table.HeaderCell>Satuan</Table.HeaderCell>
                                        <Table.HeaderCell>Harga (Rp)</Table.HeaderCell>
                                        <Table.HeaderCell>Qty</Table.HeaderCell>
                                        <Table.HeaderCell>Sub Total</Table.HeaderCell>
                                        <Table.HeaderCell>Aksi</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>

                                <Table.Body>
                                    {this.state.cart.map((data, index) => {
                                        return (
                                            <Table.Row key={index} align='center'>
                                                <Table.Cell>{data.kode}</Table.Cell>
                                                <Table.Cell>{data.nama}</Table.Cell>
                                                <Table.Cell>{data.satuan}</Table.Cell>
                                                <Table.Cell>{convertRupiah.convert(data.harga)}</Table.Cell>
                                                <Table.Cell>{data.jumlah}</Table.Cell>
                                                <Table.Cell>{convertRupiah.convert(data.subttl)}</Table.Cell>
                                                <Table.Cell><Button onClick={() => this.hapusCart(index)}>Batal</Button></Table.Cell>
                                            </Table.Row>
                                        )
                                    })}
                                </Table.Body>

                                <Table.Footer>
                                    <Table.Row>
                                        <Table.HeaderCell colSpan='5' rowSpan='3'>
                                            <Button color='blue' onClick={this.simpanGrosir}>Simpan</Button>
                                        </Table.HeaderCell>

                                        <Table.HeaderCell>
                                            <Form.Field>
                                                <label>Total Belanja (Rp)</label>
                                            </Form.Field>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <Form.Field>
                                                <input
                                                    type="text"
                                                    value={this.formatRupiah(n.toString())}
                                                />
                                            </Form.Field>
                                        </Table.HeaderCell>

                                    </Table.Row>

                                    <Table.Row>
                                        <Table.HeaderCell>
                                            <Form.Field>
                                                <label>Tunai (Rp)</label>
                                            </Form.Field>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <Form.Field>
                                                <input
                                                    type="text"
                                                    value={this.state.detail_bayar.bayar}
                                                    onChange={this.handleBayar}
                                                />
                                            </Form.Field>
                                        </Table.HeaderCell>
                                    </Table.Row>

                                    <Table.Row>
                                        <Table.HeaderCell>
                                            <Form.Field>
                                                <label>Kembalian (Rp)</label>
                                            </Form.Field>
                                        </Table.HeaderCell>
                                        <Table.HeaderCell>
                                            <Form.Field>
                                                <input
                                                    type="text"
                                                    value={kembali}
                                                />
                                            </Form.Field>
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer>
                            </Table>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Fragment>
        );
    }
}

export default Penjualan_grosir;