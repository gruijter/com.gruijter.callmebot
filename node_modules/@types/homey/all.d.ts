import events = require('events');

/**
 * @namespace ManagerApi
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.api`
 */
declare class ManagerApi extends Manager {
    /**
     * Perform a GET request.
     * @param {string} uri - The path to request, relative to /api.
     * @returns {Promise<any>}
     */
    get(uri: string): Promise<any>;
    /**
     * Perform a POST request.
     * @param {string} uri - The path to request, relative to /api.
     * @param {any} body - The body of the request.
     * @returns {Promise<any>}
     */
    post(uri: string, body: any): Promise<any>;
    /**
     * Perform a PUT request.
     * @param {string} uri - The path to request, relative to /api.
     * @param {any} body - The body of the request.
     * @returns {Promise<any>}
     */
    put(uri: string, body: any): Promise<any>;
    /**
     * Perform a DELETE request.
     * @param {string} uri - The path to request, relative to /api.
     * @returns {Promise<any>}
     */
    delete(uri: string): Promise<any>;
    /**
     * Emit a `realtime` event.
     * @param {string} event - The name of the event
     * @param {any} data - The data of the event
     */
    realtime(event: string, data?: any): any;
    /**
     * Create an {@link Api} instance, to receive realtime events.
     * @param {string} uri The URI of the endpoint, e.g. `homey:manager:webserver`
     * @returns {Api}
     */
    getApi(uri: string): Api;
    hasApi(uri: any): boolean;
    /**
     * Create an {@link ApiApp} instance, to receive realtime events.
     * @param {string} appId The ID of the App, e.g. `com.athom.foo`
     * @returns {Api}
     */
    getApiApp(appId: string): Api;
    hasApiApp(appId: any): boolean;
    /**
     * Unregister an {@link Api} instance.
     * @param {Api} api
     */
    unregisterApi(api: Api): void;
    /**
     * Starts a new API session on behalf of the homey owner and returns the API token.
     * The API Token expires after not being used for two weeks.
     *
     * > Requires the `homey:manager:api` permission.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @returns {Promise<string>}
     */
    getOwnerApiToken(): Promise<string>;
    /**
     * Returns the url for local access.
     *
     * > Requires the `homey:manager:api` permission.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @returns {Promise<string>}
     */
    getLocalUrl(): Promise<string>;
}

/**
 * @namespace ManagerApps
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.apps`
 */
declare class ManagerApps extends Manager {
    /**
     * Check whether an app is installed, enabled and running.
     * @param {ApiApp} appInstance
     * @returns {Promise<boolean>}
     */
    getInstalled(appInstance: ApiApp): Promise<boolean>;
    /**
     * Get an installed app's version.
     * @param {ApiApp} appInstance
     * @returns {Promise<string>}
     */
    getVersion(appInstance: ApiApp): Promise<string>;
}

/**
 * @namespace ManagerArp
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.arp`
 */
declare class ManagerArp extends Manager {
    /**
     * Get an ip's MAC address
     * @param {string} ip
     * @returns {Promise<string>}
     */
    getMAC(ip: string): Promise<string>;
}

/**
 * @namespace ManagerAudio
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.audio`
 */
declare class ManagerAudio extends Manager {
    /**
     * Play WAV audio sample
     * @param {string} sampleId unique id which can be used to play sounds that have been played before
     * @param {Buffer|string} [sample] Buffer containing a WAV audio sample or path to file containing WAV audio sample data.
     * Sample is cached in Homey and can be played again by calling this function with the same sampleId without the sample argument which will result in the the sample loading faster.
     * @returns {Promise<any>}
     */
    playWav(sampleId: string, sample?: string | Buffer | undefined): Promise<any>;
    /**
     * Play MP3 audio sample
     * @param {string} sampleId unique id which can be used to play sounds that have been played before
     * @param {Buffer|string} [sample] Buffer containing a MP3 audio sample or path to file containing MP3 audio sample data.
     * Sample is cached in Homey and can be played again by calling this function with the same sampleId without the sample argument which will result in the the sample loading faster.
     * @returns {Promise<any>}
     */
    playMp3(sampleId: string, sample?: string | Buffer | undefined): Promise<any>;
    /**
     * Remove WAV sample from cache
     * @param {string} sampleId The id of the WAV that is cached
     * @returns {Promise<any>}
     */
    removeWav(sampleId: string): Promise<any>;
    /**
     * Remove MP3 sample from cache
     * @param {string} sampleId The id of the MP3 that is cached
     * @returns {Promise<any>}
     */
    removeMp3(sampleId: string): Promise<any>;
}

/**
 * @namespace ManagerBLE
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.ble`
 */
declare class ManagerBLE extends Manager {
    /**
     * Discovers BLE peripherals for a certain time
     *
     * > Requires the `homey:wireless:ble` permission.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @param {string[]} [serviceFilter] - List of required serviceUuids the peripheral should expose
     * @param {number} [timeout=10000] - Time in ms to search for Ble peripherals (max 30 seconds)
     * @returns {Promise<BleAdvertisement[]>}
     */
    discover(serviceFilter?: string[] | undefined, timeout?: number | undefined): Promise<BleAdvertisement[]>;
    /**
     * Finds a Ble peripheral with a given peripheralUuid
     *
     * > Requires the `homey:wireless:ble` permission.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @param {string} peripheralUuid - The uuid of the peripheral to find
     * @param {number} [timeout=10000] - Time in ms to search for the Ble peripheral (max 30 seconds)
     * @returns {Promise<BleAdvertisement>}
     */
    find(peripheralUuid: string, timeout?: number | undefined): Promise<BleAdvertisement>;
}

/**
 * @namespace ManagerClock
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.clock`
 */
declare class ManagerClock extends Manager {
    /**
     * Get the current TimeZone
     * @returns {String}
     */
    getTimezone(): string;
}

/**
 * @namespace ManagerCloud
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.cloud`
 */
declare class ManagerCloud extends Manager {
    /**
     * Generate a OAuth2 Callback
     * @param {string} apiUrl
     * @returns {Promise<CloudOAuth2Callback>}
     */
    createOAuth2Callback(apiUrl: string): Promise<CloudOAuth2Callback>;
    /**
     * @param {string} id Webhook ID
     * @param {string} secret Webhook Secret
     * @param {object} data Webhook Data
     * @returns {Promise<CloudWebhook>}
     */
    createWebhook(id: string, secret: string, data: object): Promise<CloudWebhook>;
    /**
     * Unregister a webhook
     * @param {CloudWebhook} webhook
     * @returns {Promise<any>}
     */
    unregisterWebhook(webhook: CloudWebhook): Promise<any>;
    /**
     * Get Homey's local address & port
     * @returns {Promise<string>} A promise that resolves to the local address
     */
    getLocalAddress(): Promise<string>;
    /**
     * Get Homey's Cloud ID
     * @returns {Promise<string>} A promise that resolves to the cloud id
     */
    getHomeyId(): Promise<string>;
}

/**
 * Discovery can be used to automatically find devices on the Homey's network. Usually, you don't want to use this manager directly, but link it automatically by using Drivers.
 * @see DiscoveryResultMDNSSD
 * @see DiscoveryResultSSDP
 * @see DiscoveryResultMAC
 * @namespace ManagerDiscovery
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.discovery`
 */
declare class ManagerDiscovery extends Manager {
    /**
     * @param {string} strategyId The ID as defined in your `app.json`
     * @returns {DiscoveryStrategy}
     */
    getStrategy(strategyId: string): DiscoveryStrategy;
}

/**
 * @namespace ManagerDrivers
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.drivers`
 */
declare class ManagerDrivers extends Manager {
    /**
     * Get a Driver instance by its ID
     * @param {string} driverId ID of the driver, as defined in app.json
     * @returns {Driver} Driver
     */
    getDriver(driverId: string): Driver;
    /**
     * Get an object with all {@link Driver} instances, with their ID as key
     * @returns {object} Drivers
     */
    getDrivers(): object;
}

/**
 * @namespace ManagerFlow
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.flow`
 */
declare class ManagerFlow extends Manager {
    /**
     * @param {string} id The ID of the card as defined in the app's `app.json`.
     * @returns {FlowCardAction}
     */
    getActionCard(id: string): FlowCardAction;
    /**
     * @param {string} id The ID of the card as defined in the app's `app.json`.
     * @returns {FlowCardCondition}
     */
    getConditionCard(id: string): FlowCardCondition;
    /**
     * @param {string} id The ID of the card as defined in the app's `app.json`.
     * @returns {FlowCardTrigger}
     */
    getTriggerCard(id: string): FlowCardTrigger;
    /**
     * @param {string} id The ID of the card as defined in the app's `app.json`.
     * @returns {FlowCardTriggerDevice}
     */
    getDeviceTriggerCard(id: string): FlowCardTriggerDevice;
    /**
     * The FlowToken class can be used to create a Tag in the Flow Editor.
     * @param {string} id - ID of the token, should be alphanumeric.
     * @param {object} opts
     * @param {string} opts.type - Type of the token, can be either `string`, `number`, `boolean` or `image`.
     * @param {string} opts.title - Title of the token
     * @returns {FlowToken}
     * @tutorial Flow-Tokens
     */
    createToken(id: string, opts: {
        type: string;
        title: string;
    }): FlowToken;
    /**
     * Unregister a {@link FlowToken}.
     * @param {FlowToken} tokenInstance
     * @returns {Promise<any>}
     */
    unregisterToken(tokenInstance: FlowToken): Promise<any>;
}

/**
 * @namespace ManagerGeolocation
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.geolocation`
 */
declare class ManagerGeolocation extends Manager {
    /**
     * Fired when the location is updated
     *
     * > Requires the `homey:manager:geolocation` permission.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @event ManagerGeolocation#location
     */
    /**
     * Get the Homey's physical location's latitude
     *
     * > Requires the `homey:manager:geolocation` permission.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @returns {number} latitude
     */
    getLatitude(): number;
    /**
     * Get the Homey's physical location's longitude
     *
     * > Requires the `homey:manager:geolocation` permission.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @returns {number} longitude
     */
    getLongitude(): number;
    /**
     * Get the Homey's physical location's accuracy
     *
     * > Requires the `homey:manager:geolocation` permission.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @returns {number} accuracy (in meter)
     */
    getAccuracy(): number;
    /**
     * Get the Homey's physical mode
     *
     * > Requires the `homey:manager:geolocation` permission.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @returns {string} `auto` or `manual`
     */
    getMode(): string;
}

/**
 * @namespace ManagerI18n
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.i18n`
 */
