class Visitor {
    Program = (path, file) => {
        console.log(path);
        console.log(file);
    }

    BinaryExpression = () => {

    }

    FunctionDeclaration = () => {

    }
    Identifier = () => {
        console.log("Called!");
    }
}

export default new Visitor();