// Master Watch Class
// @params settings: Object
//
// The master watch class brings in all other complication components to create
// new instances as needed by the settings object.
// The class also brings in Moment.js to handle dates, times, and timezones

const Moment = require('moment');

const Dial = require('./modules/Dial');
const Crown = require('./modules/Crown');
const PowerReserve = require('./modules/PowerReserve');
const MoonPhase = require('./modules/MoonPhase');
const MinuteRepeater = require('./modules/MinuteRepeater');
const DayNightIndicator = require('./modules/DayNightIndicator');
const DayIndicator = require('./modules/DayIndicator');
const DateIndicator = require('./modules/DateIndicator');
const MonthIndicator = require('./modules/MonthIndicator');
const WeekIndicator = require('./modules/WeekIndicator');
const YearIndicator = require('./modules/YearIndicator');
const Chronograph = require('./modules/Chronograph');
const Foudroyante = require('./modules/Foudroyante');
const EquationOfTime = require('./modules/EquationOfTime');

class Watch {
    constructor(settings) {
        if (settings.testing) this.testing = true;
        if (!settings.dials) throw new ReferenceError('At least one dial is required for the Watch class.');

        this.dialInstances = [];
        this.manualInstances = [];
        this.activeDial = 0;
        this.globalInterval = null;
        this.rightNow = Moment();

        settings.dials.forEach((dial) => {
            let tempDial = new Dial(dial, this);
            this.dialInstances.push(tempDial);
            this.manualInstances.push(tempDial);
        });

        if (settings.crown) {
            this.crown = new Crown(settings.crown, this);
        }

        if (settings.reserve) {
            this.powerReserve = new PowerReserve(settings.reserve, this);
        }

        if (settings.moonphase) {
            let tempDial = new MoonPhase(settings.moonphase, this);
            this.moonphase = tempDial;
            this.manualInstances.push(tempDial);
        }

        if (settings.repeater) {
            this.repeaterDial = settings.repeater.dial || 0;
            this.repeater = new MinuteRepeater(this.dialInstances[this.repeaterDial], settings.repeater, this);
        }

        if (settings.dayNightIndicator) {
            this.dayNightIndicatorDial = settings.dayNightIndicator.dial || 0;
            let tempDial = new DayNightIndicator(this.dialInstances[this.dayNightIndicatorDial], settings.dayNightIndicator, this);
            this.dayNightIndicator = tempDial;
            this.manualInstances.push(tempDial);
        }

        if (settings.dayIndicator || settings.day) {
            let tempDial = new DayIndicator(settings.dayIndicator || settings.day, this);
            this.dayIndicator = tempDial;
            this.manualInstances.push(tempDial);
        }

        if (settings.date) {
            let tempDial = new DateIndicator(settings.date, this);
            this.dateIndicator = tempDial;
            this.manualInstances.push(tempDial);
        }

        if (settings.month) {
            this.monthIndicator = new MonthIndicator(settings.month, this);
        }

        if (settings.week) {
            let tempDial = new WeekIndicator(settings.week, this);
            this.weekIndicator = tempDial;
            this.manualInstances.push(tempDial);
        }

        if (settings.year) {
            let tempDial = new YearIndicator(settings.year, this);
            this.yearIndicator = tempDial;
            this.manualInstances.push(tempDial);
        }

        if (settings.chronograph) {
            this.chronograph = new Chronograph(settings.chronograph, this);
        }

        if (settings.foudroyante) {
            this.foudroyante = new Foudroyante(settings.foudroyante, this);
        }

        if (settings.eqTime) {
            this.equationOfTime = new EquationOfTime(settings.eqTime, this);
        }

        this.init();
    }

    getCurrentRotateValue(el) {
        let val = el.style.transform;
        let num = val.replace('rotate(', '').replace('deg)', '');
        return Number(num);
    }

    resetActiveDial() {
        this.activeDial = 0;
    }

    keyBindings() {
        window.addEventListener('keydown', () => {
            switch (event.keyCode) {
                case 37:
                    if (this.powerReserve)
                        this.powerReserve.incrementReserve();
                    break;
                case 13:
                    if (this.crown)
                        this.crown.toggleCrown();
                    break;
            }

            if (this.crown) {
                if (this.crown.crownActive) {
                    event.preventDefault();
                    switch (event.keyCode) {
                        case 37:
                            if (this.powerReserve)
                                this.powerReserve.incrementReserve();
                            break;
                        case 38:
                            this.manualInstances[this.activeDial].rotateElement();
                            break;
                        case 39:
                            this.activeDial++;

                            if (this.activeDial >= this.manualInstances.length) this.activeDial = 0;

                            break;
                        case 40:
                            this.manualInstances[this.activeDial].rotateElement('back');
                            break;
                    }
                }
            }

        });
    }

    startInterval() {
        this.globalInterval = setInterval(() => {

            this.rightNow = Moment();

            this.dialInstances.forEach((dial) => {
                dial.getCurrentTime();
                dial.rotateElement();
            });

            if (this.powerReserve) {
                this.powerReserve.decrementReserve();
            }

            /**
            To be accurate, yes, the moonphase should stop if the power reserve empties
            But is that worth making this call every second?
            **/
            if (this.moonphase) {
                this.moonphase.getCurrentPhase();
            }
        }, 1000);

        if (this.foudroyante) {
            if (!this.testing) this.foudroyante.init();
        }

    }

    stopInterval() {
        clearInterval(this.globalInterval);
        this.globalInterval = null;

        if (this.repeater) {
            this.repeater.stopAll();
        }

        if (this.foudroyante) {
            this.foudroyante.clearInterval();
        }
    }

    init() {
        this.startInterval();
        this.keyBindings();
    }
}

module.exports = Watch;