declare class ManagerI18n extends Manager {
    /**
     * Translate a string, as defined in the app's `/locales/<language>.json` file.
     * This method is also available at @{link Homey#__}
     * @param {string} key
     * @param {object} tags - An object of tags to replace. For example, in your json define `Hello, __name__!`. The property *name* would contain a string, e.g. *Dave*.
     * @returns {string} The translated string
     * @example <caption>/locales/en.json</caption>
     * { "welcome": "Welcome, __name__!" }
     * @example <caption>/app.js</caption>
     * let welcomeMessage = this.homey.__('welcome', { name: 'Dave' });
     * console.log( welcomeMessage ); // "Welcome, Dave!"
     */
    __(key: string, tags: object): string;
    /**
     * Get Homey's current language
     * @returns {string} The language as a 2-character string (e.g. `en`)
     */
    getLanguage(): string;
    /**
     * Get Homey's current units
     * @returns {string} `metric` or `imperial`
     */
    getUnits(): string;
    getStrings(): any;
}

/**
 * @namespace ManagerImages
 * @tutorial Images
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.images`
 */
declare class ManagerImages extends Manager {
    /**
     * Get a registered {@link Image}.
     * @param {string} id
     * @returns {Image}
     */
    getImage(id: string): Image;
    /**
     * Create an {@link Image}.
     * @returns {Promise<Image>}
     */
    createImage(): Promise<Image>;
    /**
     * Unregister a {@link Image}.
     * @param {Image} imageInstance
     * @returns {Promise<void>}
     */
    unregisterImage(imageInstance: Image): Promise<void>;
}

/**
 * @namespace ManagerInsights
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.insights`
 */
declare class ManagerInsights extends Manager {
    /**
     * Get all logs belonging to this app.
     * @returns {Promise<InsightsLog[]>} An array of {@link InsightsLog} instances
     */
    getLogs(): Promise<InsightsLog[]>;
    /**
     * Get a specific log belonging to this app.
     * @param {string} id - ID of the log (must be lowercase, alphanumeric)
     * @returns {Promise<InsightsLog>}
     */
    getLog(id: string): Promise<InsightsLog>;
    /**
     * Create a log.
     * @param {string} id - ID of the log (must be lowercase, alphanumeric)
     * @param {object} options
     * @param {string} options.title - Log's title
     * @param {string} options.type - Value type, can be either <em>number</em> or <em>boolean</em>
     * @param {string} [options.units] - Units of the values, e.g. <em>°C</em>
     * @param {number} [options.decimals] - Number of decimals visible
     * @returns {Promise<InsightsLog>}
     */
    createLog(id: string, options: {
        title: string;
        type: string;
        units: string | undefined;
        decimals: number | undefined;
    }): Promise<InsightsLog>;
    /**
     * Delete a log.
     * @param {InsightsLog} log
     * @returns {Promise<any>}
     */
    deleteLog(log: InsightsLog): Promise<any>;
}

/**
 * @namespace ManagerLedring
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.ledring`
 */
declare class ManagerLedring extends Manager {
    /**
     * > Requires the `homey:manager:ledring` permission.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @param {object} opts
     * @param {LedringAnimation.Frame[]} opts.frames An array of frames. A frame is an Array of 24 objects with a `r`, `g` and `b` property, which are numbers between 0 and 255.
     * @param {string} opts.priority How high the animation will have on the priority stack. Can be either `INFORMATIVE`, `FEEDBACK` or `CRITICAL`.
     * @param {number} opts.transition Transition time (in ms) how fast to fade the information in. Defaults to `300`.
     * @param {number|Boolean} opts.duration Duration (in ms) how long the animation should be shown. Defaults to `false`. `false` is required for screensavers.
     * @param {object} opts.options
     * @param {number} opts.options.fps Frames per second
     * @param {number} opts.options.tfps Target frames per second (must be divisible by fps)
     * @param {number} opts.options.rpm Rotations per minute
     * @returns {Promise<LedringAnimation>}
     */
    createAnimation(opts: {
        frames: LedringAnimation.Frame[];
        priority: string;
        transition: number;
        duration: number | boolean;
        options: {
            fps: number;
            tfps: number;
            rpm: number;
        };
    }): Promise<LedringAnimation>;
    /**
     * > Requires the `homey:manager:ledring` permission.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @param {string} systemId The system animation's ID. Can be either `colorwipe`, `loading`, `off`, `progress`, `pulse`, `rainbow`, `rgb` or `solid`.
     * @param {object} opts
     * @param {string} opts.priority How high the animation will have on the priority stack. Can be either `INFORMATIVE`, `FEEDBACK` or `CRITICAL`.
     * @param {number|boolean} opts.duration Duration (in ms) how long the animation should be shown. Defaults to `false`. `false` is required for screensavers.
     * @returns {Promise<LedringAnimation>}
     */
    createSystemAnimation(systemId: string, opts: {
        priority: string;
        duration: number | boolean;
    }): Promise<LedringAnimation>;
    /**
     * > Requires the `homey:manager:ledring` permission.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @param {object} opts
     * @param {string} opts.priority How high the animation will have on the priority stack. Can be either `INFORMATIVE`, `FEEDBACK` or `CRITICAL`.
     * @param {object} opts.options
     * @param {string} opts.options.color=#0092ff A HEX string
     */
    createProgressAnimation(opts: {
        priority: string;
        options: {
            color: string;
        };
    }): Promise<LedringAnimation>;
    /**
     * Register a LED Ring animation.
     *
     * > Requires the `homey:manager:ledring` permission.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @param {LedringAnimation} animation
     * @returns {Promise<LedringAnimation>}
     */
    registerAnimation(animation: LedringAnimation): Promise<LedringAnimation>;
    /**
     * Unregister a LED Ring animation.
     *
     * > Requires the `homey:manager:ledring` permission.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @param {LedringAnimation} animation
     * @returns {Promise<LedringAnimation>}
     */
    unregisterAnimation(animation: LedringAnimation): Promise<LedringAnimation>;
    /**
     * Register a LED Ring screensaver.
     *
     * > Requires the `homey:manager:ledring` permission.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @param {string} name - Name of the animation as defined in your app's `app.json`.
     * @param {LedringAnimation} animation
     * @returns {Promise<any>}
     */
    registerScreensaver(name: string, animation: LedringAnimation): Promise<any>;
    /**
     * Unregister a LED Ring screensaver.
     *
     * > Requires the `homey:manager:ledring` permission.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @param {string} name - Name of the animation as defined in your app's `app.json`.
     * @param {LedringAnimation} animation
     * @returns {Promise<any>}
     */
    unregisterScreensaver(name: string, animation: LedringAnimation): Promise<any>;
}

/**
 * @namespace ManagerNFC
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.nfc`
 */
declare class ManagerNFC extends Manager {
    /**
     * This event is fired when a tag has been found.
     *
     * > Requires the `homey:wireless:nfc` permission.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @param {object} tag - The arguments as provided by the user in the Flow Editor
     * @param {object} tag.uid - The UID of the tag
     * @event ManagerNFC#tag
     */
}

/**
 * @namespace ManagerNotifications
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.notifications`
 */
declare class ManagerNotifications extends Manager {
    /**
     * Create a notification
     * @param {object} options
     * @param {string} options.excerpt A short message describing the notification. Use *asterisks* to highlight variable words.
     */
    createNotification({ excerpt }: {
        excerpt: string;
    }): Promise<void>;
}

/**
 * @namespace ManagerRF
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.rf`
 */
declare class ManagerRF extends Manager {
    /**
     * Transmit a raw frame using the specified signal.
     *
     * > Requires the `homey:wireless:433`, `homey:wireless:868` and/or `homey:wireless:ir` permissions.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @param {Signal} signal used to transmit data
     * @param {Array<number> | Buffer} frame data to be transmitted
     * @param {{ repetitions: number }=} opts
     */
    tx(signal: Signal, frame: Array<number> | Buffer, opts?: {
        repetitions: number;
    } | undefined): Promise<any>;
    /**
     * Send a predefined command using the specified signal.
     *
     * > Requires the `homey:wireless:433`, `homey:wireless:868` and/or `homey:wireless:ir` permissions.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @param {Signal} signal used to transmit data
     * @param {string} commandId name of the command as specified in the app manifest
     * @param {{ repetitions: number }=} opts
     */
    cmd(signal: Signal, commandId: string, opts?: {
        repetitions: number;
    } | undefined): Promise<any>;
    /**
     * @param {string} id The ID of the signal, as defined in the app's <code>app.json</code>.
     * @returns {Signal433}
     */
    getSignal433(id: string): Signal433;
    /**
     * @param {string} id The ID of the signal, as defined in the app's <code>app.json</code>.
     * @returns {Signal868}
     */
    getSignal868(id: string): Signal868;
    /**
     * @param {string} id The ID of the signal, as defined in the app's <code>app.json</code>.
     * @returns {SignalInfrared}
     */
    getSignalInfrared(id: string): SignalInfrared;
    /**
     * Enables a signal to start receiving events.
     *
     * > Requires the `homey:wireless:433`, `homey:wireless:868` and/or `homey:wireless:ir` permissions.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @template {Signal} T
     * @param {T} signal
     * @returns {Promise<T>}
     */
    enableSignalRX<T extends Signal>(signal: T): Promise<T>;
    /**
     * Disables a signal from receiving events.
     *
     * > Requires the `homey:wireless:433`, `homey:wireless:868` and/or `homey:wireless:ir` permissions.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @param {Signal} signal
     * @returns {Promise<void>}
     */
    disableSignalRX(signal: Signal): Promise<void>;
}

/**
 * @namespace ManagerSettings
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.settings`
 */
declare class ManagerSettings extends Manager {
    /**
     * Get all settings keys.
     * @returns {String[]}
     */
    getKeys(): string[];
    /**
     * Get a setting.
     * @param {string} key
     * @returns {any} value
     */
    get(key: string): any;
    /**
     * Fires when a setting has been set.
     * @event ManagerSettings#set
     * @param {String} key
     */
    /**
     * Set a setting.
     * @param {string} key
     * @param {any} value
     */
    set(key: string, value: any): void;
    /**
     * Fires when a setting has been unset.
     * @event ManagerSettings#unset
     * @param {String} key
     */
    /**
     * Unset (delete) a setting.
     * @param {string} key
     */
    unset(key: string): void;
}

/**
  * @typedef {object} ManagerSpeechInput.Chunk
  * @property {string} transcript - The chunk text
  * @property {number} startWord - The index of the words array where the chunk starts
  * @property {number} endWord - The index of the words array where the chunk ends
  * @property {string} type - The chunk type - either NP (Noun Phrase) or VP (Verb Phrase)
  */
