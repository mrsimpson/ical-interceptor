const mockResponse = () => {
    let res = {}

    res.status = (code) => { 
        res.code = code
        return Object.assign(res, this)
    }

    res.set = (obj) => {
        res = Object.assign(res, {headers: obj})
        return Object.assign(res, this)
    }

    res.send = (value) => {
        res.body = value
        return Object.assign(res, this)
    }
    
    return res
};

const cb = function(err, functionResult){
    fnContext = this
    const res = mockResponse()

    if (err) {
        console.error(err);

        return res.status(500).send(err.toString ? err.toString() : err);
    }

    if (typeof functionResult === "object") {
        return res.set(fnContext.headers()).status(fnContext.status()).send(JSON.stringify(functionResult));
    } else {
        return res.set(fnContext.headers()).status(fnContext.status()).send(functionResult);
    }
};

class FunctionContext {
    constructor(cb) {
        this.value = 200;
        this.cb = cb.bind(this);
        this.headerValues = {};
        this.cbCalled = 0;
    }

    status(value) {
        if (!value) {
            return this.value;
        }

        this.value = value;
        return this;
    }

    headers(value) {
        if (!value) {
            return this.headerValues;
        }

        this.headerValues = value;
        return this;
    }

    succeed(value) {
        let err;
        this.cbCalled++;
        return this.cb(err, value);
    }

    fail(value) {
        let message;
        this.cbCalled++;
        this.cb(value, message);
    }
}

function createMockContext() {
    return new FunctionContext(cb)
}

module.exports = createMockContext