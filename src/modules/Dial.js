// Dial Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The Dial class also brings in Moment-Timezone to better support 
// timezone values for dual-time displays. Based on the given time of the current
// or provided timezone, hour, minute, and second hands are rotated.
// The dial class supports telling time in 12 or 24 hour formats. Based on this
// format, the hour hand is either rotated 30 or 15 degrees per hour.

const Timezone = require('moment-timezone');

class Dial {
    constructor(settings, parentWatch) {
        this.errorChecking(settings);

        if (this.error) return;

        this.name = settings.name;
        this.hands = {};
        if (settings.hands.hour)
            this.hands.hour = document.getElementById(settings.hands.hour);
        if (settings.hands.minute)
            this.hands.minute = document.getElementById(settings.hands.minute);
        if (settings.hands.second)
            this.hands.second = document.getElementById(settings.hands.second);

        this.retrograde = {};

        if (settings.retrograde) {
            if (settings.retrograde.second) {
                this.retrograde.second = {
                    hand: document.getElementById(settings.retrograde.second.id),
                    max: settings.retrograde.second.max || 180,
                    duration: settings.retrograde.second.duration || 60,
                    increment: settings.retrograde.second.max / (settings.retrograde.second.duration || 60)
                };
                this.hands.second = this.retrograde.second.hand;
            }
        }

        this.parent = parentWatch;

        this.format = settings.format ?
            settings.format :
            12;

        this.timezone;
        if (settings.timezone) {
            this.timezone = settings.timezone;
        } else {
            this.timezone = Timezone.tz.guess();
        }

        this.sweepingSeconds = settings.sweep || false;

        this.rightNow = this.parent.rightNow;
        this.currentTime = {};

        this.rotateValues = {
            hoursRotateVal: this.format === 12 ?
                30 : 15,
            hoursRotateValOffset: this.format === 12 ?
                0.5 : 0.25,
            hourJump: 30,
            minutesRotateVal: 6
        };

        this.interval = null;
        this.crownActive = false;
        this.manualTime = false;
        this.settingTime = false;
        this.transition = {};

        if (!this.parent.testing) this.init();
    }

    errorChecking(settings) {
        if (!settings.hands) throw new ReferenceError('The Dial class needs an object containing the HTML elements for the hands.');
        if (settings.retrograde && settings.retrograde.second && !settings.retrograde.second.id) throw new ReferenceError('The retrograde second requires an id property be provided.');
        if (settings.retrograde && settings.hands.second && settings.retrograde.second) throw new ReferenceError('A dial can only support one second hand at a time - either traditional or retrograde.');
        if (settings.retrograde && settings.retrograde.second.duration < 5) throw new ReferenceError('The retrograde second hand requires a duration no less than 5.');
        if (settings.retrograde && 60 % settings.retrograde.second.duration != 0) throw new ReferenceError('The retrograde second hand requires a duration that is evenly divisble by 60.');
    }

    toggleActiveCrown() {
        this.crownActive = !this.crownActive;
    }

    toggleSettingTime() {
        this.settingTime = !this.settingTime;
    }

    updateToManualTime() {
        this.manualTime = true;
    }

    startInterval() {
        this.interval = setInterval(() => {
            this.getCurrentTime();
            this.rotateElement();
        }, 1000);
    }

    stopInterval() {
        clearInterval(this.interval);
        this.interval = null;
    }

    applySweepingTransition() {
        this.hands.second.style.transition = 'transform 1s linear';
    }

    getCurrentTime() {
        this.rightNow = this.parent.rightNow.tz(this.timezone);
        let currentTime;

        currentTime = {
            hours: this.rightNow.hours(),
            minutes: this.rightNow.minutes(),
            seconds: this.rightNow.seconds()
        }

        this.currentTime = currentTime;
    }

    checkForDayNightUpdates() {
        this.parent.dayNightIndicator.convertAngleToHours(this.name);
    }

    rotateElement(dir = null) {
        let rotateVal;

        if (this.hands.hour) {
            let hourOffset = this.rotateValues.hoursRotateValOffset;
            rotateVal = this.parent.getCurrentRotateValue(this.hands.hour);
            if (this.settingTime) {
                if (dir) {
                    rotateVal -= hourOffset;
                } else {
                    rotateVal += hourOffset;
                }
            } else if (this.manualTime) {
                if (this.currentTime.seconds === 0) {
                    rotateVal = this.parent.getCurrentRotateValue(this.hands.hour) + this.rotateValues.hoursRotateValOffset;
                }
            } else {
                rotateVal = (this.currentTime.hours * this.rotateValues.hoursRotateVal) + (this.currentTime.minutes * this.rotateValues.hoursRotateValOffset);
            }

            if (rotateVal === 0 || rotateVal >= 360) {
                this.transition.hour = this.hands.hour.style.transition;
                this.hands.hour.style.transition = 'none';
            } else if (rotateVal > 0 && this.hands.hour.style.transition === 'none') {
                this.hands.hour.style.transition = this.transition.hour;
            }

            if (rotateVal > 360) {
                rotateVal -= 360;
            }

            this.hands.hour.style.transform = `rotate(${rotateVal}deg)`;
        }

        if (this.hands.minute) {
            rotateVal = this.parent.getCurrentRotateValue(this.hands.minute);
            if (this.settingTime) {
                if (dir) {
                    rotateVal -= this.rotateValues.minutesRotateVal;
                } else {
                    rotateVal += this.rotateValues.minutesRotateVal;
                }
            } else if (this.manualTime) {
                if (this.currentTime.seconds === 0) {
                    rotateVal += this.rotateValues.minutesRotateVal;
                }
            } else {
                rotateVal = this.currentTime.minutes * this.rotateValues.minutesRotateVal;
            }

            if (rotateVal === 0) {
                this.transition.minute = this.hands.minute.style.transition;
                this.hands.minute.style.transition = 'none';
            } else if (rotateVal > 0 && this.hands.minute.style.transition === 'none') {
                this.hands.minute.style.transition = this.transition.minute;
            }

            this.hands.minute.style.transform = `rotate(${rotateVal}deg)`;
        }

        if (this.hands.second) {
            if (this.retrograde.second) {
                rotateVal = this.currentTime.seconds * this.retrograde.second.increment;
            } else {
                rotateVal = this.currentTime.seconds * this.rotateValues.minutesRotateVal;
            }

            if (this.retrograde.second && rotateVal > this.retrograde.second.max) {
                rotateVal = rotateVal % this.retrograde.second.max || this.retrograde.second.max;
            }

            if (
                rotateVal === 0 ||
                (
                    this.retrograde.second &&
                    rotateVal === this.retrograde.second.increment &&
                    this.hands.second.style.transition !== 'none'
                )
            ) {
                this.transition.second = this.hands.second.style.transition;
                this.hands.second.style.transition = 'none';
            } else if (rotateVal > 0 && this.hands.second.style.transition === 'none') {
                this.hands.second.style.transition = this.transition.second;
            }

            this.hands.second.style.transform = `rotate(${rotateVal}deg)`;
        }

        if (this.parent.dayNightIndicator && !this.settingTime) this.checkForDayNightUpdates();
    }

    init() {
        setTimeout(() => {
            this.getCurrentTime();
            this.rotateElement();

            setTimeout(() => {
                if (this.hands.second && this.sweepingSeconds) {
                    this.applySweepingTransition();
                }
            }, 100);

        }, 350);
    }
}

module.exports = Dial;