/**
  * @typedef {object} ManagerSpeechInput.Location
  * @property {string} transcript - The location name
  * @property {number} startWord - The index of the words array where the location starts
  * @property {number} endWord - The index of the words array where the location ends
  */
/**
  * @typedef {object} ManagerSpeechInput.Time
  * @property {string} transcript - The time text
  * @property {number} startWord - The index of the words array where the time mention starts
  * @property {number} endWord - The index of the words array where the time mention ends
  * @property {object} time - The chunk type - either NP (Noun Phrase) or VP (Verb Phrase)
  * @property {number} time[].second - Seconds. False if no reference to a specific second was made
  * @property {number} time[].minute - Minutes. False if no reference to a specific minute was made
  * @property {number} time[].hour - Hour of the day. False if no reference to a specific hour was made
  * @property {boolean} time[].fuzzyHour - Indicates whether there is uncertainty about a time being am or pm. True if there is uncertainty, false if the part of day was indicated
  * @property {number} time[].day - Day of the month. False if no reference to a specific day was made
  * @property {number} time[].month - Month number. 0 is january. False if no reference to a specific month was made
  * @property {number} time[].year - Year. False if no reference to a specific year was made
  */
/**
 * @typedef {object} ManagerSpeechInput.Word
 * @property {string} word - The word
 * @property {string} posTag - The part-of-speech tag assigned to the word, using universal dependencies tagset
 * @property {ManagerSpeechInput.Chunk[]} chunks - lists any chunks starting at this word. Stuctured the same as the object in speech.chunks[]
 * @property {ManagerSpeechInput.Location[]} locations - lists any locations starting at this word. Stuctured the same as the object in speech.locations[]
 * @property {ManagerSpeechInput.Time[]} times - lists any times starting at this word. Stuctured the same as the object in speech.times[]
 * @property {object} devices - lists any device mentions starting at this word. Stuctured the same as the object in speech.devices[]
 */
/**
 * @namespace ManagerSpeechInput
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.speechInput`
 */
declare class ManagerSpeechInput extends Manager {
    /**
     * This event is fired when a speech query has been received, and needs feedback.
     * @event ManagerSpeechInput#speechEval
     * @param {object} speech - Information about what the user said
     * @param {string} speech.session - The session where the speech command originated from
     * @param {string} speech.transcript - The detected user thrase
     * @param {object} speech.matches - a dynamically generated tree containing all the matched Groups and Elements
     * @param {ManagerSpeechInput.Word[]} speech.words - An array of objects, where each object contains the word's properties
     * @param {ManagerSpeechInput.Chunk[]} speech.chunks - An array of detected noun phrases and verb phrases
     * @param {ManagerSpeechInput.Location[]} speech.locations - An array of detected references to a location
     * @param {ManagerSpeechInput.Time[]} speech.times - An array of detected time references
     * @param {Device[]} speech.devices - An array of {@link Device} instances which match the device parameters specified in app.json
     * @param {string} speech.allZones - A structured phrase which can be used to provide user feedback about the detected Zone names. Format: "in the {zone_name}(, {zone_name})*( and the {zone_name})?"
     * @param {genericCallbackFunction} callback - A truthy response is used to indicate that your App can process this transcript. The returned value will be passed on to the onSpeechMatch event
     */
    /**
     * @event ManagerSpeechInput#speechMatch
     * @param {object} speech - Information about what the user said
     * @param {string} speech.session - The session where the speech command originated from
     * @param {string} speech.transcript - The detected user thrase
     * @param {object} speech.matches - a dynamically generated tree containing all the matched Groups and Elements
     * @param {ManagerSpeechInput.Word[]} speech.words - An array of objects, where each object contains the word's properties
     * @param {ManagerSpeechInput.Chunk[]} speech.chunks - An array of detected noun phrases and verb phrases
     * @param {ManagerSpeechInput.Location[]} speech.locations - An array of detected references to a location
     * @param {ManagerSpeechInput.Time[]} speech.times - An array of detected time references
     * @param {Device[]} speech.devices - An array of {@link Device} instances which match the device parameters specified in app.json
     * @param {string} speech.allZones - A structured phrase which can be used to provide user feedback about the detected Zone names. Format: "in the {zone_name}(, {zone_name})*( and the {zone_name})?"
     * @param {ManagerSpeechOutput#say} speech.say - A shorthand method to say something, with the correct session
     * @param {ManagerSpeechInput#ask} speech.ask - A shorthand method to ask a question, with the correct session
     * @param {ManagerSpeechInput#confirm} speech.confirm - A shorthand method to ask a Yes/No question, with the correct session
     * @param {any} onSpeechData The result from {@link ManagerSpeechInput#event:speechEval speechEval}
     */
    /**
     * Let Homey ask a question. There is a limit of 255 characters.
     *
     * > Requires the `homey:manager:speech-input` and/or `homey:manager:speech-output` permissions.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @param {string} text - The sentence to say
     * @param {object} opts
     * @param {object} [opts.session] - The session of the speech. Leave empty to use Homey's built-in speaker
     * @param {number} [opts.timeout] - Amount of seconds until the response has timed-out
     * @returns {Promise<string>} - The text of the answer
     */
    ask(text: string, opts: {
        session?: object | undefined;
        timeout?: number | undefined;
    }): Promise<string>;
    /**
     * Let Homey ask a Yes/No question. There is a limit of 255 characters.
     *
     * > Requires the `homey:manager:speech-input` and/or `homey:manager:speech-output` permissions.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @param {string} text - The sentence to say
     * @param {object} opts
     * @param {object} [opts.session] - The session of the speech. Leave empty to use Homey's built-in speaker
     * @param {number} [opts.timeout] - Amount of seconds until the response has timed-out
     * @returns {Promise<boolean>} - Indicating whether the user answered with yes (true) or no (false)
     */
    confirm(text: string, opts: {
        session?: object | undefined;
        timeout?: number | undefined;
    }): Promise<boolean>;
}

declare namespace ManagerSpeechInput {
    type Chunk = {
        /**
         * - The chunk text
         */
        transcript: string;
        /**
         * - The index of the words array where the chunk starts
         */
        startWord: number;
        /**
         * - The index of the words array where the chunk ends
         */
        endWord: number;
        /**
         * - The chunk type - either NP (Noun Phrase) or VP (Verb Phrase)
         */
        type: string;
    };
    type Location = {
        /**
         * - The location name
         */
        transcript: string;
        /**
         * - The index of the words array where the location starts
         */
        startWord: number;
        /**
         * - The index of the words array where the location ends
         */
        endWord: number;
    };
    type Time = {
        /**
         * - The time text
         */
        transcript: string;
        /**
         * - The index of the words array where the time mention starts
         */
        startWord: number;
        /**
         * - The index of the words array where the time mention ends
         */
        endWord: number;
        /**
         * - The chunk type - either NP (Noun Phrase) or VP (Verb Phrase)
         */
        time: {
            /**
             * - Seconds. False if no reference to a specific second was made
             */
            second: number;
            /**
             * - Minutes. False if no reference to a specific minute was made
             */
            minute: number;
            /**
             * - Hour of the day. False if no reference to a specific hour was made
             */
            hour: number;
            /**
             * - Indicates whether there is uncertainty about a time being am or pm. True if there is uncertainty, false if the part of day was indicated
             */
            fuzzyHour: boolean;
            /**
             * - Day of the month. False if no reference to a specific day was made
             */
            day: number;
            /**
             * - Month number. 0 is january. False if no reference to a specific month was made
             */
            month: number;
            /**
             * - Year. False if no reference to a specific year was made
             */
            year: number;
        };
    };
    type Word = {
        /**
         * - The word
         */
        word: string;
        /**
         * - The part-of-speech tag assigned to the word, using universal dependencies tagset
         */
        posTag: string;
        /**
         * - lists any chunks starting at this word. Stuctured the same as the object in speech.chunks[]
         */
        chunks: Chunk[];
        /**
         * - lists any locations starting at this word. Stuctured the same as the object in speech.locations[]
         */
        locations: Location[];
        /**
         * - lists any times starting at this word. Stuctured the same as the object in speech.times[]
         */
        times: Time[];
        /**
         * - lists any device mentions starting at this word. Stuctured the same as the object in speech.devices[]
         */
        devices: object;
    };
}

/**
 * @namespace ManagerSpeechOutput
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.speechOutput`
 */
declare class ManagerSpeechOutput extends Manager {
    /**
     * Let Homey say something. There is a limit of 255 characters.
     *
     * > Requires the `homey:manager:speech`-output permission.
     * > For more information about permissions read the {@tutorial Permissions} tutorial.
     *
     * @param {string} text - The sentence to say
     * @param {object} opts
     * @param {object} opts.session - The session of the speech. Leave empty to use Homey's built-in speaker
     * @returns {Promise<any>}
     * @example
     * this.homey.speechOutput.say('Hello world!')
     *   .then(this.log)
     *   .catch(this.error);
     */
    say(text: string, opts: {
        session: object;
    }): Promise<any>;
}

/**
 * @namespace ManagerZigBee
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.zigbee`
 */
declare class ManagerZigBee extends Manager {
    /**
     * Get a ZigBeeNode instance for a Device
     * @param {Device} device - An instance of Device
     * @returns {Promise<ZigBeeNode>}
     */
    getNode(device: Device): Promise<ZigBeeNode>;
}

/**
 * @namespace ManagerZwave
 * @classdesc
 * You can access this manager through the {@link Homey} instance as `this.homey.zwave`
 */
declare class ManagerZwave extends Manager {
    /**
     * Create a ZwaveNode instance for a Device
     * @param {Device} device - An instance of Device
     * @returns {Promise<ZwaveNode>}
     * @example
     * const node = await this.homey.zwave.getNode(this);
     *
     * node.CommandClass.COMMAND_CLASS_BASIC.on('report', (command, report) => {
     *   this.log('onReport', command, report);
     * });
     *
     * node.CommandClass.COMMAND_CLASS_BASIC.BASIC_SET({ Value: 0xFF })
     *   .then(this.log)
     *   .catch(this.error);
     */
    getNode(device: Device): Promise<ZwaveNode>;
}

/**
 * This class represents an API endpoint on Homey. When registered, realtime events are fired on the instance.
 */
