/**
 * Provide ordering to the result set..
 */
class Utility {

    /**
     *
     * @param {string} value
     * @returns {boolean}
     */
    hash (value: string): boolean {
        let hash = 5381;
        let i    = value.length;

        while(i) {
            hash = (hash * 33) ^ value.charCodeAt(--i);
        }

        /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
         * integers. Since we want the results to be always positive, convert the
         * signed int to an unsigned by doing an unsigned bitshift. */
        return hash >>> 0;
    };
}

export default new Utility();