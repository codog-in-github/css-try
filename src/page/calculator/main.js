// import moment from 'moment';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Button } from './components/Button';
import { Screen } from './components/Screen';
import './style/index.less';

class App extends React.Component {
    constructor () {
        super();
        this.state = {
            count: '请按键',
            content: 'HELLO',
            disabled: false,
        };
    }
    render () {
        return <div className="container">
            <Screen text={this.state.content}></Screen>
            <Button onClick={this.start}>{this.state.count}</Button>
        </div>;
    }
    componentDidMount () {
        let content = ' HELLO'
        setInterval(() => {
            const firstLetter = content[0]
            content =content.substring(1) + firstLetter
            this.setState({
                content,
            })
        }, 500)
    }
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);