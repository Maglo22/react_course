// babel -> babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
// live-server -> live-server public

// JSX - JavaScript XML
const app = document.getElementById('app');

const appDetails = {
    title: 'Indecision',
    subtitle: 'React project',
    options: []
};

const onFormSubmit = (event) => {
    event.preventDefault();

    const newOption = event.target.elements.option.value;

    if(newOption) {
        appDetails.options.push(newOption);
        event.target.elements.option.value = '';
        render();
    }
    
};

const removeAll = () => {
    appDetails.options = [];
    render();
}

const onMakeDecision = () => {
    const index = Math.floor(Math.random() * appDetails.options.length);
    const selectedOption = appDetails.options[index];

    if(selectedOption) {
        alert(selectedOption);
    }
};

let details = null;

const toggleDetails = () => {
    details ? details = null : details = 'Lmamao';
    render();
}

const render = () => {
    const template = (
        <div>
            <h1>{ appDetails.title }</h1>
            { appDetails.subtitle && <p>{ appDetails.subtitle }</p> }
            <button onClick={ onMakeDecision } disabled={ appDetails.options.length == 0 }>What should I do?</button>
            <button onClick={ removeAll }>Remove all</button>
            <form onSubmit={ onFormSubmit }>
                <input type="text" name="option"/>
                <button>Add option</button>
            </form>
            <p>{ appDetails.options.length > 0 ? 'Here are your options:' : 'No options' }</p>
            <ol>
            { 
                appDetails.options.map((option, index) => <li key={ index }>{ option }</li>)
            }
            </ol>
            <button onClick={ toggleDetails }>{ details ? 'Hide details' : 'Show details' }</button>
            <p>{ details }</p>
        </div>
    );
    
    ReactDOM.render(template, app);
};

render();