export class Api extends events.EventEmitter {
    type: string;
    id: string;
    /**
     * Perform a GET request.
     * @param {string} uri - The path to request, relative to the endpoint.
     * @returns {Promise<any>}
     */
    get(uri: string): Promise<any>;
    /**
     * Perform a POST request.
     * @param {string} uri - The path to request, relative to the endpoint.
     * @param {any} body - The body of the request.
     * @returns {Promise<any>}
     */
    post(uri: string, body: any): Promise<any>;
    /**
     * Perform a PUT request.
     * @param {string} uri - The path to request, relative to the endpoint.
     * @param {any} body - The body of the request.
     * @returns {Promise<any>}
     */
    put(uri: string, body: any): Promise<any>;
    /**
     * Perform a DELETE request.
     * @param {string} uri - The path to request, relative to the endpoint.
     * @returns {Promise<any>}
     */
    delete(uri: string): Promise<any>;
    /**
     * Unregister the API.
     * This is a shorthand method for {@link ManagerApi#unregisterApi}.
     */
    unregister(): any;
}

/**
 * This class represents another App on Homey. When registered, realtime events are fired on the instance.
 * @extends Api
 * @example
 * let otherApp = this.homey.api.getApiApp('com.athom.otherApp');
 *
 * otherApp
 *   .on('realtime', (result) => console.log('otherApp.onRealtime', result))
 *   .on('install', (result) => console.log('otherApp.onInstall', result))
 *   .on('uninstall', (result) => console.log('otherApp.onUninstall', result));
 *
 * otherApp.get('/')
 *   .then((result) => console.log('otherApp.get', result))
 *   .catch((error) => this.error('otherApp.get', error));
 *
 * otherApp.getInstalled()
 *   .then((result) => console.log('otherApp.getInstalled', result))
 *   .catch((error) => this.error('otherApp.getInstalled', error));
 *
 * otherApp.getVersion()
 *   .then((result) => console.log('otherApp.getVersion', result))
 *   .catch((error) => this.error('otherApp.getVersion', error));
 */
export class ApiApp extends Api {
    /**
     * This is a short-hand method to {@link ManagerApps#getInstalled}.
     * @returns {Promise<boolean>}
     */
    getInstalled(): Promise<boolean>;
    /**
     * This is a short-hand method to {@link ManagerApps#getVersion}.
     * @returns {Promise<string>}
     */
    getVersion(): Promise<string>;
}

/**
 * The App class is your start point for any app.
 * This class should be extended and exported from `app.js`.
 * Methods prefixed with `on` are meant to be overriden.
 * It is not allowed to overwrite the constructor.
 * @extends SimpleClass
 * @example <caption>/app.js</caption>
 * const Homey = require('homey');
 *
 * class MyApp extends Homey.App {
 *   async onInit() {
 *     this.log('MyApp has been initialized');
 *   }
 * }
 *
 * module.exports = MyApp;
 */
export class App extends SimpleClass {
    /**
     * The Homey instance of this app
     * @type {Homey}
     */
    homey: Homey<this>;
    /**
     * The app.json manifest
     * @type {any} */
    manifest: any;
    /**
     * The app id
     * @type {string} */
    id: string;
    /**
     * The app sdk version
     * @type {number} */
    sdk: number;
    /**
     * This method is called upon initialization of your app.
     */
    onInit(): Promise<void>;
}

/**
 * This class is a representation of a BLE Advertisement for a {@link BlePeripheral} in Homey.
 * This class must not be initiated by the developer, but retrieved by calling {@link ManagerBle#discover} or {@link ManagerBle#find}.
 * @property {string} id - Id of the peripheral assigned by Homey
 * @property {string} uuid - Uuid of the peripheral
 * @property {string} address - The mac address of the peripheral
 * @property {string} addressType - The address type of the peripheral
 * @property {boolean} connectable - Indicates if Homey can connect to the peripheral
 * @property {string} localName - The local name of the peripheral
 * @property {string} manufacturerData - Manufacturer specific data for peripheral
 * @property {string[]} serviceData - Array of service data entries
 * @property {string[]} serviceUuids - Array of service uuids
 * @property {number} rssi - The rssi signal strength value for the peripheral
 */
export class BleAdvertisement extends SimpleClass {
    /** Id of the peripheral assigned by Homey */
    id: string; 
    /** Uuid of the peripheral */
    uuid: string; 
    /** The mac address of the peripheral */
    address: string; 
    /** The address type of the peripheral */
    addressType: string; 
    /** Indicates if Homey can connect to the peripheral */
    connectable: boolean; 
    /** The local name of the peripheral */
    localName: string; 
    /** Manufacturer specific data for peripheral */
    manufacturerData: string; 
    /** Array of service data entries */
    serviceData: string[]; 
    /** Array of service uuids */
    serviceUuids: string[]; 
    /** The rssi signal strength value for the peripheral */
    rssi: number; 

    /**
     * Connect to the BLE peripheral this advertisement references
     * @returns {Promise<BlePeripheral>}
     */
    connect(): Promise<BlePeripheral>;
}

/**
 * This class is a representation of a BLE Advertisement for a {@link BlePeripheral} in Homey.
 * This class must not be initiated by the developer, but retrieved by calling {@link BleService#discoverCharacteristics} or {@link BleService#getCharacteristic}.
 * @property {string} id - Id of the characteristic assigned by Homey
 * @property {string} uuid - Uuid of the characteristic
 * @property {BlePeripheral} peripheral - The peripheral object that is the owner of this characteristic
 * @property {BleService} service - The service object that is the owner of this characteristic
 * @property {string} name - The name of the characteristic
 * @property {string} type - The type of the characteristic
 * @property {string[]} properties - The properties of the characteristic
 * @property {Buffer} value - The value of the characteristic. Note this is set to the last result of ${@link BleCharacteristic#read} and is initially null
 */
export class BleCharacteristic extends SimpleClass {
    /** Id of the characteristic assigned by Homey */
    id: string;
    /** Uuid of the characteristic */
    uuid: string;
    /** The peripheral object that is the owner of this characteristic */
    peripheral: BlePeripheral;
    /** The service object that is the owner of this characteristic */
    service: BleService;
    /** The name of the characteristic */
    name: string;
    /** The type of the characteristic */
    type: string;
    /** The properties of the characteristic */
    properties: string[];
    /** The value of the characteristic. Note this is set to the last result of ${@link BleCharacteristic#read} and is initially null */
    value: Buffer;
    /**
     * Discovers descriptors for this characteristic
     * @param {string[]} [descriptorsFilter] list of descriptorUuids to search for
     * @returns {Promise<BleDescriptor[]>}
     */
    discoverDescriptors(descriptorsFilter?: string[] | undefined): Promise<BleDescriptor[]>;
    /**
     * Read the value for this characteristic
     * @returns {Promise<Buffer>}
     */
    read(): Promise<Buffer>;
    /**
     * Write a value to this characteristic
     * @param {Buffer} data The data that should be written
     * @returns {Promise<Buffer>}
     */
    write(data: Buffer): Promise<Buffer>;
}

/**
 * This class is a representation of a BLE Advertisement for a {@link BlePeripheral} in Homey.
 * This class must not be initiated by the developer, but retrieved by calling {@link BleCharacteristic#discoverDescriptors}.
 * @property {string} id - Id of the characteristic assigned by Homey
 * @property {string} uuid - Uuid of the characteristic
 * @property {BlePeripheral} peripheral - The peripheral object that is the owner of this descriptor
 * @property {BleService} service - The service object that is the owner of this descriptor
 * @property {BleCharacteristic} characteristic - The characteristic object that is the owner of this descriptor
 * @property {string} name - The name of the descriptor
 * @property {string} type - The type of the descriptor
 * @property {Buffer} value - The value of the descriptor. Note this is set to the last result of ${@link BleDescriptor#read} and is initially null
 */
export class BleDescriptor extends SimpleClass {
    /** Id of the characteristic assigned by Homey */
    id: string;
    /** Uuid of the characteristic */
    uuid: string;
    /** The peripheral object that is the owner of this descriptor */
    peripheral: BlePeripheral;
    /** The service object that is the owner of this descriptor */
    service: BleService;
    /** The characteristic object that is the owner of this descriptor */
    characteristic: BleCharacteristic;
    /** The name of the descriptor */
    name: string;
    /** The type of the descriptor */
    type: string;
    /** The value of the descriptor. Note this is set to the last result of ${@link BleDescriptor#read} and is initially null */
    value: Buffer;
    /**
     * Read the value for this descriptor
     * @returns {Promise<Buffer>}
     */
    readValue(): Promise<Buffer>;
    /**
     * Write a value to this descriptor
     * @param {Buffer} data The data that should be written
     * @returns {Promise<Buffer>}
     */
    writeValue(data: Buffer): Promise<Buffer>;
}

/**
 * @typedef {object} BlePeripheral.Advertisement
 * @property {string} localName - The local name of the peripheral
 * @property {string} manufacturerData - Manufacturer specific data for peripheral
 * @property {string[]} serviceData - Array of service data entries
 * @property {string[]} serviceUuids - Array of service uuids
 */
/**
 * This class is a representation of a BLE peripheral in Homey.
 * This class must not be initiated by the developer, but retrieved by calling {@link BleAdvertisement#connect}.
 * @property {string} id - Id of the peripheral assigned by Homey
 * @property {string} uuid - Uuid of the peripheral
 * @property {string} address - The mac address of the peripheral
 * @property {string} addressType - The address type of the peripheral
 * @property {boolean} connectable - Indicates if Homey can connect to the peripheral
 * @property {number} rssi - The rssi signal strength value for the peripheral
 * @property {string} state - The state of the peripheral
 * @property {boolean} isConnected - If the peripheral is currently connected to Homey
 * @property {BleService[]} services - Array of services of the peripheral. Note that this array is only filled after the service is discovered by {BleAdvertisement#discoverServices} or {BleAdvertisement#discoverService}
 * @property {BlePeripheral.Advertisement} advertisement - Advertisement data of the peripheral
 */
export class BlePeripheral extends SimpleClass {
    /** Id of the peripheral assigned by Homey */
    id: string;
    /** Uuid of the peripheral */
    uuid: string;
    /** The mac address of the peripheral */
    address: string;
    /** The address type of the peripheral */
    addressType: string;
    /** Indicates if Homey can connect to the peripheral */
    connectable: boolean;
    /** The rssi signal strength value for the peripheral */
    rssi: number;
    /** The state of the peripheral */
    state: string;
    /** Array of services of the peripheral. Note that this array is only filled after the service is discovered by {BleAdvertisement#discoverServices} or {BleAdvertisement#discoverService} */
    services: BleService[];
    /** Advertisement data of the peripheral */
    advertisement: BlePeripheral.Advertisement;
 
