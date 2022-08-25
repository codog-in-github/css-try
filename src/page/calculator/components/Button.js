import React from 'react';
import propTypes from 'prop-types'

export class Button extends React.Component {
    static propTypes = {
        children: propTypes.any,
        onClick: propTypes.func,
        disabled: propTypes.bool,
    }

    render() {
        return <div className={'button' + (this.props.disabled ? ' disabled' : '')} onClick={this.props.onClick}>{
            this.props.children
        }</div>;
    }
}