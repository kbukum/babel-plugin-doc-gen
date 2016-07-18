import fs from "fs-extra";

class FileUtility {
    getInformation = (filePath: string) => {
        let nOffset = Math.max(0, Math.max(filePath.lastIndexOf('\\'), filePath.lastIndexOf('/')));
        let eOffset = filePath.lastIndexOf('.');
        if (eOffset < 0) {
            eOffset = filePath.length;
        }
        return {
            path: filePath.substring(0, nOffset),
            filePath: filePath,
            name: filePath.substring(nOffset > 0 ? nOffset + 1 : nOffset, eOffset),
            extension: filePath.substring(eOffset > 0 ? eOffset + 1 : eOffset, filePath.length)
        };
    }

    toString(file: string, callback: Function){
        if(!callback) {
            return fs.readFileSync(file);
        } else {
            fs.readFile(file, callback);
            return true;
        }
    }

}
export default new FileUtility ();