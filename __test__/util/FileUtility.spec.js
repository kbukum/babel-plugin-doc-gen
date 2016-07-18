import FileUtility from "./../../src/util/FileUtility";
import chai from "chai";

/** @test {util/FileUtility} **/

describe("util/FileUtility.js", () => {
    /** @test {util/Validation#startsWith} **/
    it("getInformation", () => {
         let filePath = "/Users/ExampleFolder/ChildFolder";
         let expectedObject = { path: "/Users/ExampleFolder",
           filePath: "/Users/ExampleFolder/ChildFolder",
           name: "ChildFolder",
           extension: ""
         };

        let information = FileUtility.getInformation(filePath);
        chai.assert.deepEqual(expectedObject, information);

        filePath = "/Users/ExampleFolder/ChildFile.json";
        expectedObject = { path: "/Users/ExampleFolder",
            filePath: "/Users/ExampleFolder/ChildFile.json",
            name: "ChildFile",
            extension: "json"
        };

        information = FileUtility.getInformation(filePath);
        chai.assert.deepEqual(expectedObject, information);
    });
});