    /** If the peripheral is currently connected to Homey */
    get isConnected(): boolean;
    /**
     * Asserts that the device is connected and if not, connects with the device.
     * @returns {Promise<this>}
     */
    assertConnected(): Promise<this>;
    /**
     * Connects to the peripheral if Homey disconnected from it
     * @returns {Promise<this>}
     */
    connect(): Promise<this>;
    connectionId: any;
    /**
     * Disconnect Homey from the peripheral
     * @returns {Promise<void>}
     */
    disconnect(): Promise<void>;
    /**
     * Updates the RSSI signal strength value
     * @returns {Promise<string>} rssi
     */
    updateRssi(): Promise<string>;
    /**
     * Discovers the services of the peripheral
     * @param {string[]} [servicesFilter] list of services to discover, if not given all services will be discovered
     * @returns {Promise<BleService[]>}
     */
    discoverServices(servicesFilter?: string[] | undefined): Promise<BleService[]>;
    /**
     * Discovers all services and characteristics of the peripheral
     * @returns {Promise<BleService[]>}
     */
    discoverAllServicesAndCharacteristics(): Promise<BleService[]>;
    /**
     * Get a service with the given uuid
     * @param {string} uuid The uuid of the service
     * @returns {Promise<BleService>}
     */
    getService(uuid: string): Promise<BleService>;
    /**
     * Shorthand to read a characteristic for given serviceUuid and characteristicUuid
     * @param {string} serviceUuid The uuid of the service that has given characteristic
     * @param {string} characteristicUuid The uuid of the characteristic that needs to be read
     * @returns {Promise<Buffer>}
     */
    read(serviceUuid: string, characteristicUuid: string): Promise<Buffer>;
    /**
     * Shorthand to write to a characteristic for given serviceUuid and characteristicUuid
     * @param {string} serviceUuid The uuid of the service that has given characteristic
     * @param {string} characteristicUuid The uuid of the characteristic that needs to be written to
     * @param {Buffer} data The data that needs to be written
     * @returns {Promise<Buffer>}
     */
    write(serviceUuid: string, characteristicUuid: string, data: Buffer): Promise<Buffer>;
}

declare namespace BlePeripheral {
    type Advertisement = {
        /**
         * - The local name of the peripheral
         */
        localName: string;
        /**
         * - Manufacturer specific data for peripheral
         */
        manufacturerData: string;
        /**
         * - Array of service data entries
         */
        serviceData: string[];
        /**
         * - Array of service uuids
         */
        serviceUuids: string[];
    };
}

/**
 * This class is a representation of a BLE Advertisement for a {@link BlePeripheral} in Homey.
 * This class must not be initiated by the developer, but retrieved by calling {@link BlePeripheral#discoverServices} or {@link BlePeripheral#getService}.
 * @property {string} id - Id of the service assigned by Homey
 * @property {string} uuid - Uuid of the service
 * @property {BlePeripheral} peripheral - The peripheral object that is the owner of this service
 * @property {string} name - The name of the service
 * @property {string} type - The type of the service
 */
export class BleService extends SimpleClass {
    /** Id of the service assigned by Homey */
    id: string;
    /** Uuid of the service */
    uuid: string;
    /** The peripheral object that is the owner of this service */
    peripheral: BlePeripheral;
    /** The name of the service */
    name: string;
    /** The type of the service */
    type: string;
    characteristics: any;
    /**
     * Discovers included service uuids
     * @param {string[]} [includedServicesFilter] Array of included service uuids to search for
     * @returns {Promise<void>}
     */
    discoverIncludedServices(includedServicesFilter?: string[] | undefined): Promise<void>;
    /**
     * Discover characteristics of this service
     * @param {string[]} [characteristicsFilter] List of characteristicUuids to search for
     * @returns {Promise<BleCharacteristic[]>}
     */
    discoverCharacteristics(characteristicsFilter?: string[] | undefined): Promise<BleCharacteristic[]>;
    /**
     * gets a characteristic for given characteristicUuid
     * @param {string} uuid The characteristicUuid to get
     * @returns {Promise<BleCharacteristic>}
     */
    getCharacteristic(uuid: string): Promise<BleCharacteristic>;
    /**
     * Shorthand to read a characteristic for given characteristicUuid
     * @param {string} characteristicUuid The uuid of the characteristic that needs to be read
     * @returns {Promise<Buffer>}
     */
    read(characteristicUuid: string): Promise<Buffer>;
    /**
     * Shorthand to write to a characteristic for given characteristicUuid
     * @param {string} characteristicUuid The uuid of the characteristic that needs to be written to
     * @param {Buffer} data The data that needs to be written
     * @returns {Promise<Buffer>}
     */
    write(characteristicUuid: string, data: Buffer): Promise<Buffer>;
}

/**
 * A OAuth2 Callback class that can be used to log-in using OAuth2
 * @tutorial Drivers-Pairing-System-Views
 * @example
 * let myOAuth2Callback = await this.homey.cloud.createOAuth2Callback(apiUrl);
 *
 * myOAuth2Callback
 *   .on('url', url => {
 *     // the URL which should open in a popup for the user to login
 *   })
 *   .on('code', code => {
 *     // ... swap your code here for an access token
 *   });
 */
export class CloudOAuth2Callback extends SimpleClass {
    url: string;
    /**
     * This event is fired when a URL has been received.
     * The user must be redirected to this URL to complete the sign-in process.
     * @event CloudOAuth2Callback#url
     * @param {string} url - The absolute URL to the sign-in page
     */
    /**
     * This event is fired when a OAuth2 code has been received.
     * The code can usually be swapped by the app for an access token.
     * @event CloudOAuth2Callback#code
     * @param {String|Error} code - The OAuth2 code, or an Error when something went wrong
     */
}

/**
 * A webhook class that can receive incoming messages
 */
export class CloudWebhook extends SimpleClass {
    id: string;
    secret: string;
    data: object;
    /**
     * This event is fired when a webhook message has been received.
     * @event CloudWebhook#message
     * @param {object} args
     * @param {object} args.headers - Received HTTP headers
     * @param {object} args.query - Received HTTP query string
     * @param {object} args.body - Received HTTP body
     */
    /**
     * Unregister the webhook.
     * This is a shortcut for {@link ManagerCloud#unregisterWebhook}
     * @returns {Promise<any>}
     */
    unregister(): Promise<any>;
    toJSON(): {
        id: string;
        secret: string;
        data: object;
    };
}

/**
 * The Device class is a representation of a device paired in Homey.
 * This class should be extended and exported from `device.js`, or any custom class as returned in {@link Driver#onMapDeviceClass}.
 * Methods prefixed with `on` are meant to be overriden.
 * It is not allowed to overwrite the constructor.
 * @tutorial Drivers
 * @example <caption>/drivers/my_driver/device.js</caption>
 * const Homey = require('homey');
 *
 * class MyDevice extends Homey.Device {
 *   async onInit() {
 *     this.log('MyDevice has been initialized');
 *   }
 * }
 *
 * module.exports = MyDevice;
 */
