> [!CAUTION]
> This is a proof of concept and has not been tested against image recognition yet, to keep your system secure use an already proven secure captcha. However if you have the skills or resources to run image recognition on some samples please see [`examples/`](/examples/) for some sample outputs.

# open-captcha
open-captcha stands out from other captcha providers in a big way. Forget about connecting to external services or making your users work for free to train AI. Our approach ensures that each challenge is unique and employs the most advanced anti-ai detection methods, all while being completly self-hosted and intergrated into your web-app.

![](./assets//example.jpg)

## Benchmarking

To benchmark yourself run the script `npm run benchmark`, please consider sharing your benchmark results by making a [PR](https://github.com/ChatterSec/open-captcha/pulls) to the [BENCHMARK.md](BENCHMARK.md).

version | os | cpu | gpu | runs | avg generation duration
--- | --- | --- | --- | --- | ---
0.1.x-serverRendering | `Linux Lab 5.15.0-94-generic #104-Ubuntu SMP Tue Jan 9 15:25:40 UTC 2024 x86_64 x86_64 x86_64 GNU/Linux` | `11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz` | `TigerLake-LP GT2 [Iris Xe Graphics]` | 500 | 350.41 /ms
0.1.x-serverRendering | `Windows 10 Home 22H2` | `AMD Ryzen 7 3700X 8-Core Processor 3.60 GHz` | `NVIDIA GeForce RTX 3060 TI` | 500 | 714.55 / ms

## Setup Guide & Installation Steps

Unfortunately, setting up open-captcha isn't straightforward for everyone. However, in some cases, all you need to do is run the `npm install` command. Because open-captcha relies on headless image generation, which is not natively supported in Node.js, there are a few build requirements to consider.

First, ensure that you have the required dependencies listed below. Then, it's a matter of some trial and error from there. Make sure you have `python3` aliased as `python`, as some tasks may require specific permissions. You can either run them as root or configure your permissions accordingly.

```
npm i open-captcha@latest
```

## System dependencies
In most cases setting up `open-captcha` from npm should just work. However, since open-captcha uses image rendering you may run into problems and you might need to adjust your system configuration and make sure all your dependencies are up to date.  For general information on building native modules, see the [`node-gyp`](https://github.com/nodejs/node-gyp) documentation.

### Ubuntu / Debian
- [Python 3.x](https://www.python.org/)
- A GNU C++ environment (available via the `build-essential` package on `apt`)
- [libxi-dev](http://www.x.org/wiki/)
- Working and up to date OpenGL drivers
- [GLEW](http://glew.sourceforge.net/)
- [pkg-config](https://www.freedesktop.org/wiki/Software/pkg-config/)

```
sudo apt-get install -y build-essential libxi-dev libglu1-mesa-dev libglew-dev pkg-config python3 python-is-python3
```
```
sudo yum install -y gcc-c++ libXi-devel mesa-libGL-devel glew-devel pkgconfig python3
```

### Windows

- [Python 3.x](https://www.python.org/)
- [Microsoft Visual Studio](https://www.microsoft.com/en-us/download/details.aspx?id=5555)
- [d3dcompiler_47.dll](https://www.dll-files.com/d3dcompiler_47.dll.html) should be in c:\windows\system32, but if isn't then you can find another copy in the `deps/` dir

### Mac OS X

- [Python 3.x](https://www.python.org/)
- [XCode](https://developer.apple.com/xcode/)
