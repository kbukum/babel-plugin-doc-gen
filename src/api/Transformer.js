import Visitor from "./Visitor";
import FileUtility from "../util/FileUtility";
import ReactTransformer from "../docs/react/ReactTransformer";


class Transformer {
    root;
    config;
    reactTransformer;
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
        }
    }
    pre = (source) => {
        if (!this.root) {
            this.__init(source.opts.sourceRoot, ".doc.gen.json");
        }

        let fileInformation = FileUtility.getInformation(source.opts.filename);

        if( this.reactTransformer ) {
            this.reactTransformer.transform(fileInformation, source.code);
        }
    }
}

export default Transformer;

