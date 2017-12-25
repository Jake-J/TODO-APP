import React from 'react';
import PropTypes from 'prop-types';

export class Step extends React.Component {
    constructor(props){
        super(props);
        this.showEditor = this.showEditor.bind(this);
        this.saveName = this.saveName.bind(this);
        this.checkCurrentElement = this.checkCurrentElement.bind(this);
        this.deleteCurrentStep = this.deleteCurrentStep.bind(this);
        this.uncheckCurrentStep = this.uncheckCurrentStep.bind(this);
        this.markCurrentStep = this.markCurrentStep.bind(this);
        this.state = {
            editing:null
        }
    }
    showEditor(e){
        if(!this.state.editing){
            this.setState({
                editing:true
            })
        } else if(!e.target.type){
            this.props.editCurrentStep(this.textInput.value,this.props.number,this.props.stepText,this.props.done);
            this.setState({
                editing:null
            })
        }
    }
    saveName(e){
        e.preventDefault();
        
        const input = e.target.firstChild;

        this.props.editCurrentStep(input.value,this.props.number,this.props.stepText,this.props.done);
        this.setState({
            editing:null
        })
        
    }
    checkCurrentElement(){
        this.props.checkCurrentStep(this.props.number);
    }
    uncheckCurrentStep(){
        this.props.uncheckCurrentStep(this.props.number);
    }
    deleteCurrentStep(){
        this.props.deleteCurrentStep(this.props.number,this.props.done);
    }
    markCurrentStep(){
        this.props.markCurrentStep(this.props.number,this.props.done);
    }
    render(){
        let stepText = this.props.stepText;
        const editing = this.state.editing;

        if(editing){
            stepText = (
                <form onSubmit={this.saveName}>
                  <input type="text"  
                        defaultValue={stepText}
                        autoFocus
                        ref={(input) => { this.textInput = input; }} 
                        />
                </form>
              );
        }
        return(
        <tr>
            <td className="stepText" onDoubleClick={this.showEditor}>{stepText}</td>
            <td className="stepIcons">
                <i className="edit small step hint"onClick={this.showEditor}><span>rename step</span></i>
                {!this.props.done ? <i className="checked small step hint" onClick={this.markCurrentStep}><span>mark as done</span></i> : null}
                {this.props.done ? <i className="unchecked small step hint" onClick={this.markCurrentStep}><span>mark as undone</span></i> : null}
                <i className="delete small step  hint" onClick={this.deleteCurrentStep}><span>delete task</span></i>
            </td>
        </tr>
        )
    }
}

Step.propTypes = {
    deleteCurrentStep: PropTypes.func.isRequired,
    done: PropTypes.number.isRequired,
    editCurrentStep: PropTypes.func.isRequired,
    markCurrentStep: PropTypes.func.isRequired,
    number:PropTypes.number.isRequired,
    stepText:PropTypes.string.isRequired
}