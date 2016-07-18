import Visitor from "./Visitor";
import FileUtility from "../util/FileUtility";
import ReactTransformer from "../docs/react/ReactTransformer";
import CopyFiles from "../docs/copy/CopyFiles";
import Validations from "../util/Validation";
import Utility from "../util/Utility";

class Transformer {
    root;
    config;
    hash;
    reactTransformer;
    copyFiles;

    constructor(root, configFilePath){
        if (root) {
            if (!configFilePath) {
                configFilePath = ".doc.gen.json";
            }
            this.__init(root , configFilePath);
        }
    }
    __init(root, configFilePath){
        if (!this.root) {
            this.root = root;
            let configSource = FileUtility.readFile(this.root + "/" + configFilePath);
            this.config = JSON.parse(configSource);
            if (this.config.react) {
                this.config.react.root = this.root;
                this.reactTransformer = new ReactTransformer(this.config.react);
            }
            if (this.config.copy) {
                this.config.copy.root = this.root;
                this.copyFiles = new CopyFiles(this.config.copy);
            }
            if (!this.config.hashFile) {
                this.config.hashFile = ".hash";
            }

            if (!Validations.startsWith(this.config.hashFile,"/")) {
                this.config.hashFile = this.root + "/" + this.config.hashFile;
            }

            if (!FileUtility.isExist(this.config.hashFile)) {
                FileUtility.createFile(this.config.hashFile, "{}");
            }
            this.hash = JSON.parse(FileUtility.readFile(this.config.hashFile));
        }
    }
    pre = (source) => {

        if (!this.root) {
            this.__init(source.opts.sourceRoot, ".doc.gen.json");
        }
        let fileInformation = FileUtility.getInformation(source.opts.filename);

        let newHash = Utility.hash(source.code);
        if(!this.hash[fileInformation.filePath] ) {
            this.setHash(fileInformation.filePath, newHash);
        } else if(this.hash[fileInformation.filePath] === newHash ) {
            return ;
        }

        if( this.reactTransformer ) {
            this.reactTransformer.transform(fileInformation, source.code);
        }

        if(this.copyFiles) {
            this.copyFiles.copy(fileInformation, source.code);
        }
        this.setHash(fileInformation.filePath, newHash);
    }

    setHash (key, hash) {
        if (!this.hash[key] || this.hash[key] !== hash) {
            this.hash[key] = hash;
            FileUtility.writeFile(this.config.hashFile, JSON.stringify(this.hash));
        }
    }
}

export default Transformer;

