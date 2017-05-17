var fs = require('fs');
var path = require('path');
var srt2vtt = require('srt-to-vtt');
var parseArgs = require('minimist');
var _ = require('lodash');

var argv = parseArgs(process.argv.slice(2));
var sourceFolder = argv['s'] || argv['source-folder'] || '.';
var targetFolder = argv['t'] || argv['target-folder'] || '.';
var files = argv['_'];

function convertSrtFile(src) {
    var target = path.basename('src', path.extname(src)) + '.vtt';
    fs.createReadStream(src)
        .pipe(srt2vtt())
        .pipe(fs.createWriteStream(target))
    console.info('convert file %s to %s succeed.', src, target);
}

fs.readdir(sourceFolder, function(err, files) {
    if (err) {
        console.error('read folder %s with error.', sourceFolder);
        return;
    }
    files.map(function(file) {
        return path.join(sourceFolder, file);
    }).filter(function(file) {
        var stat = fs.statSync(file);
        var extname = path.extname(file);
        return stat.isFile() && extname === '.srt';
    }).forEach(function(file) {
        convertSrtFile(file);
    });
});
