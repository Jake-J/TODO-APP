const  normalize = require('./normalize.scss'),
        css = require('./app.scss');

import React from 'react';
import ReactDOM from 'react-dom';

import {Task} from './components/Task';
import {Step} from './components/Step';

class TODOapp extends React.Component {
    constructor(props){
        super(props);
        //TASKS
        this.removeTask = this.removeTask.bind(this);
        this.addTask = this.addTask.bind(this);
        this.renameTask = this.renameTask.bind(this);
        this.openTask = this.openTask.bind(this);
        //STEPS
        this.addStep = this.addStep.bind(this);
        this.editStep = this.editStep.bind(this);
        this.markAs = this.markAs.bind(this);
        this.removeStep = this.removeStep.bind(this);
        this.state = {
            tasks:[['task0',[['first step'],[]]]],
            counter:1,
            stepsTODO:[],
            stepsDone:[],
            openedTask:''
        }
    }
    ///////////////////////
    //TASKS FUNCTIONALITY//
    ///////////////////////
    addTask(){
        const {counter} = this.state,
              newTask = ['new task' + counter,[['first step'],[]]];

        this.setState({
            tasks:[...this.state.tasks,newTask],
            counter: counter+1
        })
        //buyItems: [...this.state.buyItems,newItem]
    }
    removeTask(taskNum,taskName){
        const {tasks,openedTask} = this.state;

        this.setState({
            tasks:tasks.filter((task,index) => {
                return index !== taskNum;
            })
        })
        
         if(openedTask === taskName){
             this.setState({
                 stepsDone:[],
                 stepsTODO:[],
                 openedTask:''
             });
             this.openTask();
         }
    }
    openTask(entryNum){
        const {tasks} = this.state;
        let stepsTODO,stepsDone,taskName;

        if(entryNum){
             stepsTODO = tasks[entryNum][1][0];
            stepsDone = tasks[entryNum][1][1];
            taskName = tasks[entryNum][0];

            this.setState({
                openedTask:taskName,
                stepsTODO: stepsTODO,
                stepsDone:stepsDone
            })
        }else if(tasks[0]){
            stepsTODO = tasks[0][1][0];
            stepsDone = tasks[0][1][1];
            taskName = tasks[0][0];

            this.setState({
                openedTask:taskName,
                stepsTODO: stepsTODO,
                stepsDone:stepsDone
            })
        }

    }
    renameTask(newTaskName,entryNum,oldTaskName){
        const {tasks} = this.state;

        if(newTaskName !== '' && newTaskName !== oldTaskName){

            tasks[entryNum][0] = newTaskName;
            this.setState({
                tasks:tasks
            })

            this.openTask(entryNum);
        }
    }
    ///////////////////////
    //STEPS FUNCTIONALITY//
    ///////////////////////
    addStep(){
        const listTODO = this.state.stepsTODO;
        
        listTODO.unshift("New Step");
        this.setState({
            stepsTODO:listTODO
        })
    }
    editStep(newName,stepNum,oldName,isDone){
        const {stepsTODO,stepsDone} = this.state;
        
              if(!isDone){
                    stepsTODO[stepNum] = newName;
                    this.setState({
                        stepsTODO:stepsTODO
                    })
                } else if(isDone){
                    console.log('to tutaj jestesmy teraz' + stepsDone[stepNum])
                    stepsDone[stepNum] = newName;
                    this.setState({
                        stepsDone:stepsDone
                    }) 
               }
    }

    markAs(stepNum,isDone){
        const {stepsTODO,stepsDone} = this.state;

        if(!isDone){
            console.log('helo brightness my friend');
            stepsDone.push(stepsTODO[stepNum]);
            stepsTODO.splice(stepNum,1);
        }else{
            console.log('hi darkness my friend');
            stepsTODO.push(stepsDone[stepNum]);
            stepsDone.splice(stepNum,1);
        }
       this.setState({
            stepsDone:stepsDone,
            stepsTODO:stepsTODO
        })
    }
    removeStep(stepNum,isDone){
        const {stepsTODO,stepsDone} = this.state;
        
              if(isDone){
                this.setState({stepsDone:stepsDone.filter( (ignore,index) =>{
                    return index !== stepNum;
                })});
              }else if(!isDone){
                this.setState({stepsTODO:stepsTODO.filter( (ignore,index) =>{
                    return index !== stepNum;
                })});
              }
    }
    ////////////////////////////
    //LIFE CYCLE FUNCTIONALITY//
    ////////////////////////////
    componentDidMount() {
        this.openTask();
    }
    render() {
        const {tasks,stepsTODO,stepsDone} = this.state;

        return (
        <div className="mainWrapper">
            <h1 onClick={this.hello}>TODO tasks list</h1>
            <div className="tasksList">
                <div className="taskHeader">
                <h2>Tasks list</h2>
                    {
                        tasks.length === 0 && <span className="message">You have no task to work with , click plus icon to add some.</span>
                    } 
                </div>
                <ul>
                    <li className="addItem">add <br/><i className="plusMed medium" onClick={this.addTask}/><br/> new <br/></li>
                    {tasks.map((item,idx) =>{
                        return(
                            <Task 
                            key={idx}
                            name={item[0]} 
                            number={idx} 
                            deleteCurrentTask={this.removeTask} 
                            renameCurrentTask={this.renameTask} 
                            openCurrentTask={this.openTask}
                            />
                         );
                    },this)}
                </ul>
            </div>
            <div className="tableWrap">
                <h2>{this.state.openedTask ? this.state.openedTask : 'choose your task'}</h2>
                <table >
                    <thead>
                        <tr>
                                <th  colSpan="2">Steps TODO {this.state.openedTask ? <i className="plusSmall small goLower"onClick={this.addStep}></i> : null}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stepsTODO.map((item,idx) => {
                            return (<Step 
                                    stepText={item} 
                                    key={idx} 
                                    done={0}
                                    number={idx} 
                                    editCurrentStep={this.editStep}
                                    markCurrentStep={this.markAs}
                                    deleteCurrentStep={this.removeStep} 
                                    />);
                    },this)}
                    </tbody>
                    <thead>
                        <tr>
                            <th colSpan="2">Steps DONE</th>
                        </tr>
                    </thead>
                    <tbody>
                    {stepsDone.map((item,idx) => {
                        return (<Step 
                               stepText={item} 
                               key={idx} 
                               done={1} 
                               number={idx}      
                               editCurrentStep={this.editStep} 
                               markCurrentStep={this.markAs}
                               deleteCurrentStep={this.removeStep}
                               />);
                    },this)}
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}
ReactDOM.render(
  <TODOapp/>,
  document.getElementById('root')
);

