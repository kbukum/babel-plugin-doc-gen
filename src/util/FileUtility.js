import path from "path";
import fs from "fs-extra";
import gracefulfs from "graceful-fs";

class FileUtility {
    getInformation (filePath: string) {
        let nOffset = Math.max(0, Math.max(filePath.lastIndexOf("\\"), filePath.lastIndexOf("/")));
        let eOffset = filePath.lastIndexOf(".");
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

    isExist(file){
        return gracefulfs.existsSync(file);
    }
    createFile(file: string, content: string) {
        fs.ensureFileSync(file);
        this.writeFile(file, content);
    }
    writeFile(file: string, content: string) {
        if (content) {
            fs.outputFileSync(path.normalize(file), content);
        }
    }
    readFile(file: string, callback: Function){
        if(!callback) {
            return fs.readFileSync(file,"utf-8");
        } else {
            fs.readFile(path.normalize(file), callback);
            return true;
        }
    }

}
export default new FileUtility ();