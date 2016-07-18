import Visitor from "./Visitor";
import FileUtility from "../util/FileUtility";
import ReactTransformer from "../docs/react/ReactTransformer";


class Transformer {
    root;
    config;
    reactTransformer;
    pre (source) {
        if (!this.root) {
            this.root =  source.opts.sourceRoot;
            let configSource = FileUtility.toString(this.root + ".doc.gen.json");
            this.config = JSON.parse(configSource);
            if (this.config.react) {
                this.config.react.root = this.root;
                this.reactTransformer = new ReactTransformer(this.config.react);
            }
        }

        let fileInformation = FileUtility.getInformation(source.opts.filename);

        if( this.reactTransformer ) {
            this.reactTransformer.transform(fileInformation, source.code);
        }
    }
}

export default new Transformer();

