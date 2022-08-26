import React from 'react';
import ReactDOM from 'react-dom/client';
import pages from '#/pages.config.json';

class App extends React.Component {
    linkTo(page) {
        window.location.href = `/${page.name}.html`
    }

    render() {
        return <ul>{
            pages.map(page => <li onClick={() => this.linkTo(page)} key={page.name}>{page.title}</li>)
        }</ul>
    }
}

ReactDOM.createRoot(document.getElementById('app'))
    .render(<App />)