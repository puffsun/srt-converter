var fs = require('fs');
var path = require('path');
var srt2vtt = require('srt-to-vtt');
var parseArgs = require('minimist');
var glob = require('glob');
var _ = require('lodash');

var argv = parseArgs(process.argv.slice(2));
var sourceFolder = argv['s'] || argv['source-folder'] || '.';
var targetFolder = argv['t'] || argv['target-folder'];
var files = argv['_'];

function convertSrtFile(src) {
    var filename = path.basename(src, path.extname(src)) + '.vtt';
    targetFolder = targetFolder || path.dirname(src);
    var target = path.join(targetFolder, filename);
    fs.createReadStream(src)
        .pipe(srt2vtt())
        .pipe(fs.createWriteStream(target))
    console.info('convert file %s to %s succeed.', src, target);
}

glob('**/*.srt', {
    cwd: sourceFolder,
    absolute: true
}, function(err, files) {
    files.forEach(function(file) {
        convertSrtFile(file);
    });
});
