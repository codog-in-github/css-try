import React from 'react';
import PropTypes from 'prop-types';

export class Screen extends React.Component {
    static SRCEEN_MAX_LEN = 6
    static propTypes = {
        text: PropTypes.string
    }
    render() {
        const numbers = Array(Screen.SRCEEN_MAX_LEN)
        for(let i = 0; i < numbers.length; i++) {
            numbers[i] = <Digital
                number={this.props.text[
                    this.props.text.length - Screen.SRCEEN_MAX_LEN + i
                ] ?? ''}
                key={i}
            />
        }
        return <div className="screen">{numbers}</div>
    }
}

class Digital extends React.Component {
    static TOP_MAP = [
        ['0', '1', '2'],      //0
        ['2'],                //1
        ['1', '2', '3'],      //2
        ['1', '2', '3'],      //3
        ['0', '2', '3'],      //4
        ['0', '1', '3'],      //5
        ['0', '1', '3'],      //6
        ['1', '2'],           //7
        ['0', '1', '2', '3'], //8
        ['0', '1', '2', '3'], //9
    ]
    static BOTTOM_MAP = [
        ['0', '2', '3'],      //0
        ['2'],                //1
        ['0', '1', '3'],      //2
        ['1', '2', '3'],      //3
        ['1', '2'],           //4
        ['1', '2', '3'],      //5
        ['0', '1', '2', '3'], //6
        ['2'],                //7
        ['0', '1', '2', '3'], //8
        ['1', '2', '3'],      //9
    ]
    static propTypes = {
        number: PropTypes.string
    }
    render() {
        return <div className="digital">
            <div className="digital__dot"></div>
            <div className={this.className(this.props.number, 'top')}></div>
            <div className={this.className(this.props.number, 'bottom')}></div>
        </div>
    }

    className(number, type) {
        let namekey
        let className
        if(type === 'top') {
            className = 'digital__top digital__item';
            namekey = 'TOP_MAP';
        } else {
            className = 'digital__bottom digital__item';
            namekey = 'BOTTOM_MAP';
        }
        for(const id of Digital[namekey][number] ?? []) {
            className += ` active-${id}`
        }
        return className
    }
}