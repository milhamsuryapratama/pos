import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react'

class Header extends Component {

    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

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
                </Menu>
            </Segment>
        )
    }
}

export default Header;