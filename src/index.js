/**
 * A React implementation of the Ada Trek project, to demonstrate some
 * differences between React and the regular templating approach.
 *
 * This version uses no ES6 syntax, so it's more approachable for someone
 * who hasn't yet gotten familiar with ES6. If you want the cleaner ES6 syntax,
 * check out the branch 'es6-version'.
 */

// JS require fulfills the same function as Ruby's require. The module's export
// (in this case, the class exported by the 'react' module) is stored in a
// variable called React for our usage.
var React = require('react');

// Let's also require the ReactDOM module for rendering our React component to
// the HTML DOM tree.
var ReactDOM = require('react-dom');

// Let's also require the 'create-react-class' module, which is a function that
// makes React classes when ES6 syntax isn't available to you.
var createReactClass = require('create-react-class');

var MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

var DAYS_IN_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday'
];

/*
 * Below is a React class. The outcome is similar to creating a function and
 * setting its 'prototype', and using prototypical inheritance to extend the
 * React Component class. The createReactClass function takes as a parameter
 * the object with the set of functions that you'd typically set as the
 * prototype if you made the class manually.
 */

/**
 * The App component is our main component, where we'll draw out the dynamic
 * parts of the clock. Basically, any HTML that's inside the div with id "root"
 * will be manipulated solely by React.
 */
var App = createReactClass({
  getInitialState: function() {
    // Initialize the state of this component. We'll be using the state of the
    // component in our 'render' function to figure out what to draw. Every
    // time the state changes, 'render' will be called again and we'll recreate
    // the HTML anew.
    return this.getDateTime();
  },

  getDateTime: function() {
    var now = new Date();
    var year = now.getFullYear();
    var month = MONTHS[now.getMonth() - 1];
    var day = now.getDate();
    var dayOfWeek = DAYS_IN_WEEK[now.getDay()];

    var hours = now.getHours();
    var minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    var seconds = now.getSeconds();
    if (seconds < 10) {
      seconds = '0' + seconds;
    }


    // The component's state will be an object that holds the current date and
    // time.
    return {
      date: '' + dayOfWeek + ', ' + month + ' ' + day + ', ' + year,
      time: [hours, minutes, seconds].join(':')
    };
  },

  render: function() {
    // The render function is where the magic happens in React. Because we just
    // output the HTML for the current state, we never have to worry about moving,
    // appending, or deleting HTML elements currently in the DOM. So instead of using
    // jQuery to find elements and manipulate them, we just say "given the state of
    // the world now, this is the HTML we expect to see". React takes care of the rest
    // so you don't have to!

    // WTF?! HTML in JavaScript?!
    // Not exactly! This is JSX syntax -- it's React-specific syntax that
    // gets converted into actual JavaScript that creates these components.

    return (
      <div className="clock">
        <span className="date">
          {this.state.date}
        </span>
        <span className="time">
          {this.state.time}
        </span>
      </div>
    );

    // The above is ends up converting into:
    return React.createElement(
      "div",
      { className: "clock" },
      React.createElement(
        "span",
        { className: "date" },
        this.state.date
      ),
      React.createElement(
        "span",
        { className: "time" },
        this.state.time
      )
    );

    // So, once we've returned this, we've created HTML, right?
    // That's now on the page, right?
    // Not quite. We're returning a "virtual DOM", which is a way of expressing
    // the HTML that we *want*. React will compare it to the actual HTML on the
    // page, and it will make surgical changes to make the HTML into what we
    // want it to be. This is work that React does for you behind the scenes.
  },

  componentDidMount: function() {
    // So, above we told React what HTML we want. Once React makes it so, this
    // component is 'mounted' in the real HTML tree. This is a great time to
    // start our timer.
    this.intervalId = setInterval(function() {
        // Sets the component's state, and signals React to call 'render' again
        // to refresh the HTML with the new state of the world.
        this.setState(this.getDateTime());
    }.bind(this), 1000);
  },

  componentWillUnmount: function() {
    // React can also remove this component from the HTML (this happens when a
    // component that contains this one decides that it's no longer necessary
    // to include it in the HTML), then that's a great time to delete our
    // timer.
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
});

ReactDOM.render(<App />, document.getElementById('root'));
