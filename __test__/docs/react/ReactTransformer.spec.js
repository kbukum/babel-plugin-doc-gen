import path from "path";
import ReactTransformer from "./../../../src/docs/react/ReactTransformer";
import FileUtility from "../../../src/util/FileUtility";
import chai from "chai";

/** @test {docs/react/ReactTransformer} **/

describe("docs/react/ReactTransformer.js", () => {
    /** @test {docs/react/ReactTransformer#constructor} **/
    it("constructors", () => {
        let root =  path.resolve(".");
        let options = {
            root: root,
            sourceFolder : "src/",
            destinationFolder: "destination/",
            extensions: []
        }
        let reactTransformer = new ReactTransformer(options);
        let expectedSourceFolder =  root + "/src/";
        chai.assert.equal(expectedSourceFolder, reactTransformer.getConfig().sourceFolder);
        let expectedDestinationFolder = root + "/destination/";
        chai.assert.equal(expectedDestinationFolder, reactTransformer.getConfig().destinationFolder);
    });
    /** @test {docs/react/ReactTransformer#constructor} **/
    it("transform", () => {
        let options = {
            root: path.resolve("."),
            sourceFolder : "src/",
            destinationFolder: "destination/",
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