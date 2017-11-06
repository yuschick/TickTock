// DayIndicator Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The day class recei ved a Moment object from the parent watch class. Based on
// this object's day, the element is rotated 51.43 degrees to show the day name.
// Additionally, the day indicator can be offset by the hours in which case the
// indicator is rotated an additional 2.14 degrees for each hour of the day.

class DayIndicator {
    constructor(settings, parentWatch) {
        if (!settings.id) throw new ReferenceError("The Day Indicator class requires that an ID of the element be provided.");

        this.element = document.getElementById(settings.id);
        this.parent = parentWatch;
        this.day = this.parent.rightNow.day();
        this.hours = this.parent.rightNow.hours();
        this.offsetHours = settings.offsetHours || false;

        this.retrograde = settings.retrograde || null;
        this.max = this.retrograde ? this.retrograde.max : 180;
        this.invert = settings.invert || false;

        this.settingTime = false;
        this.increment = this.retrograde ? this.max / 7 : 51.43;

        if (!this.parent.testing) this.init();
    }

    toggleSettingTime() {
        this.settingTime = !this.settingTime;
    }

    getRotateValue() {
        let value = 0;

        if (this.retrograde) {
            value = (this.day) * this.increment;
        } else {
            value = this.day * this.increment;
            if (this.offsetHours) {
                value += this.hours * 2.14;
            }
        }

        if (this.invert) value *= -1;

        return value;
    }

    rotateElement(dir = null) {
        let rotateVal = 0;

        if (this.settingTime) {
            rotateVal = this.parent.getCurrentRotateValue(this.element);
            if (dir) {
                rotateVal -= this.increment;
            } else {
                rotateVal += this.increment;
            }
        } else {
            rotateVal = this.getRotateValue();
        }

        this.element.style.transform = `rotate(${rotateVal}deg)`;
    }

    init() {
        this.rotateElement();
    }
}

module.exports = DayIndicator;