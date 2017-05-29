// JS import fulfills the same function as Ruby's require. The module's export
// is stored in a variable called React for our usage. The module is called
// 'react' and is a third-party package specified in our package.json (similar
// to a gem in a Gemfile).
import React from 'react';
import ReactDOM from 'react-dom';

// This import is not from a third-party, but instead a relative import of the
// App component, where our clock logic all lives.
import App from './App';

// React also lets you import CSS. That's a topic for another repo, but if
// you're really curious, read up on "CSS in JS" for reasoning. :)
import './index.css';

// Find the <div id="root"> element and inject our App component into it.
// This implies that the contents of this div are now controlled by React,
// and shouldn't be further manipulated by us (e.g. using jQuery).
ReactDOM.render(<App />, document.getElementById('root'));
