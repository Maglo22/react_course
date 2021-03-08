import React from 'react';

// renders each option
const Option = (props) => (
    <div className="option">
        <p className="option__text">{ props.count }. { props.optionText }</p>
        <button
        className="button button--link"
            // handle button event
            onClick={ (e) => {
                props.handleRemoveOption(props.optionText);
            } }
        >
            Remove
        </button>
    </div>
);

export default Option;