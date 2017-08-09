import React, {Component} from 'react';
import SVGWatch from './components/SVGWatch/SVGWatch';
import SecondaryNav from './components/SecondaryNav/SecondaryNav';
import ComplicationContainer from './components/ComplicationContainer/ComplicationContainer';

class Home extends Component {
  constructor() {
    super();

    this.updateActiveDemo = this.updateActiveDemo.bind(this);
    this.toggleCodeBlock = this.toggleCodeBlock.bind(this);

    this.state = {
      activeDemo: 'perpetual-calendar',
      showCode: false,
    };
  }

  updateActiveDemo(demo) {
    const activeDemo = demo;
    this.setState({activeDemo, showCode: false});
  }

  toggleCodeBlock(event) {
    event.preventDefault();

    const showCode = !this.state.showCode;
    this.setState({showCode});
  }

  render() {
    return (
      <div>
        <section className='panel flex-container-column center-content has-gears'>
          <div className='container'>
            <div className='header-watch-container'>
              <SVGWatch watch='header' />
            </div>
            <h1>TickTock <span>JS</span></h1>
            <h3 className='has-spacer'>making digital time mechanical</h3>
            <p className='is-capped is-centered'>
              Bring your favorite watches and clocks to the digital world with TickTock.js, a library geared toward animating elements to replicate mechanical complications.
            </p>
            <section className='panel install-container center-content'>
              <div className='code-block-container'>
                <code>yarn add ticktock-js --dev</code>
              </div>
              <div className='code-block-container'>
                <code>npm install ticktock-js --save-dev</code>
              </div>
            </section>
          </div>
        </section>
        <section className='panel is-shaded'>
          <div className='container'>
            <h4 className='is-light'>Complications</h4>
              <SecondaryNav active={this.state.activeDemo} update={this.updateActiveDemo} />
              <ComplicationContainer toggle={this.toggleCodeBlock} showCode={this.state.showCode} id='dials' demo='dial-demo' active={this.state.activeDemo === 'dials'} docs='dials-overview'  />
              <ComplicationContainer toggle={this.toggleCodeBlock} showCode={this.state.showCode} id='perpetual-calendar' demo='perpetual-calendar-demo' active={this.state.activeDemo === 'perpetual-calendar'} docs='calendars-header'  />
              <ComplicationContainer toggle={this.toggleCodeBlock} showCode={this.state.showCode} id='day-night-indicator' demo='day-night-indicator-demo' active={this.state.activeDemo === 'day-night-indicator'} docs='day-night-overview'  />
              <ComplicationContainer toggle={this.toggleCodeBlock} showCode={this.state.showCode} id='manual-time' demo='manual-time-demo' active={this.state.activeDemo === 'manual-time'} docs='crown-overview'  />
              <ComplicationContainer toggle={this.toggleCodeBlock} showCode={this.state.showCode} id='minute-repeater' demo='minute-repeater-demo' active={this.state.activeDemo === 'minute-repeater'} docs='minute-repeater-header'  />
              <ComplicationContainer toggle={this.toggleCodeBlock} showCode={this.state.showCode} id='moonphase' demo='moonphase-demo' active={this.state.activeDemo === 'moonphase'} docs='moonphase-header'  />
              <ComplicationContainer toggle={this.toggleCodeBlock} showCode={this.state.showCode} id='power-reserve' demo='power-reserve-demo' active={this.state.activeDemo === 'power-reserve'} docs='reserve-header'  />
            </div>
          </section>
          <section className='panel container'>
            <h4>About</h4>
            <p>
              TickTock originated out of my love for the art of watchmaking. Recreating numerous pieces had provided design and development challenges which have culminated into this library. It should be noted though that TickTock is heavily dependent upon the design
              of the elements being animated.
            </p>
            <p>
              Many complications in physical watches and clocks consist of rotating discs. Whether that be moonphases or date indicators, TickTock expects many of its components to be designed as a disc that will rotate from its center point. Transform origin points
              may need to be manually set in the CSS when rotating other elements, such as hands, for the time being. And for best browser support (looking at you, Firefox), these transform-origin values should be specified as pixels versus directional words
              like {String.fromCharCode(39)}center{String.fromCharCode(39)} and {String.fromCharCode(39)}bottom{String.fromCharCode(39)}.
            </p>
            <p>
              Understandably, this is a very niche library but I found myself wanting to re-use many of these components so why not open it up for others. I welcome contributions from others who also admire watchmaking. Take a look at the <a href='https://github.com/yuschick/TickTock/tree/master'>README on Github</a>        to find functionality already on the ToDo list or feel free to send a PR for complications or updates to things I have missed.
            </p>
          </section>
        </div>
    );
  }
}

export default Home;
