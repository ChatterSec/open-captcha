const { Loader } = require('./Loader.js');
const fs = require('fs').promises;

class FileLoader extends Loader {
    constructor(manager) {
        super(manager);
    }

    async load(file = '', onLoad, onProgress, onError) {
        let url = this.getUrl(file);
        this.manager.itemStart(url);

        try {
            let data = await this.readFile(url);

            if (typeof file === 'object') {
                data = this.modifyData(data, file);
            }

            this.callBacks({ onLoad, onProgress, onError }, data);
        } catch (error) {
            onError?.(error);
        } finally {
            this.manager.itemEnd(url);
        }
    }

    getUrl(file) {
        let url = typeof file === 'object' ? `./models/${file.mtl}` : file;
        return this.manager.resolveURL(url);
    }

    async readFile(url) {
        const response = await fs.readFile(url);
        return response.toString();
    }

    modifyData(data, file) {
        const lines = data.split('\n');
        const colourLine = lines.find(line => line.startsWith('newmtl colour'));
        const colour_line_index = lines.indexOf(colourLine);

        lines[colour_line_index+2] = `Kd ${file.colour.Kd.join(' ')}`;
        lines[colour_line_index+3] = `Ka ${file.colour.Ka.join(' ')}`;
        lines[colour_line_index+4] = `Ks ${file.colour.Ks.join(' ')}`;
        lines[colour_line_index+5] = `Ke ${file.colour.Ke.join(' ')}`;

        return lines.join('\n');
    }

    callBacks(callbacks, data) {
        callbacks.onLoad?.(data);
    }
}

module.exports = { FileLoader }