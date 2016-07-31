const fs = require("fs-extra");
import path from "path";
const ReactDocGen = require("react-docgen");
import FileUtility from "../../util/FileUtility";
import Validations from "../../util/Validation";
import Utility from "../../util/Utility";

class ReactTransformer {
    config;
    file;
    constructor(config){
        if (!config.root) {
            throw new Error("root configuration is undefined ! ");
        }
        if(!config.sourceFolder ) {
            throw new Error("sourceFolder undefined under 'react' property in configuration file.");
        }
        if (!config.extensions) {
            throw new Error("extensions undefined under 'react' property in configuration file.");
        }
        if(!config.destinationFolder) {
            throw new Error("destinationFolder undefined under 'react' property in configuration file.");
        }
        config.sourceFolder = config.root + "/" + config.sourceFolder;
        config.destinationFolder = config.root + "/" + (config.destinationFolder ? config.destinationFolder: "");
        this.config = config;
    }

    getConfig(){
        return this.config;
    }

    transform (fileInformation, source) {

        let isOk = fileInformation.filePath.startsWith(this.config.sourceFolder) && ! (fileInformation.filePath.indexOf("index.js") !== -1);

        if (!isOk) return ;

        if (this.config.extensions.indexOf(fileInformation.extension) === -1) {
            return ;
        }

        let newFilePath = fileInformation.path.replace(this.config.sourceFolder,this.config.destinationFolder);
        let destinationSrc = null;
        try {
            destinationSrc = ReactDocGen.parse(source);
        } catch (e) {
            console.log(fileInformation.filePath + " conversion error ! Detail : " + e);
            return ;
        };

        fs.mkdirsSync(newFilePath);
        newFilePath = newFilePath + "/" + fileInformation.name + ".json";
        console.log(newFilePath + " created.");
        fs.outputFileSync(path.normalize(newFilePath), JSON.stringify(destinationSrc));
    }
}

export default ReactTransformer;