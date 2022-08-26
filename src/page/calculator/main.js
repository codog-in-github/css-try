import React from 'react';
import ReactDOM from 'react-dom/client';
import { once } from '@/utils';
import { Button } from './components/Button';
import './style/index.less';

class App extends React.Component {
    constructor () {
        super();
        this.state = {
            count: '请按键',
            content: '',
            disabled: false,
        };
        this.readToExplode = once(this.readToExplode.bind(this))
    }
    render () {
        return <div className="container">
            <Button disabled={this.state.disabled} onClick={this.readToExplode}>{this.state.count}</Button>
            <div className="content">{ this.state.content }</div>
        </div>;
    }

    readToExplode () {
        this.setState({ disabled: true })
        let count = 50
        let timmer = setInterval(() => {
            if(count === 0) {
                clearTimeout(timmer)
                this.setState({ content: '你妈炸了',})
            } else {
                count --
                this.setState({ count })
            }
        }, 100)
    }
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);