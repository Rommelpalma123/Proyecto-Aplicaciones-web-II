import React, { Component } from 'react';
import {render} from 'react-dom';

class App extends Component {

    constructor() {
        super();
        this.state = {
            Nombre: '',
            Conversacion: '',
            chats: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addChat = this.addChat.bind(this);
    }
    //Evento para agregar el  usuario
    addChat(e) {
        fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Usuario Guardado'});
                this.setState({Nombre: '', Conversacion: ''});
            })
            .catch(err => console.error(err));

        e.preventDefault();
    }
    
    componentDidMount() {
        this.ObtenerChat();
    }

    ObtenerChat(){
        fetch('/api/users')
        .then(res => res.json())
        .then(data => {
            // a lo que estamos obteniendo los chat, estamos mostrando el estado
            this.setState({chats: data})
            // muestra el estado de los chat
            console.log(this.state.chats);
        });
    }

    handleChange(e) {
        const {name, value} = e.target;
        this.setState( {
            [name]:value
        })
    }
    

    render() {
        return (
            <div>
                {/* NAVIGATION */}
                <nav className="light-green darken-4">
                    <div className="container">
                        <a href="#" className="brand-logo">CHAT</a>
                    
                    </div>
                </nav>
                
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addChat}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="Nombre" onChange={this.handleChange} type="text" placeholder="Nombre" value={this.state.Nombre}/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="Conversacion" onChange={this.handleChange} placeholder="Conversacion" 
                                                className="materialize-textarea" value={this.state.Conversacion}></textarea>                                                
                                            </div>
                                        </div>
                                        <button type="submit" className="btn light-green darken-4">
                                            Enviar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7"> 
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Mensaje</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default App;