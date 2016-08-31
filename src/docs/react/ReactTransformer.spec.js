import path from "path";
import ReactTransformer from "./ReactTransformer";
import FileUtility from "../../util/FileUtility";
import chai from "chai";

/** @test {docs/react/ReactTransformer} **/

describe("docs/react/ReactTransformer.js", () => {
    /** @test {docs/react/ReactTransformer#constructor} **/
    it("constructors", () => {
        let root =  path.resolve(".") + "/test";
        let options = {
            root: root ,
            sourceFolder : "components/",
            destinationFolder: "docs/",
            extensions: []
        }
        let reactTransformer = new ReactTransformer(options);
        let expectedSourceFolder =  root + "/components/";
        chai.assert.equal(expectedSourceFolder, reactTransformer.getConfig().sourceFolder);
        let expectedDestinationFolder = root + "/docs/";
        chai.assert.equal(expectedDestinationFolder, reactTransformer.getConfig().destinationFolder);
    });
    /** @test {docs/react/ReactTransformer#constructor} **/
    it("transform", () => {
        let root =  path.resolve(".") + "/test";
        let options = {
            root: root,
            sourceFolder : "components/",
            destinationFolder: "docs/",
            extensions: ["js"]
        }
        let reactTransformer = new ReactTransformer(options);

        let filePath = reactTransformer.getConfig().sourceFolder + "docs/react/ReactTransformer.js";
        let filePathText = reactTransformer.getConfig().sourceFolder + "docs/react/ReactTransformerTest.js";
        let fileInformation = FileUtility.getInformation(filePath);
        // let fileContent = FileUtility.toString(filePathText);
        // reactTransformer.transform(fileInformation, fileContent);
    });


});