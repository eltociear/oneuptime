import OneUptimeListener from './listener';
import Util from './util';

import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import { name, version } from '../package.json';

class ErrorTracker {
    MAX_ITEMS_ALLOWED_IN_STACK: $TSFixMe;
    apiUrl: $TSFixMe;
    configKeys: $TSFixMe;
    errorTrackerId: $TSFixMe;
    errorTrackerKey: $TSFixMe;
    event: $TSFixMe;
    eventId: $TSFixMe;
    extras: $TSFixMe;
    fingerprint: $TSFixMe;
    isWindow: $TSFixMe;
    listenerObj: $TSFixMe;
    options: $TSFixMe;
    tags: $TSFixMe;
    utilObj: $TSFixMe;
    // constructor to set up global listeners
    constructor(
        apiUrl: $TSFixMe,
        errorTrackerId: $TSFixMe,
        errorTrackerKey: $TSFixMe,
        options = {}
    ) {
        this._setErrorTrackerId(errorTrackerId);
        this._setApiUrl(apiUrl);
        this._setErrorTrackerKey(errorTrackerKey);
        this.tags = [];
        this.extras = [];
        this.isWindow = false;
        this.fingerprint = [];
        this.options = {
            maxTimeline: 5,
            captureCodeSnippet: true,
        };
        this.MAX_ITEMS_ALLOWED_IN_STACK = 100;
        this.configKeys = ['baseUrl'];
        // set up option
        this._setUpOptions(options);
        this._setEventId();
        this.isWindow = typeof window !== 'undefined';
        this.listenerObj = new OneUptimeListener(
            this.getEventId(),
            this.isWindow,
            this.options
        ); // Initialize Listener for timeline
        this.utilObj = new Util(this.options);
        // set up error listener
        if (this.isWindow) {
            this._setUpErrorListener();
        } else {
            this._setUpNodeErrorListener();
        }
    }
    _setErrorTrackerId(errorTrackerId: $TSFixMe) {
        this.errorTrackerId = errorTrackerId;
    }
    _setErrorTrackerKey(errorTrackerKey: $TSFixMe) {
        this.errorTrackerKey = errorTrackerKey;
    }
    _setApiUrl(apiUrl: $TSFixMe) {
        this.apiUrl = `${apiUrl}/error-tracker/${this.errorTrackerId}/track`;
    }
    _setUpOptions(options: $TSFixMe) {
        for (const [key, value] of Object.entries(options)) {
            // proceed with current key if it is not in the config keys
            if (!this.configKeys.includes(key)) {
                // if key is in allowed options keys
                if (this.options[key]) {
                    // set max timeline properly after checking conditions
                    if (
                        key === 'maxTimeline' &&
                        (value > this.MAX_ITEMS_ALLOWED_IN_STACK || value < 1)
                    ) {
                        this.options[key] = this.MAX_ITEMS_ALLOWED_IN_STACK;
                    } else if (key === 'captureCodeSnippet') {
                        const isBoolean = typeof value === 'boolean'; // check if the passed value is a boolean
                        // set boolean value if boolean or set default `true` if annything other than boolean is passed
                        this.options[key] = isBoolean ? value : true;
                    } else {
                        this.options[key] = value;
                    }
                }
            }
        }
    }
    _setEventId() {
        this.eventId = uuidv4();
    }
    getEventId() {
        return this.eventId;
    }
    setTag(key: $TSFixMe, value: $TSFixMe) {
        if (!(typeof key === 'string') || !(typeof value === 'string')) {
            return 'Invalid Tags type';
        }
        // get the index if the key exist already
        const index = this.tags.findIndex((tag: $TSFixMe) => tag.key === key);
        if (index !== -1) {
            // replace value if it exist
            this.tags[index].value = value;
        } else {
            // push key and value if it doesnt
            this.tags = [...this.tags, { key, value }];
        }
    }
    // pass an array of tags
    setTags(tags: $TSFixMe) {
        if (!Array.isArray(tags)) {
            return 'Invalid Tags type';
        }
        tags.forEach(element => {
            if (element.key && element.value) {
                this.setTag(element.key, element.value);
            }
        });
    }
    _getTags() {
        return this.tags;
    }
    setExtras(extras: $TSFixMe) {
        extras.forEach((element: $TSFixMe) => {
            if (element.key && element.extra) {
                this.setExtra(element.key, element.extra);
            }
        });
    }

