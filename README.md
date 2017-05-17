#  convert srt subtitles to webvtt

转换 srt 格式的字母为 webvtt 格式。默认递归读取当前目录下所有的 srt 文件并转换，可以用 `-s` 或者 `--source-folder` 指定读取的字母文件目录。

默认情况下将文件保存到源文件同一目录下，可以使用 `-t` 或者 `--target-folder` 指定目标目录。

**请先安装 node，再使用此脚本。**

## Usage

```bash
node index.js -s /path/to/folder
```
or
```bash
node index.js --source-folder /path/to/folder
```