export class Device<T extends App = App> extends SimpleClass {
    /**
     * The Homey instance of this app
     * @type {Homey}
     */
    homey: Homey<T>;
    /**
     * The device's driver instance
     * @type {Driver}
     */
    driver: any;
    getAppId(): any;
    /**
     * Returns a Promise which is resolved when the Device is ready ({@link Device#onInit} has been run).
     * @returns {Promise<void>}
     */
    ready(): Promise<void>;
    /**
     * Get the device's state (capability values)
     * @returns {object} The device's state object
     */
    getState(): object;
    /**
     * Get the device's data object
     * @returns {object} The device's data object
     */
    getData(): object;
    /**
     * Set a warning message for this device, to be shown to the user
     * @param {string | null} [message] Custom warning message, or `null` to unset the warning
     * @returns {Promise<any>}
     */
    setWarning(message?: string | null | undefined): Promise<any>;
    /**
     * Unset the warning message for this device
     * @returns {Promise<any>}
     */
    unsetWarning(): Promise<any>;
    /**
     * Get the device's availability
     * @returns {boolean} If the device is marked as available
     */
    getAvailable(): boolean;
    /**
     * Set the device's availability to true
     * @returns {Promise<any>}
     */
    setAvailable(): Promise<any>;
    /**
     * Set the device's availability to false, with a message
     * @param {string | null} [message] Custom unavailable message, or `null` for default
     * @returns {Promise<any>}
     */
    setUnavailable(message?: string | null | undefined): Promise<any>;
    /**
     * Get a device's setting value
     * @param {String} key
     * @returns {any} The value, or `null` when unknown
     */
    getSetting(key: string): any;
    /**
     * Get the device's settings object
     * @returns {object} The device's settings object
     * @tutorial Drivers-Settings
     */
    getSettings(): object;
    /**
     * Set the device's settings object. The `newSettings` object may contain a subset of all settings.
     * Note that the {@link Device#onSettings} method will not be called when the settings are changed programmatically.
     * @param {object} settings - A settings object
     * @returns {Promise<void>}
     * @tutorial Drivers-Settings
     */
    setSettings(settings: object): Promise<void>;
    /**
     * Get an array of capabilities
     * @returns {string[]} The device's capabilities array
     */
    getCapabilities(): string[];
    /**
     * Returns true if the device has a certain capability
     * @param {string} capabilityId
     * @returns {boolean}
     */
    hasCapability(capabilityId: string): boolean;
    /**
     * Add a capability to this device.
     * Note: this is an expensive method so use it only when needed.
     * @since 3.0.0
     * @param {string} capabilityId
     */
    addCapability(capabilityId: string): Promise<void>;
    /**
     * Removes a capability from this device.
     * Any Flow that depends on this capability will become broken.
     * Note: this is an expensive method so use it only when needed.
     * @since 3.0.0
     * @param {string} capabilityId
     */
    removeCapability(capabilityId: string): Promise<void>;
    /**
     * Get the device's name
     * @returns {string} The device's name
     */
    getName(): string;
    /**
     * Get the device's class
     * @returns {string} The device's class
     */
    getClass(): string;
    /**
     * Set the device's class
     * Any Flow that depends on this class will become broken.
     * @since 3.0.0
     * @param {string} deviceClass
     * @returns {Promise<void>}
     */
    setClass(deviceClass: string): Promise<void>;
    /**
     * Get the device's energy object
     * @since 3.0.0
     * @returns {object} The device's energy info object
     */
    getEnergy(): object;
    /**
     * Set the device's energy object
     * @since 3.0.0
     * @param {object} energy
     */
    setEnergy(energy: object): Promise<void>;
    /**
     * Get a device's capability value
     * @param {string} capabilityId
     * @returns {any} The value, or `null` when unknown
     */
    getCapabilityValue(capabilityId: string): any;
    /**
     * Set a device's capability value
     * @param {string} capabilityId
     * @param {any} value
     * @returns {Promise<void>}
     */
    setCapabilityValue(capabilityId: string, value: any): Promise<void>;
    /**
     * Get a device's capability options.
     * @param {string} capabilityId
     * @since 3.0.0
     * @returns {object}
     */
    getCapabilityOptions(capabilityId: string): object;
    /**
     * Set a device's capability options.
     * Note: this is an expensive method so use it only when needed.
     * @param {string} capabilityId
     * @since 3.0.0
     * @param {object} options
     */
    setCapabilityOptions(capabilityId: string, options: object): Promise<void>;
    /**
     * Register a listener for a capability change event.
     * This is invoked when a device's state change is requested.
     * @param {string} capabilityId
     * @param {Function} listener
     * @param {any} listener.value - The new value
     * @param {object} listener.opts - An object with optional properties, e.g. `{ duration: 300 }`
     * @example
     * this.registerCapabilityListener('dim', ( value, opts ) => {
     *   this.log('value', value);
     *   this.log('opts', opts);
     *   return Promise.resolve();
     * });
     */
    registerCapabilityListener(capabilityId: string, listener: Function): void;
    /**
     * Register a listener for multiple capability change events. The callback is debounced with `timeout`
     * This is invoked when a device's state change is requested.
     * @param {string[]} capabilityIds
     * @param {Function} listener
     * @param {any} listener.capabilityValues - An object with the changed capability values, e.g. `{ dim: 0.5 }`
     * @param {object} listener.capabilityOptions - An object with optional properties, per capability, e.g. `{ dim: { duration: 300 } }`
     * @param {number} timeout - The debounce timeout
     * @example
     * this.registerMultipleCapabilityListener([ 'dim', 'light_hue', 'light_saturation' ], ( capabilityValues, capabilityOptions ) => {
     *   this.log('capabilityValues', capabilityValues);
     *   this.log('capabilityOptions', capabilityOptions);
     *   return Promise.resolve();
     * }, 500);
     */
    registerMultipleCapabilityListener(capabilityIds: string[], listener: Function, timeout: number): void;
    /**
     * Trigger a capability listener programmatically.
     * @param {string} capabilityId
     * @param {any} value
     * @param {object} opts
     * @returns {Promise<any>}
     */
    triggerCapabilityListener(capabilityId: string, value: any, opts?: object): Promise<any>;
    /**
     * Get the entire store
     * @returns {object}
     */
    getStore(): object;
    /**
     * Get all store keys.
     * @returns {String[]}
     */
    getStoreKeys(): string[];
    /**
     * Get a store value.
     * @param {string} key
     * @returns {any} value
     */
    getStoreValue(key: string): any;
    /**
     * Set a store value.
     * @param {string} key
     * @param {any} value
     * @returns {Promise<object>} - The new store
     */
    setStoreValue(key: string, value: any): Promise<object>;
    /**
     * Unset a store value.
     * @param {string} key
     * @returns {Promise<object>} - The new store
     */
    unsetStoreValue(key: string): Promise<object>;
    /**
     * Set this device's album art
     * @param {Image} image
     * @returns {Promise<any>}
     */
    setAlbumArtImage(image: Image): Promise<any>;
    /**
     * Set a device's camera image
     * @param {string} id Unique ID of the image (e.g. `front`)
     * @param {string} title Title of the image (e.g. `Front`)
     * @param {Image} image
     * @returns {Promise<any>}
     */
    setCameraImage(id: string, title: string, image: Image): Promise<any>;
    destroy(): void;
    /**
     * This method is called when the user updates the device's settings.
     * @param {object} event the onSettings event data
     * @param {object} event.oldSettings The old settings object
     * @param {object} event.newSettings The new settings object
     * @param {string[]} event.changedKeys An array of keys changed since the previous version
     * @returns {Promise<string|void>} return a custom message that will be displayed
     * @tutorial Drivers-Settings
     */
    onSettings({ oldSettings, newSettings, changedKeys }: {
        oldSettings: object;
        newSettings: object;
        changedKeys: string[];
    }): Promise<string | void>;
    /**
     * This method is called when the user updates the device's name. Use this to synchronize the name to the device or bridge.
     * @param {string} name The new name
     */
    onRenamed(name: string): void;
    /**
     * This method is called when the user deleted the device.
     */
    onDeleted(): void;
    /**
     * This method is called when the user adds the device, called just after pairing.
     */
    onAdded(): void;
    /**
     * This method is called when the device is loaded, and properties such as name, capabilities and state are available.
     */
    onInit(): Promise<void>;
    /**
     * This method is called when a device has been discovered. Overload this method, and return a truthy value when the result belongs to the current device or falsy when it doesn't.
     * By default, the method will match on a device's data.id property.
     * @param {DiscoveryResult} discoveryResult
     */
    onDiscoveryResult(discoveryResult: DiscoveryResult): boolean;
    /**
     * This method is called when the device is found for the first time. Overload this method to create a connection to the device. Throwing here will make the device unavailable with the error message.
     * @param {DiscoveryResult} discoveryResult
     */
    onDiscoveryAvailable(discoveryResult: DiscoveryResult): void;
    /**
     * This method is called when the device's address has changed.
     * @param {DiscoveryResult} discoveryResult
     */
    onDiscoveryAddressChanged(discoveryResult: DiscoveryResult): void;
    /**
     * This method is called when the device has been found again.
     * @param {DiscoveryResult} discoveryResult
     */
    onDiscoveryLastSeenChanged(discoveryResult: DiscoveryResult): void;
}


/**
 * This class should not be instanced manually.
 * @since 2.5.0
 */
export class DiscoveryResult extends SimpleClass {
    /** The identifier of the result. */
    id: string
    /** When the device has been last discovered. */
    lastSeen: Date
    /**
     * Fires when the address has changed.
     * @event DiscoveryResult#addressChanged
     * @param {DiscoveryResult} discoveryResult
     */
    /**
     * Fires when the device has been seen again.
     * @event DiscoveryResult#lastSeenChanged
     * @param {DiscoveryResult} discoveryResult
     */
}

/**
 * This is a discovery result of a MAC discovery strategy.
 * This class should not be instanced manually.
 * @extends DiscoveryResult
 * @since 2.5.0
 */
export class DiscoveryResultMAC extends DiscoveryResult {
    /** The identifier of the result. */
    id: string;
    /** When the device has been last discovered. */
    lastSeen: Date;
    /** The (IP) address of the device. */
    address: string;
    /** The MAC address of the device. */
    mac: string;
}

/**
 * This is a discovery result of a mDNS-SD discovery strategy.
 * This class should not be instanced manually.
 * @extends DiscoveryResult
 * @since 2.5.0
 */
export class DiscoveryResultMDNSSD extends DiscoveryResult {
    /** The identifier of the result. */
    id: string;
    /** When the device has been last discovered. */
    lastSeen: Date;
    /** The (IP) address of the device. */
    address: string;
    /** The port of the device. */
    port: string;
    /** The TXT records of the device, key-value. */
    txt: object;
    /** The name of the device. */
    name: string;
    /** The full name of the device. */
    fullname: string;
}

/**
 * This is a discovery result of a SSDP discovery strategy.
 * This class should not be instanced manually.
 * @extends DiscoveryResult
 * @since 2.5.0
 */
export class DiscoveryResultSSDP extends DiscoveryResult {
    /** The identifier of the result. */
    id: string;
    /** When the device has been last discovered. */
    lastSeen: Date;
    /** The (IP) address of the device. */
    address: string;
    /** The port of the device. */
    port: string;
    /** The headers (lowercase) in the SSDP response. */
    headers: object;
    protected constructor(props: any);
}

/**
 * This class should not be instanced manually, but created by calling {@link ManagerDiscovery#getStrategy} instead.
 * @since 2.5.0
 */
export class DiscoveryStrategy extends SimpleClass {
    type: string;
    /**
     *
     * @returns {object} Returns an object of {@link DiscoveryResultMDNSSD}, {@link DiscoveryResultSSDP} or {@link DiscoveryResultMAC} instances.
     */
    getDiscoveryResults(): Record<string, DiscoveryResultMDNSSD | DiscoveryResultSSDP | DiscoveryResultMAC>;
    /**
     * @param {string} id
     * @returns {DiscoveryResult} Returns a {@link DiscoveryResultMDNSSD}, {@link DiscoveryResultSSDP} or {@link DiscoveryResultMAC} instance.
     */
    getDiscoveryResult(id: string): DiscoveryResultMDNSSD | DiscoveryResultSSDP | DiscoveryResultMAC;
}

/**
 * The Driver class manages all Device instances, which represent all paired devices.
 * This class should be extended and exported from `driver.js`.
 * Methods prefixed with `on` are meant to be overriden.
 * It is not allowed to overwrite the constructor.
 * @tutorial Drivers
 * @example <caption>/drivers/my_driver/driver.js</caption>
 * const Homey = require('homey');
 *
 * class MyDriver extends Homey.Driver {
 *   async onInit() {
 *     this.log('MyDriver has been initialized');
 *   }
 * }
 *
 * module.exports = MyDriver;
 */
export class Driver<T extends App = App> extends SimpleClass {
    /**
     * When this method exists, it will be called prior to initing the device instance. Return a class that extends {@link Device}.
     * @function Driver#onMapDeviceClass
     * @param {Device} device - A temporary Device instance to check certain properties before deciding which class the device should use. This class will exist for a single tick, and does not support async methods.
     * @example
     * class MyDriver extends Homey.Driver {
     *
     *   onMapDeviceClass( device ) {
     *     if( device.hasCapability('dim') ) {
     *       return MyDeviceDim;
     *     } else {
     *       return MyDevice;
     *     }
     *   }
     * }
     */
    static isEqualDeviceData(deviceDataA: any, deviceDataB: any): boolean;
    id: string;
    /**
     * The Homey instance of this driver
     * @type {Homey}
     */
    homey: Homey<T>;
    /**
     * The driver's manifest (app.json entry)
     * @type {object}
     */
    manifest: object;
    /**
     * Returns a promise which is resolved when the Driver is ready ({@link Driver#onInit} has been run).
     * @returns {Promise<void>} promise that is resolved when the Drivers Manager is ready
     */
    ready(): Promise<void>;
    /**
     * Get an Array with all {@link Device} instances
     * @returns {Device[]} Devices
     */
    getDevices(): Device[];
    /**
     * Get a Device instance by its deviceData object.
     * @param {object} deviceData Unique Device object as provided during pairing
     * @returns {Device} Device
     */
    getDevice(deviceData: object): Device;
    getDeviceById(deviceAppId: any): any;
    /**
     * Get the driver's discovery strategy when defined in the manifest
     * @returns {DiscoveryStrategy}
     */
    getDiscoveryStrategy(): any;
    /**
     * This method is called when the driver is inited.
     */
    onInit(): Promise<void>;
    /**
     * This method is called when a pair session starts.
     * @param {PairSession} session Bi-directional socket for communication with the front-end
     */
    onPair(session: any): void;
    /**
     * This method is called when no custom onPair() method has been defined, and the default is being used.
     * Simple drivers should override this method to provide a list of devices ready to be paired.
     * @returns {Promise<any[]>}
     */
    onPairListDevices(): Promise<any[]>;
}

