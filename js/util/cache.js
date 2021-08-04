KiddoPaint.Cache.StampSettings = {}
KiddoPaint.Cache.Defaults = {
    hueShift: 0,
    altSize: 144
}

KiddoPaint.Cache.getStampSettings = function(stamp) {
    if (!KiddoPaint.Cache.StampSettings[stamp]) {
        KiddoPaint.Cache.StampSettings[stamp] = {
            hueShift: KiddoPaint.Cache.Defaults.hueShift,
            altSize: KiddoPaint.Cache.Defaults.altSize
        };
    }
    return KiddoPaint.Cache.StampSettings[stamp];
}

KiddoPaint.Cache.setStampSetting = function(stamp, setting, value) {
    if (!KiddoPaint.Cache.StampSettings[stamp]) {
        KiddoPaint.Cache.StampSettings[stamp] = {
            hueShift: KiddoPaint.Cache.Defaults.hueShift,
            altSize: KiddoPaint.Cache.Defaults.altSize
        };
    }
    KiddoPaint.Cache.StampSettings[stamp][setting] = value;
}