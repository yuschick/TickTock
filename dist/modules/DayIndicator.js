'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// DayIndicator Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The day class recei ved a Moment object from the parent watch class. Based on
// this object's day, the element is rotated 51.43 degrees to show the day name.
// Additionally, the day indicator can be offset by the hours in which case the
// indicator is rotated an additional 2.14 degrees for each hour of the day.

var DayIndicator = function () {
    function DayIndicator(settings, parentWatch) {
        _classCallCheck(this, DayIndicator);

        this.errorChecking(settings);

        this.element = document.getElementById(settings.id || settings);
        this.parent = parentWatch;
        this.day = this.parent.rightNow.day();
        this.hours = this.parent.rightNow.hours();
        this.offsetHours = settings.offsetHours || false;

        this.retrograde = settings.retrograde || null;
        this.max = this.retrograde ? this.retrograde.max : 180;
        this.invert = settings.invert || false;

        if (!this.parent.testing) this.init();
    }

    _createClass(DayIndicator, [{
        key: 'errorChecking',
        value: function errorChecking(settings) {
            if ((typeof settings === 'undefined' ? 'undefined' : _typeof(settings)) === 'object') {
                if (!settings.id) throw new ReferenceError("The Day Indicator class requires that an ID of the element be provided.");
            } else if (typeof settings !== 'string') {
                throw new ReferenceError('The Day Indicator class expects either a settings object or a string containing the element\'s ID.');
            }
        }
    }, {
        key: 'getRotateValue',
        value: function getRotateValue() {
            var value = 0;

            if (this.retrograde) {
                var rotateValue = this.max / 7;
                value = this.day * rotateValue;
            } else {
                value = this.day * 51.43;
                if (this.offsetHours) {
                    value += this.hours * 2.14;
                }
            }

            if (this.invert) value *= -1;

            return value;
        }
    }, {
        key: 'rotateElement',
        value: function rotateElement() {
            this.element.style.transform = 'rotate(' + this.getRotateValue() + 'deg)';
        }
    }, {
        key: 'init',
        value: function init() {
            this.rotateElement();
        }
    }]);

    return DayIndicator;
}();

module.exports = DayIndicator;