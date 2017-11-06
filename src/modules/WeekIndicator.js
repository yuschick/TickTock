// Week Indicator Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The Week Class will rotate an element to depict the 
// current week of the year. By default, this class expects 
// 52 weeks per year but an iso boolean can be passed
// to account for a 53rd week. The week indicator
// element can rotate either direction based on the 
// invert boolean as well.

class WeekIndicator {
    constructor(settings, parentWatch) {
        this.errorChecking(settings);

        this.element = document.getElementById(settings.id);
        this.parent = parentWatch;
        this.iso = settings.iso || false;
        this.invert = settings.invert || false;

        this.week = 0;
        this.weekAmount = this.iso ? 53 : 52;
        this.increment = 360 / this.weekAmount;

        this.settingTime = false;

        if (!this.parent.testing) this.init();
    }

    errorChecking(settings) {
        if (!settings.id) throw new ReferenceError('The Week Indicator class requires that an ID of the element be provided.');
    }

    toggleSettingTime() {
        this.settingTime = !this.settingTime;
    }

    getWeekValue() {
        const rightNow = this.parent.rightNow;
        this.week = this.iso ? rightNow.isoWeek() - 1 : rightNow.week() - 1;

        this.rotateElement();
    }

    getRotateValue() {
        let rotateVal = this.week * this.increment;
        if (this.invert) rotateVal *= -1;

        return rotateVal;
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
        this.getWeekValue();
    }
}

module.exports = WeekIndicator;