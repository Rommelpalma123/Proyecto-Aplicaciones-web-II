import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();
        this.state = {
            Nombre: "",
            Conversacion: ""
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
                M.toast({html: 'Usuario Guardado'})
            })
            .catch(err => console.error(err));
        e.preventDefault();
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
                                                <input name="Nombre" onChange={this.handleChange} type="text" placeholder="Nombre" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="Conversacion" onChange={this.handleChange} placeholder="Conversacion"
                                                className="materialize-textarea"></textarea>                                                
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

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default App;