const Watch = require('./../index');

(function() {
  "use strict"
  let settings = {
    dials: [{
        name: 'primary',
        hands: {
          hour: 'dial-primary-hour-hand',
          minute: 'dial-primary-minute-hand',
          second: 'dial-primary-second-hand',
        },
      },
      {
        name: 'secondary',
        hands: {
          hour: 'dial-secondary-hour-hand',
          minute: 'dial-secondary-minute-hand',
          second: 'dial-secondary-second-hand',
        },
        sweep: true,
        timezone: 'America/New_York'
      },
    ],
  };

  let demo = new Watch(settings);

  settings = {
    dials: [{
      hands: {
        hour: 'perpetual-hour-hand',
        minute: 'perpetual-minute-hand',
        second: 'perpetual-second-hand',
      },
    }],
    day: {
      id: 'day-indicator-disc',
    },
    date: {
      id: 'date-disc',
    },
    month: {
      id: 'month-disc',
    },
    year: {
      id: 'year-hand',
    },
  };
  demo = new Watch(settings);
})();
