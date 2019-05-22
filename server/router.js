const express = require('express');
const router = express.Router();

router.get('/kategori', (req, res) => {
    req.con.query("SELECT * FROM tbl_kategori ORDER BY kategori_id DESC", (error, result) => {
        res.json(result);
    })
})

router.post('/tambah-kategori', (req, res) => {
    const data = req.body;
    req.con.query(`INSERT INTO tbl_kategori (kategori_nama) VALUES ('${data.kategori}')`, (error) => {
        error ? res.json(error) : res.status(200).json({ data: 'data in added successfully' });
    })
})

router.get('/hapus-kategori/:id', (req, res) => {
    req.con.query(`DELETE FROM tbl_kategori WHERE kategori_id = ${req.params.id}`, (error) => {
        error ? res.json(error) : res.status(200).json({ data: 'data deleted successfully' });
    })
})

router.get('/edit-kategori/:id', (req, res) => {
    req.con.query(`SELECT * FROM tbl_kategori WHERE kategori_id = ${req.params.id}`, (error, result) => {
        error ? res.json(error) : res.json(result);
    })
})

router.post('/update-kategori/:id', (req, res) => {
    const data = req.body;
    req.con.query(`UPDATE tbl_kategori SET kategori_nama = '${data.kategori}' WHERE kategori_id = ${req.params.id}`, (error) => {
        error ? res.json(error) : res.status(200).json({ data: 'data updated successfully' });
    })
})

router.get('/barang', (req, res) => {
    req.con.query("SELECT * FROM tbl_barang JOIN tbl_kategori ON tbl_barang.barang_kategori_id = tbl_kategori.kategori_id ORDER BY barang_id DESC", (error, result) => {
        error ? res.json(error) : res.json(result);
    })
})

router.post('/tambah-barang', (req, res) => {
    const data = req.body;
    //console.log(data.barang.nama);
    req.con.query("SELECT max(barang_id) as max_id FROM tbl_barang", (error, result) => {
        let id = result[0].max_id;
        let sub_id = id.substring(2, 8);
        let new_id = parseInt(sub_id) + 1;
        let barang_id = 'BR000' + new_id;

        req.con.query(`INSERT INTO tbl_barang (barang_id,barang_nama,barang_satuan,barang_harpok,barang_harjul,barang_harjul_grosir,barang_stok,barang_min_stok,barang_kategori_id,barang_user_id) VALUES('${barang_id}','${data.barang.nama}','${data.barang.satuan}','${data.barang.harpok.replace('.', '')}','${data.barang.eceran.replace('.', '')}','${data.barang.grosir.replace('.', '')}','${data.barang.stok}','${data.barang.minim_stok}','${data.barang.kategori}','1')`, (error) => {
            error ? res.json(error) : res.status(200).json({ data: 'data inserted successfully' });
        });

    });
})

router.get('/hapus-barang/:id', (req, res) => {
    req.con.query(`DELETE FROM tbl_barang WHERE barang_id = '${req.params.id}'`, (error) => {
        if (error) {
            throw error;
        } else {
            res.status(200).json({ data: "data deleted successfully" });
        }
    })
})

router.get('/edit-barang/:id', (req, res) => {
    req.con.query(`SELECT * FROM tbl_barang JOIN tbl_kategori ON tbl_barang.barang_kategori_id = tbl_kategori.kategori_id WHERE tbl_barang.barang_id = '${req.params.id}'`, (error, result) => {
        if (error) {
            throw error;
        } else {
            res.json(result);
        }
    })
})

router.post('/update-barang/:id', (req, res) => {
    const data = req.body;

    req.con.query(`UPDATE tbl_barang SET barang_nama = '${data.barang.nama}', barang_satuan = '${data.barang.satuan}', barang_harpok = '${data.barang.harpok.replace('.', '')}', barang_harjul = '${data.barang.eceran.replace('.', '')}', barang_harjul_grosir = '${data.barang.grosir.replace('.', '')}', barang_stok = '${data.barang.stok}', barang_min_stok = '${data.barang.minim_stok}', barang_kategori_id = '${data.barang.kategori}' WHERE barang_id = '${req.params.id}' `, (error) => {
        error ? res.json(error) : res.status(200).json({ data: 'data updated successfully' });
    })
})

router.get('/admin/suplier', (req, res) => {
    req.con.query('SELECT * FROM tbl_suplier ORDER BY suplier_id DESC', (error, result) => {
        if (error) {
            throw error;
        } else {
            res.json(result);
        }
    })
})

router.post('/admin/tambah-suplier', (req, res) => {
    const data = req.body;

    req.con.query(`INSERT INTO tbl_suplier (suplier_nama, suplier_alamat, suplier_notelp) VALUES('${data.suplier.nama}', '${data.suplier.alamat}', '${data.suplier.telepon}')`, (error) => {
        if (error) {
            throw error;
        } else {
            res.status(200).json({ data: 'data inserted successfully' });
        }
    })
})

