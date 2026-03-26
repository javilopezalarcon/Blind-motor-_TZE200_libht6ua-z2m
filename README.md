# 🪟 Zigbee2MQTT — Custom Converter for Tuya Blind Motor `_TZE200_libht6ua`

Custom external converter to integrate the **Tuya Zigbee roller blind motor `_TZE200_libht6ua` (model TS0601)** into [Zigbee2MQTT](https://www.zigbee2mqtt.io/).

This device is not natively supported by Z2M and requires this external converter to work properly.

> ℹ️ I no longer use this motor, so I can't actively test updates. The converter worked reliably for me and for many others — I'm sharing it so it keeps helping people.

---

## 🛒 Device

Tuya Zigbee roller blind motor, available on AliExpress:
[→ View listing](https://es.aliexpress.com/item/1005005574510278.html)

![Motor](https://github.com/javilopezalarcon/Blind-motor-_TZE200_libht6ua-z2m/assets/77857755/93747a58-4d23-4efe-88ed-e15e599b6521)

| Property | Value |
|---|---|
| Model ID | `TS0601` |
| Manufacturer | `_TZE200_libht6ua` |
| Protocol | Zigbee (Tuya datapoints) |
| Power | Battery |
| Type | Roller blind motor / cover |

---

## ✨ Supported features

- Open / Close / Stop
- Position control (0–100%)
- Motor calibration (set upper and lower limits)

---

## 🛠️ Installation

### 1. Copy the converter file

Download `_TZE200_libht6ua.js` and place it somewhere accessible to Zigbee2MQTT, for example:

```
/config/zigbee2mqtt/converters/_TZE200_libht6ua.js
```

### 2. Add it to your Z2M configuration

In your `configuration.yaml` for Zigbee2MQTT:

```yaml
external_converters:
  - _TZE200_libht6ua.js
```

If you placed the file in a different folder, use the full path:

```yaml
external_converters:
  - /config/zigbee2mqtt/converters/_TZE200_libht6ua.js
```

### 3. Restart Zigbee2MQTT

After restarting, pair the motor normally. It should be recognised and expose position and control entities.

---

## ⚙️ Motor calibration

The motor needs to know its upper and lower limits before position control works correctly. The process is physical:

1. With the motor **unpowered**, manually position the blind at the **fully open** position
2. Power the motor and **pair it to Z2M**
3. Use the **Start** button in the Z2M UI (or send a `OPEN` command) to begin calibration mode
4. The motor will run down to the fully closed position and stop automatically, storing both limits

Once calibrated, position control (0–100%) will work as expected.

---

## ⚠️ Known limitations and compatibility notes

**Z2M API version:** This converter uses the **legacy zigbee-herdsman-converters API** (`fz`, `tz`, `exposes` as direct imports). It was written for older Z2M versions and may require adaptation if you are running a recent Z2M release (2.x+). If it fails to load, check the Z2M logs for import errors.

**Variant `_TZE200_libht6ua` vs `_TZE284_libht6ua`:** There is a newer variant of this motor with manufacturer name `_TZE284_libht6ua`. This converter targets `_TZE200_libht6ua` only — the `_TZE284` variant uses the same datapoints but has a different fingerprint and is not covered here. As of mid-2025, the `_TZE284` variant has a pending support request in the official Z2M repo.

**Native support:** As of the time of writing, this device is not in the official Z2M device database. If it has since been added natively, you may not need this converter — check the [Z2M supported devices list](https://www.zigbee2mqtt.io/supported-devices/) before installing.

---

## 🏠 Home Assistant integration

Once the converter is loaded and the device is paired, it will appear in Z2M as a `cover` entity and can be used directly in Home Assistant via the Z2M integration. Position, open, close and stop are all available as standard cover controls.

---

## ☕ Buy me a coffee

If this saved you a headache, a coffee is always welcome — but no pressure at all.

[→ paypal.me/javilopez83](https://www.paypal.me/javilopez83)

---

## 📄 License

MIT — use and adapt freely.
