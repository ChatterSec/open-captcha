const Loader = require('./Loader.js');
const fs = require('fs').promises;

const loading = {};

module.exports = class FileLoader extends Loader {
    constructor(manager) {
        super(manager);
    }

    load(url = '', onLoad, onProgress, onError) {
        url = this.manager.resolveURL(url);

        if (loading[url]) {
            loading[url].push({ onLoad, onProgress, onError });
            return;
        }

        loading[url] = [{ onLoad, onProgress, onError }];

        fs.readFile(url)
            .then(response => response.toString())
            .then(data => {
                const callbacks = loading[url];
                delete loading[url];

                callbacks.forEach(callback => callback.onLoad?.(data));
            })
            .catch(err => {
                const callbacks = loading[url];
                delete loading[url];

                if (!callbacks) {
                    this.manager.itemError(url);
                    throw err;
                }

                callbacks.forEach(callback => callback.onError?.(err));
                this.manager.itemError(url);
            })
            .finally(() => {
                this.manager.itemEnd(url);
            });

        this.manager.itemStart(url);
    }

    setResponseType(value) {
        this.responseType = value;
        return this;
    }

    setMimeType(value) {
        this.mimeType = value;
        return this;
    }
}