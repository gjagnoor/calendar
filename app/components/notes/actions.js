import React from 'react';
import store from '../../store/store.js';

class Actions extends React.Component {
    constructor (props) {
        super (props);
        this.state = store.getState();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {

    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render () {
        return (
            <div className="flex-row-right snuggle-fit">
                <div className="fas fa-download" onClick = {this.handleClick}></div>
            </div>
        )
    }
}

export default Actions;