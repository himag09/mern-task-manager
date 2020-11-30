import React, { Component } from 'react';

class App extends Component{
constructor(){
    super();
    this.state={
        title:'',
        description:'',
        tasks:[],
        _id:''
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
}
    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]:value
        });
    }
    componentDidMount(){
        this.fetchTask();
    }
    fetchTask(){
        fetch('/api/task')
        .then(res => res.json())
        .then(data => {
            this.setState({tasks: data});
            console.log(this.state.tasks);
        });
    }
    clearForm(){
        this.setState({title:'',description:'',_id:''});
    }
    addTask(e){
        if (this.state._id){
            fetch(`/api/task/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => console.log(data));
            M.toast({html:'Task Updated'});
            this.clearForm()
            this.fetchTask();
        } else {
        fetch('/api/task', {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)    
                M.toast({html:'Task Saved'});
                this.setState({title:'', description:''});
                this.fetchTask();
                })
            .catch(err => console.error(err));
        }
        e.preventDefault();
    }
    editTask(e){
        fetch(`/api/task/${e}`)
            .then(res =>res.json())
            .then(data=>{
                this.setState({
                    title:data.title,
                    description:data.description,
                    _id:data._id
                })
            })
         
        }
   deleteTask(e){
       if (confirm("Are you sure you want to deleted it?")) {
        fetch(`/api/task/${e}`, {
            method: 'DELETE',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html:'Task Deleted'});
                this.fetchTask();
            });
       }      
   
    }
    render() {
        return (
            <div>
                {/* NAVIGATION */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">PROGRAMA</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input 
                                                    name="title" 
                                                    type="text" 
                                                    placeholder="Task Title"
                                                    onChange={this.handleChange}
                                                    value={this.state.title}/>
                                            </div>
                                        </div> 
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea 
                                                    name="description"  
                                                    className="materialize-textarea" 
                                                    placeholder="Task Description"
                                                    onChange={this.handleChange}
                                                    value={this.state.description}/>
                                            </div>
                                        </div>
                                        <button 
                                            type="submit" 
                                            className="btn light-blue darken-4"> 
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            Title
                                        </th>
                                        <th>
                                            Description
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task=>{
                                            return (
                                                <tr key={task._id}>
                                                    <td>
                                                        {task.title}
                                                    </td>
                                                    <td>
                                                        {task.description}
                                                    </td>
                                                    <td>
                                                        <button 
                                                        onClick={()=>this.deleteTask(task._id)}
                                                       
                                                        className="btn light-blue darken-4"
                                                        style={{margin:"4px"}}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                        <button
                                                        onClick={() =>this.editTask(task._id)}
                                                        className="btn light-blue darken-4"
                                                        style={{margin:"4px"}}>
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

export default App;