/**
 * The FlowArgument class represents an argument for a Flow Card as defined in the app's `app.json`.
 * This class must not be initiated by the developer, but retrieved by calling {@link FlowCard#getArgument}.
 */
export class FlowArgument extends SimpleClass {
    /**
     * Register a listener for a autocomplete event.
     * This is fired when the argument is of type `autocomplete` and the user typed a query.
     *
     * @param {Function} listener - Should return a promise that resolves to the autocomplete results.
     * @param {string} listener.query - The typed query by the user
     * @param {object} listener.args - The current state of the arguments, as selected by the user in the front-end
     * @returns {FlowArgument}
     *
     * @example
     * const myActionCard = this.homey.flow.getActionCard('my_action');
     *
     * const myActionCardMyArg = myAction.getArgument('my_arg');
     *
     * myActionCardMyArg.registerAutocompleteListener(async (query, args) => {
     *   const results = [
     *     {
     *       name: 'Value name',
     *       description: 'Optional description',
     *       icon: 'https://path.to/icon.svg',
     *       // For images that are not svg use:
     *       // image: 'https://path.to/icon.png',
     *
     *       // You can freely add additional properties to access in registerRunListener
     *       id: '...',
     *     },
     *   ];
     *
     *   // filter based on the query
     *   return results.filter((result) => {
     *     return result.name.toLowerCase().includes(query.toLowerCase());
     *   });
     * });
     */
    registerAutocompleteListener(listener: Function): FlowArgument;
}

/**
 * The FlowCard class is a programmatic representation of a Flow card, as defined in the app's `/app.json`.
 */
export class FlowCard extends SimpleClass {
    id: string;
    type: "trigger" | "condition" | "action";
    manifest: any;
    /**
     * This event is fired when the card is updated by the user (e.g. a Flow has been saved).
     *
     * @event FlowCard#update
     */
    /**
     * Register a listener for a autocomplete event of a specific flow card argument.
     * This is fired when the argument is of type `autocomplete` and the user typed a query.
     *
     * @param {string} name - name of the desired flow card argument.
     * @param {Function} listener - Should return a promise that resolves to the autocomplete results.
     * @param {string} listener.query - The typed query by the user
     * @param {object} listener.args - The current state of the arguments, as selected by the user in the front-end
     * @returns {FlowCard}
     *
     * @example
     * const myActionCard = this.homey.flow.getActionCard('my_action');
     *
     * myActionCard.registerArgumentAutocompleteListener('my_arg', async (query, args) => {
     *   const results = [
     *     {
     *       name: 'Value name',
     *       description: 'Optional description',
     *       icon: 'https://path.to/icon.svg',
     *       // For images that are not svg use:
     *       // image: 'https://path.to/icon.png',
     *
     *       // You can freely add additional properties to access in registerRunListener
     *       id: '...',
     *     },
     *   ];
  
     *   // filter based on the query
     *   return results.filter((result) => {
     *     return result.name.toLowerCase().includes(query.toLowerCase());
     *   });
     * });
     */
    registerArgumentAutocompleteListener(name: string, listener: Function): FlowCard;
    getArgument(name: any): any;
    /**
     * Get the current argument values of this card, as filled in by the user.
     * @returns {Promise<any[]>} A Promise that resolves to an array of key-value objects with the argument's name as key. Every array entry represents one Flow card.
     */
    getArgumentValues(): Promise<any[]>;
    /**
     * Register a listener for a run event.
     * @param {Function} listener - Should return a promise that resolves to the FlowCards run result
     * @param {object} listener.args - The arguments of the Flow Card, with keys as defined in the `/app.json` and values as specified by the user
     * @param {object} listener.state - The state of the Flow
     * @returns {FlowCard}
     */
    registerRunListener(listener: Function): FlowCard;
}

/**
 * The FlowCardAction class is a programmatic representation of a Flow Card with type `action`, as defined in an app's <code>app.json</code>.
 * @extends FlowCard
 */
export class FlowCardAction extends FlowCard {

}

/**
 * The FlowCardCondition class is a programmatic representation of a Flow Card with type `condition`, as defined in an app's <code>app.json</code>.
 * @extends FlowCard
 */
export class FlowCardCondition extends FlowCard {

}

/**
 * The FlowCardTrigger class is a programmatic representation of a Flow Card with type `trigger`, as defined in an app's <code>app.json</code>.
 * @extends FlowCard
 */
export class FlowCardTrigger extends FlowCard {
    /**
     * Trigger this card to start a Flow
     * @param {object} tokens - An object with tokens and their typed values, as defined in an app's <code>app.json</code>
     * @param {object} state - An object with properties which are accessible throughout the Flow
     * @returns {Promise<any>} Promise resolves when flow is triggered
     */
    trigger(tokens: object, state: object): Promise<any>;
}

/**
 * The FlowCardTriggerDevice class is a programmatic representation of a Flow Card with type `trigger` and an argument with type `device` and a filter with `driver_id`, as defined in an app's <code>app.json</code>.
 * @extends FlowCardTrigger
 */
export class FlowCardTriggerDevice extends FlowCardTrigger {

}

/**
 * The FlowToken class can be used to create a Tag in the Flow Editor.
 * @tutorial Flow-Tokens
 */
export class FlowToken {
    id: string;
    opts: {
        type: string;
        title: string;
    };
    /**
     * Unregister the token.
     * This is a shorthand method for {@link ManagerFlow#unregisterToken}.
     * @returns {Promise<any>}
     */
    unregister(): Promise<any>;
    /**
     * Set or update the value of the token.
     * @param {string|number|boolean|Image} value The value of the token, should be of the same type as defined in the Token instance
     * @returns {Promise<any>}
     */
    setValue(value: string | number | boolean | Image): Promise<any>;
}

/**
 * The Homey instance holds all the Managers, System Events and generic properties.
 * You can access the Homey instance through `this.homey` on App, Driver and Device, it is also passed into your api handlers.
 * @extends SimpleClass
 * @property {App} app - A pointer to the App's instance.
 * @property {object} manifest - The `/app.json` as object.
 * @property {string} dir - The root directory of the app.
 * @example
 * // register system events
 * this.homey.on('memwarn', () => console.log('memwarn!'));
 *
 * // access a Manager
 * const latitude = this.homey.geolocation.{@link ManagerGeolocation#getLatitude|getLatitude}();
 * console.log('Latitude: ', latitude);
 */
declare class Homey<T extends App = App> extends SimpleClass {
    /**
     * A pointer to the App's instance.
     * @type {App}
     */
    app: T;
    /**
     * The root directory of the app.
     * @type {string}
     */
    dir: string;
    tmpdir: string;
    /**
     * The software version of the Homey that is running this app
     * @type {string}
     */
    version: string;
    /**
     * The app.json manifest
     * @type {object}
     */
    manifest: object;
    ready(): Promise<any>;
    markReady(): void;
    hasPermission(permission: any): any;
    /**
     * Alias to setTimeout that ensures the timout is correctly disposed
     * of when the Homey instance gets destroyed
     * @param {Function} callback
     * @param {number} ms
     * @param  {...any} args
     */
    setTimeout(callback: Function, ms: number, ...args: any[]): number;
    /**
     * Alias to clearTimeout
     * @param {any} timeoutId
     */
    clearTimeout(timeoutId: any): void;
    /**
     * Alias to setInterval that ensures the interval is correctly disposed
     * of when the Homey instance gets destroyed
     * @param {Function} callback
     * @param {number} ms
     * @param  {...any} args
     */
    setInterval(callback: Function, ms: number, ...args: any[]): number;
    /**
     * Alias to clearInterval
     * @param {any} timeoutId
     */
    clearInterval(timeoutId: any): void;

    __(key: string, properties?: any): string;

    api: ManagerApi;
    apps: ManagerApps;
    arp: ManagerArp;
    audio: ManagerAudio;
    ble: ManagerBLE;
    clock: ManagerClock;
    cloud: ManagerCloud;
    discovery: ManagerDiscovery;
    drivers: ManagerDrivers;
    flow: ManagerFlow;
    geolocation: ManagerGeolocation;
    i18n: ManagerI18n;
    images: ManagerImages;
    insights: ManagerInsights;
    ledring: ManagerLedring;
    nfc: ManagerNFC;
    notifications: ManagerNotifications;
    rf: ManagerRF;
    settings: ManagerSettings;
    speechInput: ManagerSpeechInput;
    speechOutput: ManagerSpeechOutput;
    zigbee: ManagerZigBee;
    zwave: ManagerZwave;
}

/**
 * @typedef Image.ImageStreamMetadata
 * @property {string} filename - A filename for this image
 * @property {string} contentType - The mime type of this image
 * @property {number} [contentLength] - The size in bytes, if available
 */
/**
 * The Image class can be used to create an Image, which can be used in the Flow Editor.
 * An image must be registered, and the contents will be retrieved when needed.
 * @property {string} cloudUrl - The public URL to this image using Athom's cloud proxy (HTTPS)
 * @property {string} localUrl - The public URL to this image using Homey's local IP address (HTTP)
 */
