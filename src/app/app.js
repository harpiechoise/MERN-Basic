import React, { Component } from 'react'

class App extends Component {
    constructor(){
        super()
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        }
        this.addTask = this.addTask.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    addTask(e){
        if (this.state._id) {
            fetch(`/api/tasks/${this.state._id}`, {
                method:'PUT',
                body: JSON.stringify(this.state),
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Tarea Actualizada'})
                this.setState({title: '', description: '', _id: ''})
                this.fetchTask()
            })
        }else{
            fetch('/api/tasks', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }
            }).then(res => res.json())
              .then(data => {
                  console.log(data)
                  M.toast({html:'Tarea Guardada'})
                  this.setState({title:'', description:''})
                  this.fetchTask()
              })
              .catch(err => console.log(err))
        }
        e.preventDefault();
    }

    componentDidMount() {
        this.fetchTask()
    }

    fetchTask(){
        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {

                this.setState({tasks: data})
                console.log(this.state.tasks)
            })
    }
    
    deleteTask(id){
        if (confirm('Estas seguro de que quieres eliminar la tarea')){
            fetch(`/api/tasks/${id}`,{
                method:'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
              .then(data => {
                  console.log(data)
                  M.toast({html:'Tarea eliminada'})
                  this.fetchTask()
              })
        }
    }
    
    editTask(id) {

        fetch(`/api/tasks/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id
            })
        })

    }

    handleChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }


    render() {
        return (
            /* NAVEGACION */
            <div>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Mern App</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className = "input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Titulo de la tarea" value={this.state.title}></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className = "input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} placeholder="Descripcion de la tarea" className="materialize-textarea" value={this.state.description}></textarea>
                                            </div>
                                        </div>
                                        <button type='submit' className="btn light-blue darken-4">
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
                                        <th>Titulo</th>
                                        <th>Descripcion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return (
                                                <tr key={task._id}> 
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={() => this.deleteTask(task._id)}>
                                                        <i className="material-icons">delete</i>
                                                        </button>
                                                        <button className="btn light-blue darken-4" style={{margin:'4px'}} onClick={() => this.editTask(task._id)}>
                                                            
                                                        <i className="material-icons">edit</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default App