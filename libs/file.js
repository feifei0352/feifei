import CryptoJS from "crypto-js";
 //秘钥
const CRYPTOJSKEY= "abcdefgabcdefg12";
// 加密
encrypt(plaintText) {
    var plaintText = plaintText;
    var options = {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    };
    var key = CryptoJS.enc.Utf8.parse(CRYPTOJSKEY);
    var encryptedData = CryptoJS.AES.encrypt(plaintText, key, options);
    var encryptedBase64Str = encryptedData.toString().replace(/\//g, "_");
    encryptedBase64Str = encryptedBase64Str.replace(/\+/g,"-");
    return encryptedBase64Str;
},
//解密
decrypt(encryptedBase64Str) {
    var vals = encryptedBase64Str.replace(/\-/g, '+').replace(/_/g, '/');
    var options = {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    };
    var key = CryptoJS.enc.Utf8.parse(CRYPTOJSKEY);
    var decryptedData = CryptoJS.AES.decrypt(vals, key, options);
    var decryptedStr = CryptoJS.enc.Utf8.stringify(decryptedData);
    return decryptedStr
},
