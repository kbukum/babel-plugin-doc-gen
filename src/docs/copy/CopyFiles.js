const fs = require("fs-extra");
import path from "path";
import FileUtility from "../../util/FileUtility";
import Validations from "../../util/Validation";
import Utility from "../../util/Utility";

class CopyFiles {
    config;
    file;
    constructor(config){
        if (!config.root) {
            throw new Error("root configuration is undefined ! ");
        }
        if(!config.sourceFolder ) {
            throw new Error("sourceFolder undefined under 'copy' property in configuration file.");
        }
        if (!config.extensions) {
            throw new Error("extensions undefined under 'copy' property in configuration file.");
        }
        if(!config.destinationFolder) {
            throw new Error("destinationFolder undefined under 'copy' property in configuration file.");
        }

        config.sourceFolder = config.root + "/" + config.sourceFolder;
        config.destinationFolder = config.root + "/" + (config.destinationFolder ? config.destinationFolder: "");
        this.config = config;
    }

    getConfig(){
        return this.config;
    }

    copy (fileInformation, source) {
        let isOk = fileInformation.filePath.startsWith(this.config.sourceFolder) && ! (fileInformation.filePath.indexOf("index.js") !== -1);

        if (!isOk) return ;

        if (this.config.extensions.indexOf(fileInformation.extension) === -1) {
            return ;
        }

        let newFilePath = fileInformation.path.replace(this.config.sourceFolder,this.config.destinationFolder);

        fs.mkdirsSync(newFilePath);
        let fileName =  fileInformation.name + "." + (this.config.destinationExtension ? this.config.destinationExtension : fileInformation.extension);
        newFilePath = newFilePath + "/" + fileName;
        console.log(newFilePath + " created.");
        fs.outputFileSync(path.normalize(newFilePath), source);
    }
}

export default CopyFiles;