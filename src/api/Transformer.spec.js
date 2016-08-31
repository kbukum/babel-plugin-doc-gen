import path from "path";
import Transformer from "./Transformer";
import FileUtility from "../util/FileUtility";
import chai from "chai";
/** @test {api/Transformer} **/

describe("api/Transformer.js", () => {
    /** @test {api/Transformer#pre} **/
    it("pre", () => {
        let transformer = new Transformer(path.resolve("test"),".doc.gen.json");

    });
});