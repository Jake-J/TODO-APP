import React from 'react';
// import classNames from 'classnames';
import PropTypes from 'prop-types';

export class Task extends React.Component {
    constructor(props){
        super(props);
        this.deleteCurrentTask = this.deleteCurrentTask.bind(this);
        this.openCurrentTask = this.openCurrentTask.bind(this);
        this.showTextEditor = this.showTextEditor.bind(this);
        this.saveName = this.saveName.bind(this);
        this.state = {
            editing: null
        }
    }
    deleteCurrentTask(){
        this.props.deleteCurrentTask(this.props.number,this.props.name);
    }
    openCurrentTask(){
        this.props.openCurrentTask(this.props.number);
    }
    showTextEditor(){
            this.setState({
                editing:true
            })
      
    }
    saveName(e){
        e.preventDefault();
        
        const input = e.target.firstChild;

        this.props.renameCurrentTask(input.value,this.props.number,this.props.name)
        this.setState({
            editing:null
        })
        
    }
    render(){
        let taskName = this.props.name;
        const editing = this.state.editing;

        if(editing){
            taskName = (
                <form onSubmit={this.saveName}>
                  <input type="text"  defaultValue={this.props.name} autoFocus/>
                </form>
              );
        }
        return(
                <li>
                    <div className="taskName" onDoubleClick={this.showTextEditor}>{taskName}{!editing && <span>double click to rename.</span>} </div>
                    <i className="task medium" onClick={this.openCurrentTask}></i><br/>
                    <i className="small open taskIcon hint"onClick={this.openCurrentTask}><span>open task</span> </i> 
                    <i className="small delete hint"onClick={this.deleteCurrentTask}><span>delete task</span> </i>                    
                </li>
        )
    }
}

Task.propTypes = {
    name: PropTypes.string.isRequired,
    saved:PropTypes.bool,
    number: PropTypes.number.isRequired,
    deleteCurrentTask: PropTypes.func.isRequired,
    renameCurrentTask:PropTypes.func,
    openCurrentTask:PropTypes.func,
    saveCurrentTask:PropTypes.func,
    moveBackCurrentTask:PropTypes.func
}