'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// babel -> babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
// live-server -> live-server public

// parent component

// class base component
var IndecisionApp = function (_React$Component) {
    _inherits(IndecisionApp, _React$Component);

    function IndecisionApp(props) {
        _classCallCheck(this, IndecisionApp);

        // bind to component to avoid losing context
        var _this = _possibleConstructorReturn(this, (IndecisionApp.__proto__ || Object.getPrototypeOf(IndecisionApp)).call(this, props));

        _this.handleRemoveOptions = _this.handleRemoveOptions.bind(_this);
        _this.handleRemoveOption = _this.handleRemoveOption.bind(_this);
        _this.handlePick = _this.handlePick.bind(_this);
        _this.handleAddOption = _this.handleAddOption.bind(_this);

        _this.state = {
            options: []
        };
        return _this;
    }

    // after component inits


    _createClass(IndecisionApp, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            try {
                var json = localStorage.getItem('options');
                var options = JSON.parse(json);
                if (options) {
                    this.setState(function () {
                        return { options: options };
                    });
                }
            } catch (e) {
                console.warn('falling back to default value');
            }
        }

        // after component updates

    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps, prevState) {
            if (prevState.options.length !== this.state.options.length) {
                var json = JSON.stringify(this.state.options);
                localStorage.setItem('options', json);
            }
        }

        // before component gets removed

    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            console.log('unmount');
        }

        // choose a random option and alert it

    }, {
        key: 'handlePick',
        value: function handlePick() {
            var index = Math.floor(Math.random() * this.state.options.length);
            var selectedOption = this.state.options[index];

            if (selectedOption) {
                alert(selectedOption);
            }
        }

        // add a new option to the array of options

    }, {
        key: 'handleAddOption',
        value: function handleAddOption(option) {
            // return error messages
            if (!option) {
                return 'Enter valid value to add item';
            } else if (this.state.options.indexOf(option) >= 0) {
                return 'This option already exists';
            }

            // updates state of options
            this.setState(function (prevState) {
                return { options: prevState.options.concat(option) };
            });
        }

        // remove an option

    }, {
        key: 'handleRemoveOption',
        value: function handleRemoveOption(optionToRemove) {
            this.setState(function (prevState) {
                return {
                    // return all options that are not the one to remove
                    options: prevState.options.filter(function (option) {
                        return optionToRemove !== option;
                    })
                };
            });
        }

        // remove all options

    }, {
        key: 'handleRemoveOptions',
        value: function handleRemoveOptions() {
            this.setState(function () {
                return { options: [] };
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var subtitle = 'Put your life in the hands of a computer';

            return React.createElement(
                'div',
                null,
                React.createElement(Header, { subtitle: subtitle }),
                React.createElement(Action, {
                    hasOptions: this.state.options.length > 0,
                    handlePick: this.handlePick
                }),
                React.createElement(Options, {
                    options: this.state.options,
                    handleRemoveOptions: this.handleRemoveOptions,
                    handleRemoveOption: this.handleRemoveOption
                }),
                React.createElement(AddOption, { handleAddOption: this.handleAddOption })
            );
        }
    }]);

    return IndecisionApp;
}(React.Component);

// --- child components --- //

// stateless component


var Header = function Header(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            props.title
        ),
        props.subtitle && React.createElement(
            'h2',
            null,
            props.subtitle
        )
    );
};

Header.defaultProps = {
    title: 'Indecision'
};

// action button
var Action = function Action(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            {
                onClick: props.handlePick,
                disabled: !props.hasOptions
            },
            'What should I do?'
        )
    );
};

// available options
var Options = function Options(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'button',
            { onClick: props.handleRemoveOptions },
            'Remove all'
        ),
        props.options.length === 0 && React.createElement(
            'p',
            null,
            'No options'
        ),
        props.options.length > 0 && React.createElement(
            'p',
            null,
            'Options:'
        ),
        props.options.map(function (option, index) {
            return React.createElement(Option, {
                key: index,
                optionText: option,
                handleRemoveOption: props.handleRemoveOption });
        })
    );
};

// renders each option
var Option = function Option(props) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'p',
            null,
            props.optionText
        ),
        React.createElement(
            'button',
            {
                // handle button event
                onClick: function onClick(e) {
                    props.handleRemoveOption(props.optionText);
                }
            },
            'Remove'
        )
    );
};

// form to add a new option

var AddOption = function (_React$Component2) {
    _inherits(AddOption, _React$Component2);

    function AddOption(props) {
        _classCallCheck(this, AddOption);

        // bind to not lose context
        var _this2 = _possibleConstructorReturn(this, (AddOption.__proto__ || Object.getPrototypeOf(AddOption)).call(this, props));

        _this2.handleAddOption = _this2.handleAddOption.bind(_this2);

        _this2.state = {
            error: undefined
        };
        return _this2;
    }

    // add a new option to options array


    _createClass(AddOption, [{
        key: 'handleAddOption',
        value: function handleAddOption(event) {
            event.preventDefault();

            var newOption = event.target.elements.option.value.trim();
            // if something gets returned -> error
            var error = this.props.handleAddOption(newOption);

            this.setState(function () {
                return { error: error };
            });

            if (!error) {
                event.target.elements.option.value = '';
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                this.state.error && React.createElement(
                    'p',
                    null,
                    this.state.error
                ),
                React.createElement(
                    'form',
                    { onSubmit: this.handleAddOption },
                    React.createElement('input', { type: 'text', name: 'option' }),
                    React.createElement(
                        'button',
                        null,
                        'Add Option'
                    )
                )
            );
        }
    }]);

    return AddOption;
}(React.Component);

// render app


ReactDOM.render(React.createElement(IndecisionApp, null), document.getElementById('app'));
