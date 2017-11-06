// Crown Class
// @params settings: object
// @params parentWatch: Watch instance
//
// The crown class allows a user to manually set the watche's time and wind a
// power reserve. The crown by default toggles an active class when triggered.

class Crown {
    constructor(settings, parentWatch) {
        if (!settings.id) throw new ReferenceError("The Crown class requires that an ID of the crown element be provided.");

        this.crown = document.getElementById(settings.id);
        this.parent = parentWatch;
        this.crownActive = false;

        if (!this.parent.testing) this.init();
    }

    toggleCrown() {
        this.crownActive = !this.crownActive;
        this.parent.manualInstances.forEach((instance) => {
            if (instance.toggleActiveCrown)
                instance.toggleActiveCrown();
        });

        if (this.crownActive) {
            this.parent.stopInterval();
            this.crown.classList.add('active');
            this.parent.manualInstances.forEach((instance) => {
                if (instance.toggleSettingTime)
                    instance.toggleSettingTime();
            });
        } else {
            this.parent.startInterval();
            this.parent.resetActiveDial();
            this.crown.classList.remove('active');
            this.parent.manualInstances.forEach((instance) => {
                if (instance.toggleSettingTime)
                    instance.toggleSettingTime();
                if (instance.updateToManualTime)
                    instance.updateToManualTime();
            });
        }
    }

    updateCursorForTrigger() {
        this.crown.style.cursor = 'pointer';
    }

    init() {
        this.updateCursorForTrigger();
        this.crown.addEventListener('click', () => {
            this.toggleCrown();
        });
    }
}

module.exports = Crown;