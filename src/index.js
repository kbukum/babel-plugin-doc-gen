import Transformer from "./api/Transformer";

const Transform = new Transformer();
Transform.visitor = {
    Program(path, file) {

    }
}

module.exports = Transform;