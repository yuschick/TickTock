// Moonphase Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The moonphase class still uses the native Date constructor in JavaScript.
// Based on the current date it returns, the moon's position is calculated and
// a numeric value is returned. Based on this value, the moonphase indicator is
// rotated.

// http://stackoverflow.com/questions/11759992/calculating-jdayjulian-day-in-javascript
// http://jsfiddle.net/gkyYJ/
// http://stackoverflow.com/users/965051/adeneo
Date.prototype.getJulian = function() {
    return ((this / 86400000) - (this.getTimezoneOffset() / 1440) + 2440587.5);
};

class MoonPhase {
    constructor(settings, parentWatch) {
        this.errorChecking(settings);

        this.parent = parentWatch;
        this.rightNow = new Date();
        this.element = document.getElementById(settings.id || settings);
        this.invert = settings.invert || false;

        if (!this.parent.testing) this.init();
    }

    errorChecking(settings) {
        if (typeof settings === 'object') {
            if (!settings.id) throw new ReferenceError('The MoonPhase class requires that an ID of the moonphase element be provided.');
        } else if (typeof settings !== 'string') {
            throw new ReferenceError('The Moonphase Indicator class expects either a settings object or a string containing the element\'s ID.');
        }
    }

    rotateDisc(val) {
        val = this.invert ?
            val * -1 :
            val;
        this.element.style.transform = `rotate(${val}deg)`;
    }

    /*
      Shouts to: https://github.com/tingletech/moon-phase
    */
    moon_day(today) {
        let GetFrac = (fr) => {
            return (fr - Math.floor(fr));
        };

        let thisJD = today.getJulian();
        let year = today.getFullYear();
        let degToRad = 3.14159265 / 180;
        let K0, T, T2, T3, J0, F0, M0, M1, B1, oldJ;

        K0 = Math.floor((year - 1900) * 12.3685);
        T = (year - 1899.5) / 100;
        T2 = T * T;
        T3 = T * T * T;
        J0 = 2415020 + 29 * K0;
        F0 = 0.0001178 * T2 - 0.000000155 * T3 + (0.75933 + 0.53058868 * K0) - (0.000837 * T + 0.000335 * T2);
        M0 = 360 * (GetFrac(K0 * 0.08084821133)) + 359.2242 - 0.0000333 * T2 - 0.00000347 * T3;
        M1 = 360 * (GetFrac(K0 * 0.07171366128)) + 306.0253 + 0.0107306 * T2 + 0.00001236 * T3;
        B1 = 360 * (GetFrac(K0 * 0.08519585128)) + 21.2964 - (0.0016528 * T2) - (0.00000239 * T3);

        let phase = 0;
        let jday = 0;

        while (jday < thisJD) {
            let F = F0 + 1.530588 * phase;
            let M5 = (M0 + phase * 29.10535608) * degToRad;
            let M6 = (M1 + phase * 385.81691806) * degToRad;
            let B6 = (B1 + phase * 390.67050646) * degToRad;
            F -= 0.4068 * Math.sin(M6) + (0.1734 - 0.000393 * T) * Math.sin(M5);
            F += 0.0161 * Math.sin(2 * M6) + 0.0104 * Math.sin(2 * B6);
            F -= 0.0074 * Math.sin(M5 - M6) - 0.0051 * Math.sin(M5 + M6);
            F += 0.0021 * Math.sin(2 * M5) + 0.0010 * Math.sin(2 * B6 - M6);
            F += 0.5 / 1440;
            oldJ = jday;
            jday = J0 + 28 * phase + Math.floor(F);
            phase++;
        }

        // 29.53059 days per lunar month
        return (((thisJD - oldJ) / 29.53059));
    }


    /*
      Shouts to: https://github.com/tingletech/moon-phase
    */
    getCurrentPhase(phase) {
        let sweep = [];
        let mag;

        if (phase <= 0.25) {
            sweep = [1, 0];
            mag = 20 - 20 * phase * 4
        } else if (phase <= 0.50) {
            sweep = [0, 0];
            mag = 20 * (phase - 0.25) * 4
        } else if (phase <= 0.75) {
            sweep = [1, 1];
            mag = 20 - 20 * (phase - 0.50) * 4
        } else if (phase <= 1) {
            sweep = [0, 1];
            mag = 20 * (phase - 0.75) * 4
        } else {
            return;
        }

        phase = phase.toFixed(5) * 3.6;
        this.rotateDisc(phase * 100);
    }

    init() {
        this.getCurrentPhase(this.moon_day(this.rightNow));
    }
}

module.exports = MoonPhase;