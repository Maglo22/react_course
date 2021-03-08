import React from 'react';
// components
import Header from './Header'
import Action from './Action'
import Options from './Options';
import AddOption from './AddOption';
import OptionModal from './OptionModal';

// class base component
class IndecisionApp extends React.Component {
    state = {
        options: [],
        selectedOption: undefined
    };

    // choose a random option and alert it
    handlePick = () => {
        const index = Math.floor(Math.random() * this.state.options.length);
        const option = this.state.options[index];

        if (option) {
            this.setState(() => ({ selectedOption: option }));
        }
    }

    // add a new option to the array of options
    handleAddOption = (option) => {
        // return error messages
        if (!option) {
            return 'Enter valid value to add item';
        } else if (this.state.options.indexOf(option) >= 0) {
            return 'This option already exists';
        }

        // updates state of options
        this.setState((prevState) => ({ options: prevState.options.concat(option) }));
    }

    // remove an option
    handleRemoveOption = (optionToRemove) => {
        this.setState((prevState) => ({
            // return all options that are not the one to remove
            options: prevState.options.filter((option) => optionToRemove !== option)
        }));
    }

    // remove all options
    handleRemoveOptions = () => {
        this.setState(() => ({ options: [] }));
    }

    // clear selectedOption
    handleClearSelectedOption = () => {
        this.setState(() => ({ selectedOption: undefined }));
    }

    // after component inits
    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);
            if (options) {
                this.setState(() => ({ options }));
            }
        } catch (e) {
            console.warn('falling back to default value');
        }
    }

    // after component updates
    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    // before component gets removed
    componentWillUnmount() {
        console.log('unmount');
    }

    render() {
        const subtitle = 'Put your life in the hands of a computer';

        return (
            <div>
                <Header subtitle={subtitle} />
                <div className="container">
                    <Action
                        hasOptions={this.state.options.length > 0}
                        handlePick={this.handlePick}
                    />
                    <div className="widget">
                        <Options
                            options={this.state.options}
                            handleRemoveOptions={this.handleRemoveOptions}
                            handleRemoveOption={this.handleRemoveOption}
                        />
                        <AddOption handleAddOption={this.handleAddOption} />
                    </div>
                    
                </div>
                <OptionModal
                    selectedOption={this.state.selectedOption}
                    handleClearSelectedOption={this.handleClearSelectedOption}
                />
            </div>
        );
    }
};

export default IndecisionApp;