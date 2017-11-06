const Watch = require('./../index');

(function() {
    let settings = {};
    let demo = null;

    /*
     * Dual Time Demo
     */
    settings = {
        dials: [{
            name: 'primary',
            hands: {
                hour: 'dial-primary-hour-hand',
                minute: 'dial-primary-minute-hand',
                second: 'dial-primary-second-hand',
            },
        }, {
            name: 'secondary',
            hands: {
                hour: 'dial-secondary-hour-hand',
                minute: 'dial-secondary-minute-hand',
                second: 'dial-secondary-second-hand',
            },
            sweep: true,
            timezone: 'America/New_York'
        }]
    };

    demo = new Watch(settings);

    /*
     * Minute Repeater Demo
     */
    settings = {
        dials: [{
            name: 'primary',
            hands: {
                hour: 'repeater-hour-hand',
                minute: 'repeater-minute-hand',
                second: 'repeater-second-hand',
            },
            sweep: true
        }],
        repeater: {
            id: 'repeater-btn',
            chimes: {
                hour: './dist/sounds/chime-01.mp4',
                minute: './dist/sounds/chime-02.mp4'
            }
        }
    };

    demo = new Watch(settings);

    /*
     * Chronograph  Demo
     */
    settings = {
        dials: [{
            name: 'primary',
            hands: {
                hour: 'chronograph-hour-hand',
                minute: 'chronograph-minute-hand',
                second: 'chronograph-second-hand',
            },
            sweep: true
        }],
        chronograph: {
            buttons: {
                primary: 'chronograph-primary-btn',
                secondary: 'chronograph-secondary-btn',
                tertiary: 'chronograph-tertiary-btn',

            },
            hands: {
                tenth: 'chrono-tenth-hand',
                second: 'chrono-second-hand',
                minute: 'chrono-minute-hand',
                hour: 'chrono-hour-hand',
                lap: 'chrono-lap-hand',
            },
            flyback: true
        }
    };

    demo = new Watch(settings);

    /*
     * Grande Complication  Demo
     */
    settings = {
        dials: [{
            hands: {
                hour: 'grande-hour-hand',
                minute: 'grande-minute-hand',
                second: 'grande-second-hand',
            },
        }],
        chronograph: {
            buttons: {
                primary: 'grande-primary-button',
                secondary: 'grande-secondary-button'
            },
            hands: {
                tenth: 'grande-chrono-tenth-second-hand',
                second: 'grande-chrono-second-hand',
                minute: 'grande-chrono-minute-hand',
                hour: 'grande-chrono-hour-hand'
            },
            flyback: true
        },
        repeater: {
            id: 'grande-repeater-button',
            chimes: {
                minute: './../dist/sounds/chime-01.mp4',
                hour: './../dist/sounds/chime-02.mp4'
            }
        },
        dayNightIndicator: {
            id: 'grande-daynight-disc'
        },
        moonphase: {
            id: 'grande-moonphase-disc'
        },
        day: {
            id: 'grande-day-disc',
            invert: true
        },
        date: {
            id: 'grande-date-disc'
        },
        month: {
            id: 'grande-month-disc',
            invert: true
        },
        week: {
            id: 'grande-week-display-ring'
        },
        year: {
            id: 'grande-year-indicator-disc'
        },
        eqTime: {
            id: 'grande-equation-hand',
            range: [-38, 38]
        }
    };

    demo = new Watch(settings);

    /*
     * Manual Setting of Complications  Demo
     */
    settings = {
        dials: [{
            hands: {
                hour: 'crown-hour-hand',
                minute: 'crown-minute-hand',
                second: 'crown-second-hand',
            },
            timezone: "America/New_York"
        }],
        crown: {
            id: 'crown-button',
        },
        date: {
            id: 'crown-date-disc'
        },
        moonphase: {
            id: 'crown-moonphase-disc'
        },
        year: {
            id: 'crown-year-indicator-disc'
        },
        week: {
            id: 'crown-week-display-ring'
        },
        dayNightIndicator: {
            id: 'crown-daynight-disc'
        },
        day: {
            id: 'crown-day-disc',
        },
    };

    demo = new Watch(settings);

    // settings = {
    //     dials: [{
    //         hands: {
    //             hour: 'retrograde-sec-hour-hand',
    //             minute: 'retrograde-sec-minute-hand',
    //         },
    //         retrograde: {
    //             second: {
    //                 id: 'retrograde-second-hand-one',
    //                 max: 180,
    //                 duration: 10
    //             }
    //         },
    //         sweep: true
    //     }, ]
    // };
    // demo = new Watch(settings);

    // settings = {
    //     dials: [{
    //         name: 'primary',
    //         hands: {
    //             hour: 'split-hour-hand',
    //             minute: 'split-minute-hand',
    //             second: 'running-second-hand',
    //         },
    //         sweep: true
    //     }, ],
    //     chronograph: {
    //         buttons: {
    //             start: 'split-start-stop-btn',
    //             reset: 'split-reset-btn'
    //         },
    //         hands: {
    //             second: 'split-chrono-second-hand',
    //             step: 'split-stop-second-hand',
    //             minute: 'split-chrono-minute-hand',
    //         },
    //         rattrapante: true
    //     },
    // };
    // demo = new Watch(settings);

    // settings = {
    //     dials: [{
    //         name: 'primary',
    //         hands: {
    //             hour: 'chrono-hour-hand',
    //             minute: 'chrono-primary-minute-hand',
    //             second: 'second-hand',
    //         },
    //         sweep: true,
    //     }, ],
    //     chronograph: {
    //         buttons: {
    //             start: 'start-pause-btn',
    //             reset: 'reset-btn',
    //         },
    //         hands: {
    //             tenth: 'chrono-tenth-second-hand',
    //             second: 'chrono-second-hand',
    //             minute: 'chrono-minute-hand',
    //             hour: 'chrono-hour-sub-hand',
    //         }
    //     },
    // };
    // demo = new Watch(settings);

    // settings = {
    //     dials: [{
    //         hands: {
    //             hour: 'perpetual-hour-hand',
    //             minute: 'perpetual-minute-hand',
    //             second: 'perpetual-second-hand',
    //         },
    //     }],
    //     day: {
    //         id: 'day-indicator-disc',
    //     },
    //     date: {
    //         id: 'date-disc',
    //     },
    //     month: {
    //         id: 'month-disc',
    //     },
    //     year: {
    //         id: 'year-hand',
    //     },
    // };
    // demo = new Watch(settings);

    // settings = {
    //     dials: [{
    //         hands: {
    //             hour: 'moonphase-hour-hand',
    //             minute: 'moonphase-minute-hand',
    //             second: 'moonphase-second-hand',
    //         },
    //     }],
    //     moonphase: {
    //         id: 'moonphase-dial',
    //         invert: true
    //     },
    // };
    // demo = new Watch(settings);

    // settings = {
    //     dials: [{
    //         hands: {
    //             hour: 'date-hour-hand',
    //             minute: 'date-minute-hand',
    //             second: 'date-second-hand',
    //         },
    //     }],
    //     month: {
    //         id: 'date-arrow',
    //         retrograde: {
    //             max: 205
    //         }
    //     },
    // };
    // demo = new Watch(settings);
})();