export default [
    {
        path: '/',
        exact: true,
        screen: 'Login'
    },
    {
        path: '/admin/dashboard',
        screen: 'Dashboard',
    },
    {
        path: '/admin/kategori',
        screen: 'Kategori'
    },
    {
        path: '/admin/tambah-kategori',
        screen: 'TambahKategori'
    },
    {
        path: '/admin/edit-kategori/:id',
        screen: 'Kategori_edit'
    },
    {
        path: '/admin/barang',
        screen: 'Barang'
    },
    {
        path: '/admin/tambah-barang',
        screen: 'Barang_tambah'
    },
    {
        path: '/admin/edit-barang/:id',
        screen: 'Barang_edit'
    },
    {
        path: '/admin/suplier',
        screen: 'Suplier'
    },
    {
        path: '/admin/tambah-suplier',
        screen: 'Suplier_tambah'
    },
    {
        path: '/admin/edit-suplier/:id',
        screen: 'Suplier_edit'
    },
    {
        path: '/admin/penjualan-grosir',
        screen: 'Penjualan_grosir'
    }
];