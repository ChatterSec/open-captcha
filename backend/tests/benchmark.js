(async () => {
    const Captcha = require('../dist/src/index');
    const { performance } = require("perf_hooks")
    const oCaptcha = new Captcha();

    const markers = [];
    const sizes = [];

    const clearLines = (n) => {
        for (let i = 0; i < n; i++) {
            const y = i === 0 ? null : -1
            process.stdout.moveCursor(0, y)
            process.stdout.clearLine(1)
        }
        process.stdout.cursorTo(0)
    }

    const start = new Date().getTime()

    for (let i = 0; i < 500; i++) {
        performance.mark("start")
        const generation = await oCaptcha.generate();
        performance.mark("end")

        markers.push(performance.measure("generate", "start", "end").duration)

        const imageSizes = generation.images.map(obj => {
            const padding = (obj.base64.match(/=/g) || []).length;
            const sizeInBytes = obj.base64.length * 3 / 4 - padding;
            const sizeInKiB = sizeInBytes / 1024;
            return sizeInKiB
        })

        sizes.push(...imageSizes)

        if (i !== 0) {
            clearLines(11)
        }

        const fastest = Math.min(...markers)
        const slowest = Math.max(...markers)
        const elapsed = new Date().getTime() - start

        process.stdout.write(`Duration (ms):      \x1b[33m${performance.measure("generate", "start", "end").duration.toFixed(5)}\x1b[0m\nImage Sizes KiB:    \x1b[33m${imageSizes.map(val => val.toFixed(2)).join('\x1b[0m,  \x1b[33m')}\x1b[0m\n\nRuns:               \x1b[33m${i+1}\x1b[0m\nElapsed:            \x1b[33m${parseInt(elapsed / 1000)}/s\x1b[0m\n\nFastest Duration:   \x1b[33m${fastest.toFixed(5)}\x1b[0m\nSlowest Duration:   \x1b[33m${slowest.toFixed(5)}\x1b[0m\nAverage Duration:   \x1b[33m${(markers.reduce((prev, current) => prev + current) / markers.length).toFixed(5)}\x1b[0m\n\nAverage Image Size: \x1b[33m${(sizes.reduce((prev, current) => prev + current) / sizes.length).toFixed(5)}\x1b[0m`)
    }
})()