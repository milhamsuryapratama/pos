import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';
import axios from 'axios';

class Header extends Component {

    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleKeluar = async () => {
        let keluar = await axios.get('http://localhost:3001/logout', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')

            }
        })
            .then((response) => {
                alert("Anda Keluar");
                localStorage.removeItem('token');
                this.props.history.push('/');
            })
            .catch((error) => {
                alert(error);
            })
    }

    render() {
        const { activeItem } = this.state

        return (
            <Segment inverted>
                <Menu inverted pointing secondary>
                    <Link to="/admin/dashboard">
                        <Menu.Item name='home' to="/admin/dashboard" active={activeItem === 'home'} onClick={this.handleItemClick} />
                    </Link>
                    <Link to="/admin/kategori">
                        <Menu.Item
                            name='kategori'
                            active={activeItem === 'kategori'}
                            onClick={this.handleItemClick}
                        />
                    </Link>
                    <Link to="/admin/barang">
                        <Menu.Item
                            name='barang'
                            active={activeItem === 'barang'}
                            onClick={this.handleItemClick}
                        />
                    </Link>
                    <Link to="/admin/suplier">
                        <Menu.Item
                            name='Suplier'
                            active={activeItem === 'suplier'}
                            onClick={this.handleItemClick}
                        />
                    </Link>
                    <Link to="/admin/penjualan-grosir">
                        <Menu.Item
                            name='Penjualan (Grosir)'
                            active={activeItem === 'penjualan-grosir'}
                            onClick={this.handleItemClick}
                        />
                    </Link>
                    <Link to="/admin/penjualan-eceran">
                        <Menu.Item
                            name='Penjualan (Eceran)'
                            active={activeItem === 'penjualan-eceran'}
                            onClick={this.handleItemClick}
                        />
                    </Link>
                    <Menu.Item
                        name='Keluar'
                        active={activeItem === 'keluar'}
                        onClick={this.handleKeluar}
                    />
                </Menu>
            </Segment>
        )
    }
}

export default withRouter(Header);