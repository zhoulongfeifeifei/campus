jQuery.xml = function (str) {
    return $(jQuery.xml.createXmlobject(str));
}
jQuery.xml.createXmlobject = function (str) {
    if (str == "" || str === undefined) return;
    str = str.replace("&lt;", "<").replace("&quot;", "\"").replace("&gt;", ">").replace(/^\s+/,"").replace(/\s+$/,"");
        if (!/^<\?xml/.test(str)) {
            str = '<?xml version="1.0" encoding="utf-8"?>' + str;
        }        
        if (document.all) {
            var xmlDom = new ActiveXObject("Microsoft.XMLDOM");
            xmlDom.loadXML(str);
            return xmlDom;
        } 
        else {
            return new DOMParser().parseFromString(str, "text/xml");
        }
}
