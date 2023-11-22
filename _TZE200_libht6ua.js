const fz = require('zigbee-herdsman-converters/converters/fromZigbee');
const tz = require('zigbee-herdsman-converters/converters/toZigbee');
const exposes = require('zigbee-herdsman-converters/lib/exposes');
const reporting = require('zigbee-herdsman-converters/lib/reporting');
const extend = require('zigbee-herdsman-converters/lib/extend');
const e = exposes.presets;
const ea = exposes.access;
const tuya = require('zigbee-herdsman-converters/lib/tuya');

const definition = {
    // Since a lot of TuYa devices use the same modelID, but use different datapoints
    // it's necessary to provide a fingerprint instead of a zigbeeModel
    fingerprint: [
        {
            // The model ID from: Device with modelID 'TS0601' is not supported
            // You may need to add \u0000 at the end of the name in some cases
            modelID: 'TS0601',
            // The manufacturer name from: Device with modelID 'TS0601' is not supported.
            manufacturerName: '_TZE200_libht6ua',
        },
    ],
    model: 'TS0601_cover',
    vendor: 'TuYa',
    description: 'Cover motor',
    fromZigbee: [tuya.fz.datapoints],
    toZigbee: [tuya.tz.datapoints],
    onEvent: tuya.onEventSetTime, // Add this if you are getting no converter for 'commandMcuSyncTime'
    configure: tuya.configureMagicPacket,
    exposes: [e.cover_position().setAccess('position', ea.STATE_SET),e.battery(),e.binary('motor_fault', ea.STATE, true, false),],
        // Here you should put all functionality that your device exposes
    
    meta: {
        // All datapoints go in here
        tuyaDatapoints: [
            [1, 'state', tuya.valueConverterBasic.lookup({'OPEN': tuya.enum(0), 'STOP': tuya.enum(1), 'CLOSE': tuya.enum(2)})],
            [2, 'position', tuya.valueConverter.coverPosition],
            [3, 'position', tuya.valueConverter.raw],
            [12, 'motor_fault', tuya.valueConverter.trueFalse1],
            [103, 'battery', tuya.valueConverter.raw],
            
            // The datapoints below expose values but I can't detect why, I don't find them useful.
            // [102 when opening or closing and charging or not, expose value: 0
            // [101 when opening or closing and charging or not, expose value: 1
            // [104 when opening or closing and charging or not, expose value: 10
            // [105 when opening or closing and charging or not, expose value: 50 
            // [7] when opening or closing and charging or not, expose value: 2,
            // [13] when opening or closing and charging or not, expose value: 100,
            // [106] when opening or closing and charging or not, expose value: 100,
            // [108] when opening or closing and charging or not, not expose value: "nothing",
        ],
    },
};

module.exports = definition;
