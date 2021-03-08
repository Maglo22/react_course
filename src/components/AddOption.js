import React from 'react';

// form to add a new option
export default class AddOption extends React.Component {
    state = {
        error: undefined
    };

    // add a new option to options array
    handleAddOption = (event) => {
        event.preventDefault();

        const newOption = event.target.elements.option.value.trim();
        // if something gets returned -> error
        const error = this.props.handleAddOption(newOption);

        this.setState(() => ({ error }));

        if(!error) {
            event.target.elements.option.value = '';
        }
    };

    render() {
        return (
            <div>
                { this.state.error && <p className="add-option-error">{ this.state.error }</p> }
                <form className="add-option" onSubmit={ this.handleAddOption }>
                    <input className="add-option__input" type="text" name="option"/>
                    <button className="button">Add Option</button>
                </form>
            </div>
        );
    }
}