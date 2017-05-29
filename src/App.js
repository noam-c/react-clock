/**
 * A React implementation of the Ada Trek project, to demonstrate some
 * differences between React and the regular templating approach.
 *
 * Note that this implementation uses ES6 (JavaScript 2015) and so some of it
 * may look new if you haven't used ES6 yet. I'll try my best to explain along the
 * way.
 */

// JS import fulfills the same function as Ruby's require. The module's export
// (in this case, the class exported by the 'react' module) is stored in a
// variable called React for our usage.
import React from 'react';

// ES6 introduces "let" for declaring variables.
// "let" is similar to "var", but the variable's scope is smaller. There are
// some really good explanations on the difference in this SO answer:
// https://stackoverflow.com/a/11444416
let Component = React.Component;

// "const" is also a new ES6 keyword used to denote variables that will not
// change. If you expect something to never change, and it changes anyway,
// you'll be able to use an error to track that down.
const MONTHS = [
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

const DAYS_IN_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday'
];

/*
 * Below is an ES6 class. The outcome is similar to creating a function and
 * setting its 'prototype', but this is a lot easier to work with and read,
 * especially coming from another OO language.
 */

/**
 * The App component is our main component, where we'll draw out the dynamic
 * parts of the clock. Basically, any HTML that's inside the div with id "root"
 * will be manipulated solely by React.
 */
class App extends Component {
  // Object constructor
  constructor() {
    // Runs the constructor of the class that App extends
    // (in this case, Component).
    super();

    // Initialize the state of this component. We'll be using the state of the
    // component in our 'render' function to figure out what to draw. Every
    // time the state changes, 'render' will be called again and we'll recreate
    // the HTML anew.
    this.state = this.getDateTime();
  }

  getDateTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = MONTHS[now.getMonth() - 1];
    let day = now.getDate();
    let dayOfWeek = DAYS_IN_WEEK[now.getDay()];

    let hours = now.getHours();
    let minutes = now.getMinutes();
    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    let seconds = now.getSeconds();
    if (seconds < 10) {
      seconds = '0' + seconds;
    }


    // The state will be an object that holds the current date and time.
    return {
      // ES6 introduces string interpolation, which allows you to build strings
      // out of variables without having to + them together (which often looks
      // messier).
      date: `${dayOfWeek}, ${month} ${day}, ${year}`,
      time: [hours, minutes, seconds].join(':')
    };
  }

  render() {
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
  }

  componentDidMount() {
    // So, above we told React what HTML we want. Once React makes it so, this
    // component is 'mounted' in the real HTML tree. This is a great time to
    // start our timer.
    this.intervalId = setInterval(() => {
        // Sets the component's state, and signals React to call 'render' again
        // to refresh the HTML with the new state of the world.
        this.setState(this.getDateTime());
    }, 1000);
  }

  componentWillUnmount() {
    // React can also remove this component from the HTML (this happens when a
    // component that contains this one decides that it's no longer necessary
    // to include it in the HTML), then that's a great time to delete our
    // timer.
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

// This states that if anyone requires this module, the thing that they will
// receive from it is the App class that we've created.
export default App;
