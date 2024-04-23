# Benchmarking

To benchmark yourself run the script `npm run benchmark`, please consider sharing your benchmark results by making a [PR](https://github.com/ChatterSec/open-captcha/pulls) to the [BENCHMARK.md](BENCHMARK.md).

version | os | cpu | gpu | runs | avg generation duration
--- | --- | --- | --- | --- | ---
0.1.x-serverRendering | `Linux Lab 5.15.0-94-generic #104-Ubuntu SMP Tue Jan 9 15:25:40 UTC 2024 x86_64 x86_64 x86_64 GNU/Linux` | `11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz` | `TigerLake-LP GT2 [Iris Xe Graphics]` | 500 | 471.93 /ms
0.1.x-serverRendering | `Windows 10 Home 22H2` | `AMD Ryzen 7 3700X 8-Core Processor 3.60 GHz` | `NVIDIA GeForce RTX 3060 TI` | 500 | 721.47 / ms