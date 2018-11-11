var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var Q = require('q');
var pug = require('pug');
var fs = require('fs');
var app = express();

var s3Bucket = require('./lib/s3bucket');
var dbEntries = require('./lib/entries.json');
var AULProjNames;

app.use(cors());
app.use(bodyParser.json({ extended: false }));
app.use(express.static(__dirname + "/public/assets"));

app.set('views', './public/views');
app.set('view engine', 'pug');

app.get('/', function(req, res){
  // var imgFiles = getFiles('./public/assets/images');
  if(!AULProjNames){
    s3Bucket.listDirectories().then((projectList) => {
      var previewIndex = projectList.indexOf('previews');
      projectList.splice(previewIndex, 1);
      AULProjNames = projectList;
    });
  }

  s3Bucket.getDirectoryFiles('previews').then((urls) => {
    var cleanUrls = urls.filter(Boolean);
    res.render('index', { AULProjNames, cleanUrls });
  });
});

app.get('/works/:project', function(req, res){
	var projectKey = req.params.project;
	var projectText = dbEntries[projectKey];
  console.log('-------- ', projectText);
	s3Bucket.getDirectoryFiles(`${projectKey}/`).then((urls) =>{
		var cleanUrls = urls.filter(Boolean);
		res.render('projects/index', { description: projectText, stocks: cleanUrls});
	});
});

app.listen(3232, () => console.log('listening on 3232 '))


function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            getFiles(name, files_);
        }else if(!files[i].startsWith('.')) {
			var cleanName = name.replace('./public/assets/', ' ')
        	files_.push(cleanName);
        }
    }
    return files_;
}