export class Image {
    id: string | null;
    /**
     * Unregister the image.
     * This is a shorthand method for {@link ManagerImages#unregisterImage}.
     */
    unregister(): Promise<any>;
    /**
     * Pipe the image into the target stream and returns metadata.
     * @param {NodeJS.WritableStream} stream
     * @return {Promise<Image.ImageStreamMetadata>} Stream metadata
     * @since 2.2.0
     */
    pipe(stream: NodeJS.WritableStream): Promise<Image.ImageStreamMetadata>;
    /**
     * Returns a stream containing the image data.
     * @return {Promise<NodeJS.ReadableStream>} A nodejs stream containing the image data. The readable stream contains metadata properties ({@link Image.ImageStreamMetadata})
     * @since 2.2.0
     */
    getStream(): Promise<NodeJS.ReadableStream>;
    /**
     * Set the image's data.
     * @param {Function} source - This function will be called with the parameter `(stream)` when someone pipes this image. Pipe the image content to the stream. This is mostly useful for external image sources.
     * @since 2.2.0
     * @tutorial Images
     */
    setStream(source: Function): void;
    /**
     * Set the image's path
     * @param {String} path - Relative path to your image, e.g. `/userdata/kitten.jpg`
     */
    setPath(path: string): void;
    /**
     * Set the image's URL. This URL must be accessible from any network.
     * @param {String} url - Absolute url, `https://`
     */
    setUrl(url: string): void;
    /**
     * Notify that the image's contents have changed
     * @returns {Promise<any>}
     */
    update(): Promise<any>;
    toJSON(): string;
}

declare namespace Image {
    type ImageStreamMetadata = {
        /**
         * - A filename for this image
         */
        filename: string;
        /**
         * - The mime type of this image
         */
        contentType: string;
        /**
         * - The size in bytes, if available
         */
        contentLength?: number | undefined;
    };
}

/**
 * This class represents a Log in Insights.
 * This class should not be instanced manually, but retrieved using a method in {@link ManagerInsights} instead.
 */
export class InsightsLog {
    get name(): any;
    /**
     * Create a new log entry with the given value.
     * @param {number|boolean} value
     * @returns {Promise<any>}
     */
    createEntry(value: number | boolean): Promise<any>;
    toJSON(): {
        name: any;
        options: any;
    };
}

/**
 * @typedef LedringAnimation.Frame
 * @property {number} r between 0 and 255.
 * @property {number} g between 0 and 255.
 * @property {number} b between 0 and 255.
 */
/**
 * This class contains an animation that can be played on Homey's LED Ring.
 */
export class LedringAnimation extends events.EventEmitter {
    opts: {
        frames: LedringAnimation.Frame[];
        priority: string;
        transition: number;
        duration: number | boolean;
        options: {
            fps: number;
            tfps: number;
            rpm: number;
        };
    };
    /**
     * @event LedringAnimation#start
     * @desc When the animation has started
     */
    /**
     * @event LedringAnimation#stop
     * @desc When the animation has stopped
     */
    /**
     * @event LedringAnimation#finish
     * @desc When the animation has finished (duration has been reached)
     */
    /**
     * Start the animation.
     * @returns {Promise<any>}
     */
    start(): Promise<any>;
    /**
     * Stop the animation.
     * @returns {Promise<any>}
     */
    stop(): Promise<any>;
    /**
     * Update the animation frames.
     * @param {LedringAnimation.Frame[]} frames
     * @returns {Promise<any>}
     */
    updateFrames(frames: LedringAnimation.Frame[]): Promise<any>;
    /**
     * Unregister the animation. This is a shorthand method to {@link ManagerLedring#unregisterAnimation}.
     * @returns {Promise<LedringAnimation>}
     */
    unregister(): Promise<LedringAnimation>;
    /**
     * Register this animation as a screensaver. This is a shorthand method to {@link ManagerLedring#registerScreensaver}.
     * @param {String} screensaverName - The name of the screensaver, as defined in `/app.json`
     * @returns {Promise<any>}
     */
    registerScreensaver(screensaverName: string): Promise<any>;
    /**
     * Unregister this animation as a screensaver. This is a shorthand method to {@link ManagerLedring#unregisterScreensaver}.
     * @param {String} screensaverName - The name of the screensaver, as defined in `/app.json`
     * @returns {Promise<any>}
     */
    unregisterScreensaver(screensaverName: string): Promise<any>;
    toJSON(): {
        frames: LedringAnimation.Frame[];
        priority: string;
        transition: number;
        duration: number | boolean;
        options: {
            fps: number;
            tfps: number;
            rpm: number;
        };
    };
}

declare namespace LedringAnimation {
    type Frame = {
        /**
         * between 0 and 255.
         */
        r: number;
        /**
         * between 0 and 255.
         */
        g: number;
        /**
         * between 0 and 255.
         */
        b: number;
    };
}

/**
 * This class contains a system animation that can be played on Homey's LED Ring.
 * @extends LedringAnimation
 */
export class LedringAnimationSystem extends LedringAnimation {

}

/**
 * This class contains a system animation that can be played on Homey's LED Ring.
 * @extends LedringAnimationSystem
 */
export class LedringAnimationSystemProgress extends LedringAnimationSystem {
    /**
     * Set the current progress
     * @param {number} progress - A progress number between 0 - 1
     * @returns {Promise<any>}
     */
    setProgress(progress: number): Promise<any>;
}
export class Manager extends SimpleClass {

}

/**
 * @callback PairSessionHandler
 * @param {any} data
 * @returns {Promise<any>}
 */
/**
 * PairSession is returned by Driver#onPair.
 * PairSession#setHandler accepts async functions that can receive and respond to messages from the pair view.
 * @tutorial Drivers-Pairing
 */
declare class PairSession {
    /**
     * Register a handler for an event
     * @param {string} event
     * @param {PairSessionHandler} handler
     */
    setHandler(event: string, handler: PairSessionHandler): this;
}

declare namespace PairSession {
    export { PairSessionHandler };
}

type PairSessionHandler = (data: any) => Promise<any>;

/**
 * The Signal class represents an Signal as defined in the app's <code>app.json</code>.
 * @tutorial Signals
 */
export class Signal extends SimpleClass {
    id: string;
    frequency: string;
    /**
     * Start receiving messages for this signal.
     * This is a shorthand method for {@link ManagerRF#enableSignalRX}.
     * @returns {Promise<void>}
     */
    enableRX(): Promise<void>;
    /**
     * Stop receiving messages for this signal.
     * This is a shorthand method for {@link ManagerRF#disableSignalRX}.
     * @returns {Promise<void>}
     */
    disableRX(): Promise<void>;
    /**
     * Transmit a frame
     * @param {number[]} frame - An array of word indexes
     * @param {object} [opts] - Transmission options
     * @param {object} [opts.repetitions] - A custom amount of repetitions
     * @returns {Promise<any>}
     */
    tx(frame: number[], opts?: {
        repetitions?: object | undefined;
    } | undefined): Promise<any>;
    /**
     * Transmit a command
     * @param {string} commandId - The ID of the command, as specified in `/app.json`
     * @param {object} [opts] - Transmission options
     * @param {object} [opts.repetitions] - A custom amount of repetitions
     * @returns {Promise<any>}
     */
    cmd(commandId: string, opts?: {
        repetitions?: object | undefined;
    } | undefined): Promise<any>;
}

/**
 * The Signal433 class represents an 433 MHz Signal
 * @extends Signal
 */
export class Signal433 extends Signal {

}

/**
 * The Signal868 class represents an 868 MHz Signal
 * @extends Signal
 */
export class Signal868 extends Signal {

}

/**
 * The SignalInfrared class represents an Infrared Signal
 * @extends Signal
 */
export class SignalInfrared extends Signal {

}

/**
 * This is a simple class, extended by many other classes.
 */
export class SimpleClass extends events.EventEmitter {
    /**
     * Log a message to the console (stdout)
     * @param {...*} args
     */
    log(...args: any[]): void;
    /**
     * Log a message to the console (stderr)
     * @param {...*} args
     */
    error(...args: any[]): void;
}

/**
 * This class is a representation of a Zigbee Device in Homey.
 * This class must not be initiated directly, but retrieved by calling {@link ManagerZigBee#getNode}.
 * @class ZigBeeNode
 * @property {string} manufacturerName
 * @property {string} productId
 * @property {boolean} receiveWhenIdle Reflects whether ZigBeeNode can receive commands while
 * idle. If this property is false the ZigBeeNode is a Sleepy End Device (SED, check the [Zigbee Cluster Specification (PDF)](https://etc.athom.com/zigbee_cluster_specification.pdf) for more information). In that case it can not be assumed that
 * the device will timely respond to commands and or requests, it will only be 'awake' for a
 * short amount of time on an unknown interval.
 *
 * @example
 * // device.js
 * const zigBeeNode = await this.homey.zigbee.getNode(this);
 */
export class ZigBeeNode extends SimpleClass {
    /**
     * This method should not be used. It is available as fallback in case app
     * migrations require interviewing of nodes to determine their endpoint
     * descriptors.
     * @returns {Promise<void>}
     * @private
     * @ignore
     */
    private interview;
    /**
     * Call this method to send a frame this ZigBeeNode.
     * @param {number} endpointId
     * @param {number} clusterId
     * @param {Buffer} frame
     * @returns {Promise<void>}
     */
    sendFrame(endpointId: number, clusterId: number, frame: Buffer): Promise<void>;
    /**
     * This method is called when a frame has been received from this ZigBeeNode.
     * This method must be overridden.
     * @param {number} endpointId
     * @param {number} clusterId
     * @param {Buffer} frame
     * @param {object} meta
     * @returns {Promise<void>}
     */
    handleFrame(endpointId: number, clusterId: number, frame: Buffer, meta: object): Promise<void>;
}

/**
 * This class is a representation of a Z-Wave Command Class for a {@link ZwaveNode} in Homey.
 * The class has properties of type Function that are the commands, dependent on the Command Class.
 * For an example see {@link ManagerZwave#getNode}.
 */
export class ZwaveCommandClass extends SimpleClass {
    version: any;
    /**
     * This event is fired when a battery node changed it's online or offline status.
     * @event ZwaveCommandClass#report
     * @param {object} command
     * @param {number} command.value - Value of the command
     * @param {string} command.name - Name of the command
     * @param {object} report - The report object. Contents depend on the Command Class
     */
}

/**
 * This class is a representation of a Z-Wave Device in Homey.
 * This class must not be initiated by the developer, but retrieved by calling {@link ManagerZwave#getNode}.
 * @property {boolean} online - If the node is online
 * @property {object} CommandClass - An object with {@link ZwaveCommandClass} instances
 */
export class ZwaveNode extends SimpleClass {
    online: any;
    CommandClass: {};
    MultiChannelNodes: {};
    /**
     * This event is fired when a battery node changed it's online or offline status.
     * @property {boolean} online - If the node is online
     * @event ZwaveNode#online
     */
    /**
     * This event is fired when a Node Information Frame (NIF) has been sent.
     * @property {Buffer} nif
     * @event ZwaveNode#nif
     */
    /**
     * This event is fired when a a Node has received an unknown command, usually due to a missing Command Class.
     * @property {Buffer} data
     * @event ZwaveNode#unknownReport
     */
}

export const env: any;
export const manifest: any;
