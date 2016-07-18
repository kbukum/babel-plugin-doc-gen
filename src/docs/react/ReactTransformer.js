const fs = require("fs-extra");
const ReactDocGen = require("react-docgen");
import FileUtility from "../../util/FileUtility";
import Validations from "../../util/Validation";
import Utility from "../../util/Utility";

class ReactTransformer {
    config;
    file;
    hash;
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

        if (!config.hashFile) {
            config.hashFile = ".hash";
        }

        if (!Validations.startsWith(config.hashFile,"/")) {
            config.hashFile = config.destinationFolder + "/" + config.hashFile;
        }

        if (!FileUtility.isExist(config.hashFile)) {
            FileUtility.createFile(config.hashFile, "{}");
        }
        this.hash = JSON.parse(FileUtility.readFile(config.hashFile));
    }

    getConfig(){
        return this.config;
    }

    transform (fileInformation, source) {

        let isOk = fileInformation.filePath.startsWith(this.config.sourceFolder) && ! (fileInformation.filePath.indexOf("index.js") != -1);

        if (!isOk) return ;

        if (this.config.extensions.indexOf(fileInformation.extension) === -1) {
            return ;
        }
        let newHash = Utility.hash(source);
        if( this.hash[fileInformation.filePath]  && this.hash[fileInformation.filePath] === newHash ) {
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
        fs.outputFileSync(newFilePath, JSON.stringify(destinationSrc));
        this.hash[fileInformation.filePath] = newHash;
        fs.outputFileSync(this.config.hashFile, JSON.stringify(this.hash));
    }
}

export default ReactTransformer;