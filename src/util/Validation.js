/**
 * Provide ordering to the result set..
 */
class Validation {

    /**
     *
     * @param {any} value
     * @param {string} search
     * @param {number} position
     * @returns {boolean}
     */
    startsWith (value: any, search: string, position: number): boolean {
        if(!search || search === "") {
            return true;
        }
        if(!value){
            return false;
        }

        position = position || 0;
        if (typeof value !== "string"){
            value = value.toString();
        }
        return value.substr(position, search.length) === search;
    };
    /**
     *
     * @param {any} value
     * @param {string} search
     * @param {number} position
     * @returns {boolean}
     */
    endsWith (value: any, search: string, position: number): boolean {
        if(!search || search === "") {
            return true;
        }
        if(!value){
            return false;
        }

        if (typeof value !== "string"){
            value = value.toString();
        }

        if (typeof position !== "number" || Math.floor(position) !== position || position > subjectString.length) {
            position = value.length;
        }
        position -= search.length;

        var lastIndex = value.indexOf(search, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

export default new Validation();