router.get('/admin/hapus-suplier/:id', (req, res) => {
    req.con.query(`DELETE FROM tbl_suplier WHERE suplier_id = ${req.params.id}`, (error) => {
        if (error) {
            throw error;
        } else {
            res.status(200).json({ data: "data deleted successfully" });
        }
    })
})

router.get('/admin/edit-suplier/:id', (req, res) => {
    req.con.query(`SELECT * FROM tbl_suplier WHERE suplier_id = ${req.params.id}`, (error, result) => {
        if (error) {
            throw error
        } else {
            res.json(result);
        }
    })
})

router.post('/admin/update-suplier/:id', (req, res) => {
    const data = req.body;
    req.con.query(`UPDATE tbl_suplier SET suplier_nama = '${data.suplier.nama}', suplier_alamat = '${data.suplier.alamat}', suplier_notelp = '${data.suplier.telepon}' WHERE suplier_id = ${req.params.id}`, (error, result) => {
        if (error) {
            throw error;
        } else {
            res.status(200).json({ data: 'data updated successfully' });
        }
    })
})

router.post('/admin/tambah-grosir', async (req, res) => {
    const data = req.body;
    let nomorFaktur;
    let getNofak = await req.con.query('SELECT max(jual_nofak) as nofak FROM tbl_jual', async (error, result) => {
        nomorFaktur = result[0].nofak;

        if (getNofak) {
            let nf = parseInt(nomorFaktur) + 1;
            let total = data.cart.reduce((prev, current) => {
                return prev + current.subttl
            }, 0);

            let nm = await req.con.query(`INSERT INTO tbl_jual (jual_nofak,jual_total,jual_jml_uang,jual_kembalian,jual_user_id,jual_keterangan) VALUES('${nf}','${total}','${data.detail_bayar.bayar.replace('.', '')}','${data.detail_bayar.kembalian.replace('.', '')}','1','grosir')`, async (error, result) => {
                if (nm) {
                    if (error) {
                        throw error;
                    } else {
                        let mapCart = await data.cart.map((d, index) => {
                            req.con.query(`INSERT INTO tbl_detail_jual (d_jual_nofak,d_jual_barang_id,d_jual_barang_nama,d_jual_barang_satuan,d_jual_barang_harpok,d_jual_barang_harjul,d_jual_qty,d_jual_diskon,d_jual_total) VALUES('${nf}','${d.kode}','${d.nama}','${d.satuan}','${d.harpok}','${d.harga}','${d.jumlah}','0','${d.subttl}')`, async (error, result) => {
                                if (mapCart) {
                                    if (error) {
                                        throw error;
                                    } else {
                                        let updateStok = await data.cart.map((d, index) => {
                                            req.con.query(`UPDATE tbl_barang SET barang_stok = barang_stok - ${d.jumlah} WHERE barang_id = '${d.kode}'`, async (error) => {
                                                if (error) {
                                                    throw error;
                                                } else {
                                                    res.status(200).json({ data: 'data inserted successfully' });
                                                }
                                            })
                                        })
                                    }
                                }
                            })
                        })
                    }
                }
            })
        }
    });
})

router.post('/admin/tambah-eceran', async (req, res) => {
    const data = req.body;
    let nomorFaktur;
    let getNofak = await req.con.query('SELECT max(jual_nofak) as nofak FROM tbl_jual', async (error, result) => {
        nomorFaktur = result[0].nofak;

        if (getNofak) {
            let nf = parseInt(nomorFaktur) + 1;
            let total = data.cart.reduce((prev, current) => {
                return prev + current.subttl
            }, 0);

            let nm = await req.con.query(`INSERT INTO tbl_jual (jual_nofak,jual_total,jual_jml_uang,jual_kembalian,jual_user_id,jual_keterangan) VALUES('${nf}','${total}','${data.detail_bayar.bayar.replace('.', '')}','${data.detail_bayar.kembalian.replace('.', '')}','1','eceran')`, async (error, result) => {
                if (nm) {
                    if (error) {
                        throw error;
                    } else {
                        let mapCart = await data.cart.map((d, index) => {
                            req.con.query(`INSERT INTO tbl_detail_jual (d_jual_nofak,d_jual_barang_id,d_jual_barang_nama,d_jual_barang_satuan,d_jual_barang_harpok,d_jual_barang_harjul,d_jual_qty,d_jual_diskon,d_jual_total) VALUES('${nf}','${d.kode}','${d.nama}','${d.satuan}','${d.harpok}','${d.harga}','${d.jumlah}','0','${d.subttl}')`, async (error, result) => {
                                if (mapCart) {
                                    if (error) {
                                        throw error;
                                    } else {
                                        let updateStok = await data.cart.map((d, index) => {
                                            req.con.query(`UPDATE tbl_barang SET barang_stok = barang_stok - ${d.jumlah} WHERE barang_id = '${d.kode}'`, async (error) => {
                                                if (error) {
                                                    throw error;
                                                } else {
                                                    res.status(200).json({ data: 'data inserted successfully' });
                                                }
                                            })
                                        })
                                    }
                                }
                            })
                        })
                    }
                }
            })
        }
    });
})

module.exports = router;