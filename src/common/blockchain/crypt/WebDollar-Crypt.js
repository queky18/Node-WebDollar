const CryptoJS = (require ('cryptojs')).Crypto;

import Argon2 from 'common/crypto/Argon2/Argon2'


class WebDollarCrypt {

    static encodeBase64(bytes) {

        let result = CryptoJS.util.bytesToBase64(bytes);

        let resultFinal = "";

        for (let i = 0; i < result.length; i++) {

            switch (result[i]){
                case 'O':
                    resultFinal +=  '&';
                    break;
                case '0':
                    resultFinal +=  '*';
                    break;
                case 'I':
                    resultFinal +=  '%';
                    break;
                case 'l':
                    resultFinal +=  '@';
                    break;
                case '+':
                    resultFinal +=  '#';
                    break;
                case '/':
                    resultFinal +=  '$';
                    break;
                default:
                    resultFinal += result[i];
                    break;
            }
        }

        return resultFinal;
    }


    static getByteRandomValues(count){

        if (typeof count === 'undefined') count = 32;

        let randArr = new Uint8Array(count) //create a typed array of 32 bytes (256 bits)

        if (typeof window !== 'undefined' && typeof window.crypto !=='undefined') window.crypto.getRandomValues(randArr) //populate array with cryptographically secure random numbers
        else {
            const getRandomValues = require('get-random-values');
            getRandomValues(randArr);
        }

        //some Bitcoin and Crypto methods don't like Uint8Array for input. They expect regular JS arrays.
        let dataBytes = []
        for (let i = 0; i < randArr.length; ++i)
            dataBytes[i] = randArr[i]

        return dataBytes;
    }


    static isHex(h) {
        let a = parseInt(h,16);
        return (a.toString(16) ===h.toLowerCase())
    }

    /**
     * Hashing using Argon2
     * @param data
     * @param buffer
     * @returns {Promise.<Buffer>}
     */
    static async hashPOW(data, salt, returnBuffer){

        try{

            return hash;

        } catch (Exception){
            throw 'Argon2 is not supported. ' + Exception.toString()
        }

    }

    /**
     * Hashing using Argon2
     * @param data
     * @returns {Promise.<String>}
     */
    static async hashPOWString(data, salt){

        return WebDollarCrypt.hashPOW(data, salt, false)

    }

    static async verifyHashPOW(hash, data){

        try{

            return await Argon2.verify(hash, data);

        } catch (Exception){

            throw 'Argon2 is not supported. '+Exception.toString()

        }

    }

}

export default WebDollarCrypt;