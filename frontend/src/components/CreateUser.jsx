import React, { Component } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
export default class CreateUser extends Component {
    state = {
        users: [],
        username: ''
    }
    async componentDidMount() {
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({ users: res.data });
        this.getUsers();
        console.log(this.state.users);
    }
    getUsers = async () => {
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({ users: res.data });
    }
    onSubmit = async e => {
        e.preventDefault();
        await axios.post('http://localhost:4000/api/users', {
            username: this.state.username
        })
        this.setState({ username: '' });
        this.getUsers();
    }
    deleteUser = async (id) => {
        await axios.delete('http://localhost:4000/api/users/' + id);
        this.getUsers();
    }
    updateUser = async (id, username) => {
        const newUser = {
            username: username
        }
        const res = await axios.put('http://localhost:4000/api/users/' + id, newUser);
        this.getUsers();
    }

    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create New User</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => (
                                <div className='row'>

                                    <li className="btn btn-primary col-1"
                                        onClick={() => {
                                            const MySwal = withReactContent(Swal)
                                            const usert = this;
                                            MySwal.fire({
                                                title: 'Editar usuario',
                                                html: `<input type="text" id="usuarioswal" class="swal2-input" placeholder="Usuario">`,
                                                confirmButtonText: 'Editar',
                                                showCancelButton: true,
                                                focusConfirm: false,
                                                preConfirm: () => {
                                                    const usuarioswal = Swal.getPopup().querySelector('#usuarioswal').value
                                                    if (!usuarioswal) {
                                                        Swal.showValidationMessage(`Ingresa un usuarioswal valido`)
                                                    }
                                                    return { usuarioswal: usuarioswal, }
                                                }
                                            }).then((result) => {
                                                if (result.isConfirmed) {
                                                    console.log(result.value.usuarioswal)
                                                    console.log(user._id)
                                                    usert.updateUser(user._id, result.value.usuarioswal);
                                                }
                                                Swal.fire(`
                                              Usuario editado!
                                            `.trim())
                                            })
                                        }}
                                    >
                                        edit
                                    </li>
                                    <li
                                        className="list-group-item col-10"
                                        key={user._id}
                                        onDoubleClick={() => {
                                            const MySwal = withReactContent(Swal)
                                            const usert = this;
                                            MySwal.fire({
                                                title: 'Desea eliminar al usuario?',
                                                showDenyButton: true,
                                                confirmButtonText: 'Eliminar',
                                                denyButtonText: `Cancelar`,
                                            }).then((result) => {
                                                /* Read more about isConfirmed, isDenied below */
                                                if (result.isConfirmed) {
                                                    console.log(user._id)
                                                    console.log(usert)
                                                    usert.deleteUser(user._id);
                                                    Swal.fire('Eliminado!', '', 'success')
                                                } else if (result.isDenied) {
                                                    Swal.fire('No se borro el usuario', '', 'info')
                                                }
                                            })
                                        }}
                                    >
                                        {user.username}
                                    </li>
                                </div>
                            )
                            )
                        }
                    </ul>
                </div>

            </div>

        )
    }
}
