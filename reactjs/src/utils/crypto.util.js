import crypto from "crypto-js";

export const md5 = (str) => {
    return crypto.MD5(str)
}
