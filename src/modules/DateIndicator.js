// DateIndicator Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The Date functionality uses Moment JS to retrieve the current date. Based on
// the date, the indicator, whether a disc or hand, is rotated 11.61 degrees.
// Additionally, split displays are supported where the ones and tenths of the
// date are indicated on two separate discs that are rotated separately.
// The date can also optionally be indicated with a retrograde indicator

class DateIndicator {
    constructor(settings, parentWatch) {
        this.errorChecking(settings);

        if (settings.split) {
            this.split = true;
            this.ones = document.getElementById(settings.split.ones);
            this.tenths = document.getElementById(settings.split.tenths);
        } else {
            this.element = document.getElementById(settings.id);
            this.increment = 11.61;
        }

        this.parent = parentWatch;
        this.date = this.parent.rightNow.date();
        this.retrograde = settings.retrograde || null;
        this.max = this.retrograde ? this.retrograde.max : 180;
        this.invert = settings.invert || false;

        this.settingTime = false;

        if (!this.parent.testing) this.init();
    }

    errorChecking(settings) {
        if (!settings.id && !settings.split)
            throw new ReferenceError(
                'The Date Indicator class requires that an ID of the indiciator element be provided.'
            );
        if (settings.id && settings.split)
            throw new ReferenceError('Choose EITHER a primary or split indicator.');
        if (settings.retrograde && settings.split)
            throw new ReferenceError(
                'Choose EITHER a retrograde or split indicator.'
            );
        if (settings.split && (!settings.split.ones || !settings.split.tenths))
            throw new ReferenceError(
                'When choosing a split date display please provide the IDs for both the ones and tenths discs.'
            );
    }

    getRotateValue(type = null) {
        let value = 0;

        this.date = this.parent.rightNow.date();

        if (this.retrograde) {
            let rotateValue = this.max / 31;
            value = (this.date - 1) * rotateValue;
        } else {
            if (this.split) {
                if (type === 'ones') {
                    let ones = this.date % 10;
                    value = ones > 1 ? (ones - 1) * 36 : 36;
                } else {
                    let tenths = Math.floor(this.date / 10);
                    value = tenths * 90;
                }
            } else {
                value = (this.date - 1) * this.increment;
            }
        }

        if (this.invert) value *= -1;

        return value;
    }

    rotateElement(dir = null) {
        if (this.settingTime) {
            let currentRotateVal = this.parent.getCurrentRotateValue(this.element);
            if (this.settingTime) {
                if (dir) {
                    currentRotateVal -= this.increment;
                } else {
                    currentRotateVal += this.increment;
                }
                this.element.style.transform = `rotate(${currentRotateVal}deg)`;
            } else {
                if (this.split) {
                    this.ones.style.transform = `rotate(${this.getRotateValue('ones')}deg)`;
                    this.tenths.style.transform = `rotate(${this.getRotateValue('tenths')}deg)`;
                } else {
                    this.element.style.transform = `rotate(${this.getRotateValue()}deg)`;
                }
            }
        }
    }

    toggleSettingTime() {
        this.settingTime = !this.settingTime;
    }

    init() {
        this.rotateElement();
    }
}

module.exports = DateIndicator;