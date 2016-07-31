import Transformer from "./api/Transformer";

const Transform = new Transformer();
Transform.visitor = {
    Program(path, file) {
        console.log(path);
        console.log(file);
    }
}

module.exports = Transform;