    setExtra(key: $TSFixMe, extra: $TSFixMe) {
        this.extras = { ...this.extras, [key]: extra };
    }
    setFingerprint(keys: $TSFixMe) {
        if (!(typeof keys === 'string') && !Array.isArray(keys)) {
            return 'Invalid Fingerprint Format';
        }
        this.fingerprint = keys ? (Array.isArray(keys) ? keys : [keys]) : [];
    }
    _getFingerprint(errorMessage: $TSFixMe) {
        // if no fingerprint exist currently
        if (this.fingerprint.length < 1) {
            // set up finger print based on error since none exist
            this.setFingerprint(errorMessage);
        }
        return this.fingerprint;
    }
    // set up error listener
    _setUpErrorListener() {
        const _this = this;
        window.onerror = async function(message, file, line, col, error) {
            const errorEvent = { message, file, line, col, error };

            const string = errorEvent.message
                ? errorEvent.message.toLowerCase()
                : errorEvent.toLowerCase();
            const substring = 'script error';
            if (string.indexOf(substring) > -1) {
                return; // third party error
            } else {
                // construct the error object
                const errorObj = await _this.utilObj._getErrorStackTrace(
                    errorEvent
                );

                // set the a handled tag
                _this.setTag('handled', 'false');
                // prepare to send to server
                _this.prepareErrorObject('error', errorObj);

                // send to the server
                _this.sendErrorEventToServer();
            }
        };
    }
    _setUpNodeErrorListener() {
        const _this = this;
        process
            .on('uncaughtException', err => {
                // display for the user
                // eslint-disable-next-line no-console
                console.log(`${err}`);
                // any uncaught error
                _this._manageErrorNode(err);
            })
            .on('unhandledRejection', err => {
                // display this for the user

                // eslint-disable-next-line no-console
                console.log(`UnhandledPromiseRejectionWarning: ${err.stack}`);
                // any unhandled promise error
                _this._manageErrorNode(err);
            });
    }
    async _manageErrorNode(error: $TSFixMe) {
        // construct the error object
        const errorObj = await this.utilObj._getErrorStackTrace(error);

        // set the a handled tag
        this.setTag('handled', 'false');
        // prepare to send to server
        this.prepareErrorObject('error', errorObj);

        // send to the server
        return this.sendErrorEventToServer();
    }
    addToTimeline(category: $TSFixMe, content: $TSFixMe, type: $TSFixMe) {
        const timeline = {
            category,
            data: {
                content,
            },
            type,
        };
        this.listenerObj.logCustomTimelineEvent(timeline);
    }
    getTimeline() {
        return this.listenerObj.getTimeline();
    }
    captureMessage(message: $TSFixMe) {
        // set the a handled tag
        this.setTag('handled', 'true');
        this.prepareErrorObject('message', { message });

        // send to the server
        return this.sendErrorEventToServer();
    }
    async captureException(error: $TSFixMe) {
        // construct the error object
        const errorObj = await this.utilObj._getErrorStackTrace(error);

        // set the a handled tag
        this.setTag('handled', 'true');

        this.prepareErrorObject('exception', errorObj);

        // send to the server
        return this.sendErrorEventToServer();
    }
    _setHost() {
        if (this.isWindow) {
            // Web apps
            this.setTag('url', window.location.origin);
        } else {
            // JS Backend
            // TODO create a way to get host on the backend
        }
    }
    prepareErrorObject(type: $TSFixMe, errorStackTrace: $TSFixMe) {
        // log event
        const content = {
            message: errorStackTrace.message,
        };
        this.listenerObj.logErrorEvent(content, type);
        // set the host as a tag to be used later
        this._setHost();
        // get current timeline
        const timeline = this.getTimeline();
        // get device location and details
        const deviceDetails = this.utilObj._getUserDeviceDetails();
        const tags = this._getTags();
        const fingerprint = this._getFingerprint(errorStackTrace.message); // default fingerprint will be the message from the error stacktrace
        // get event ID
        // Temporary display the state of the error stack, timeline and device details when an error occur
        // prepare the event so it can be sent to the server
        this.event = {
            type,
            timeline,
            exception: errorStackTrace,
            deviceDetails,
            eventId: this.getEventId(),
            tags,
            fingerprint,
            errorTrackerKey: this.errorTrackerKey,
            sdk: this.getSDKDetails(),
        };
    }
    async sendErrorEventToServer() {
        let content;
        await this._makeApiRequest(this.event)
            .then(response => {
                content = response;
                // generate a new event Id
                this._setEventId();
                // clear the timeline after a successful call to the server
                this._clear(this.getEventId());
            })
            .catch(error => (content = error));
        return content;
    }
    _makeApiRequest(data: $TSFixMe) {
        return new Promise((resolve, reject) => {
            axios
                .post(this.apiUrl, data)
                .then(res => {
                    resolve(res);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    getCurrentEvent() {
        return this.event;
    }
    getSDKDetails() {
        return { name, version };
    }
    _clear(newEventId: $TSFixMe) {
        // clear tags
        this.tags = [];
        // clear extras
        this.extras = [];
        // clear fingerprint
        this.fingerprint = [];
        // clear timeline
        this.listenerObj.clearTimeline(newEventId);
    }
}
export default ErrorTracker;
