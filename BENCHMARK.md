# Benchmarking

To benchmark yourself run the script `npm run benchmark`, please consider sharing your benchmark results by making a [PR](https://github.com/ChatterSec/open-captcha/pulls) to the [BENCHMARK.md](BENCHMARK.md).

version | os | cpu | gpu | runs | avg generation time
--- | --- | --- | --- | --- | ---
0.1.x-serverRendering | `Linux 5.15.0-94-generic #104-Ubuntu 2024 x86_64 x86_64 x86_64 GNU/Linux` | `11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz` | `TigerLake-LP GT2 [Iris Xe Graphics]` | 500 | 350.41 /ms
0.1.x-serverRendering | `Windows 10 Home 22H2` | `AMD Ryzen 7 3700X 8-Core Processor 3.60 GHz` | `NVIDIA GeForce RTX 3060 TI` | 500 | 534.71 / ms
0.1.x-serverRendering | `Windows 11 Pro 22H2` | `13th Gen Intel(R) Core(TM) i5-13420H 2.10 GHz` | `Intel(R) UHD Graphics` | 500 | 703.04 / ms
