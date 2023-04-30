import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
export default class NotesList extends Component {
    state = {
        notes: [],
        editing: false,
        _id: ''

    }
    componentDidMount() {
        this.getNotes()
    }
    async getNotes() {
        const res = await axios.get('http://localhost:4000/api/notes')
        this.setState({ notes: res.data })
    }
    deleteNote = async (id) => {
        await axios.delete('http://localhost:4000/api/notes/' + id);
        this.getNotes();
    }


    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note => (
                        <div className="col-md-4 p-2" key={note._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <div className="card-header">
                                        <h5>{note.title}</h5>
                                        <Link className="btn btn-secondary" to={"/edit/" + note._id}>
                                            Edit
                                        </Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p>{note.content}</p>
                                    <p>{note.author}</p>
                                    <p>{format(new Date(note.date),
                                        { locale: 'en_US' },
                                    )}</p>
                                </div>
                                <div className="card-footer">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => {
                                            const MySwal = withReactContent(Swal)
                                            MySwal.fire({
                                                title: 'Desea eliminar la nota?',
                                                showDenyButton: true,
                                                confirmButtonText: 'Eliminar',
                                                denyButtonText: `Cancelar`,
                                            }).then((result) => {
                                                /* Read more about isConfirmed, isDenied below */
                                                if (result.isConfirmed) {
                                                    this.deleteNote(note._id);
                                                    Swal.fire('Eliminado!', '', 'success')
                                                } else if (result.isDenied) {
                                                    Swal.fire('No se borro la nota', '', 'info')
                                                }
                                            })
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))
                }
            </div>

        )
    }
}
