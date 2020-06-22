'use strict';

(function(root, factory) {
	/*global define*/
	if (typeof define === 'function' && define.amd) {
		define(['moment', 'moment-timezone'], factory);                          // AMD
	} else if (typeof module === 'object' && module.exports) {
		module.exports = factory(require('moment'), require('moment-timezone')); // Node
	} else {
		factory(root.moment, root.moment.tz);                                    // Browser
	}
}(this, function(moment, momentTimezone) {
	var MINUTE_MILLISECONDS = 60 * 1000;
	var DAY_MILLISECONDS = 86400000;
	var MS_DAY_OFFSET = 25569;

	var momentVersion = moment.version.split('.');
	var major = +momentVersion[0];
	var minor = +momentVersion[1];

	if (major < 2 || (major === 2 && minor < 6)) {
		throw new Error('moment-msdate requires Moment.js >= 2.6.0. You are using Moment.js ${moment.version}. See momentjs.com');
	}

	if (!momentTimezone || !moment.tz) {
		throw new Error('moment-msdate requires moment-timezone.js. see momentjs.com/timezone');
	}

	var oaDateToTicks = function(oaDate) {
		return ((oaDate - MS_DAY_OFFSET) * DAY_MILLISECONDS) + (oaDate >= 0.0 ? 0.5 : -0.5);
	};

	var ticksToOADate = function(ticks) {
		return (ticks / DAY_MILLISECONDS) + MS_DAY_OFFSET;
	};

	/**
	 * @description takes an oaDate that is not in utc and converts it to a utc moment offset by a number of minutes
	 *
	 * @param {double} oaDate
	 * @param {string} offsetToUtcInMinutes
	 * @returns moment
	 */
	var fromOADateOffsetToUtcByMinutes = function(oaDate, offsetToUtcInMinutes) {
		var offsetInTicks = offsetToUtcInMinutes * MINUTE_MILLISECONDS;
		var ticks = oaDateToTicks(oaDate);
		return moment(ticks + offsetInTicks).utc();
	};

	/**
	 * @description takes an oaDate that is not in utc and converts it to a utc moment offset by the specified timezone
	 *
	 * @param {double} oaDate
	 * @param {string} timezone
	 * @returns moment
	 */
	var fromOADateOffsetToUtcByTimezone = function(oaDate, timezone) {
		if (!moment.tz.zone(timezone)) { throw new Error('timezone provided is not available in moment-timezone.js', 'moment-msdate.js', 59); }
		var ticks = oaDateToTicks(oaDate);
		var offset = moment(ticks).tz(timezone).utcOffset() * MINUTE_MILLISECONDS;
		return moment.tz(ticks - offset, timezone).utc();
	};

	/**
	 * @description takes an oaDate that is in utc and converts it to a utc moment or takes an oaDate and an offset to utc and converts it to a utc moment. The offset can be an int representing the offset to utc in minutes or a string indicating the timezone of the oaDate.
	 *
	 * @param {double} oaDate
	 * @param {string=} {int=} offset
	 * @returns moment
	 */
	moment.fromOADate = function(oaDate, offset) {
		if (isNaN(parseInt(oaDate, 10))) { throw new TypeError('fromOADate requires an oaDate that is not null or undefined', 'moment-msdate.js', 72); }

		/* no offset */
		if (!offset) { return fromOADateOffsetToUtcByMinutes(oaDate, 0); }

		/* timezone */
		var parsedOffset = parseInt(offset, 10);
		if (isNaN(parsedOffset)) { return fromOADateOffsetToUtcByTimezone(oaDate, offset); }

		/* minutes */
		return fromOADateOffsetToUtcByMinutes(oaDate, parsedOffset);
	};

	/**
	 * @description converts a moment to a UTC OLE automation date represented as a double
	 *
	 * @returns {double}
	 */
	moment.fn.toOADate = function() {
		var milliseconds = this.valueOf();
		return ticksToOADate(milliseconds);
	};


	return moment;
}));
