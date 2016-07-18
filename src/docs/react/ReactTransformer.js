const fs = require("fs-extra");
const ReactDocGen = require("react-docgen");
import FileUtility from "../../util/FileUtility";

class ReactTransformer {
    config;
    constructor(config){
        this.config = config;
        if (!config.root) {
            throw new Error("root configuration is undefined ! ");
        }
        if(!config.sourceFolder ) {
            throw new Error("sourceFolder undefined under 'react' property in configuration file.");
        }
        if (!config.extensions) {
            throw new Error("extensions undefined under 'react' property in configuration file.");
        }
        config.sourceFolder = config.root + "/" + config.sourceFolder;
        config.destinationFolder = config.root + "/" + (config.destinationFolder ? config.destinationFolder: "");
    }

    getConfig(){
        return this.config;
    }
    transform (fileInformation, source) {

        let isOk = fileInformation.filePath.startsWith(this.config.sourceFolder) && ! (fileInformation.filePath.indexOf("index.js") != -1);

        if (!isOk) return ;

        if (this.config.extensions.indexOf(fileInformation.extension) == -1) {
            return ;
        }

        let newFilePath = fileInformation.path.replace(this.config.sourceFolder,this.config.destinationFolder);

        let destinationSrc = ReactDocGen.parse(source);

        fs.mkdirsSync(newFilePath);
        newFilePath = newFilePath + "/" + fileInformation.name + ".json";
        fs.outputFileSync(newFilePath, JSON.stringify(destinationSrc));

    }
}

export default ReactTransformer;