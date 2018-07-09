// require('harmonize')();

// Metalsmith
var metalsmith = require('metalsmith');

// Metalsmith Plugins
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var permalinks = require('metalsmith-permalinks');
var sass = require('metalsmith-sass');
var serve = require('metalsmith-serve');
var watch = require('metalsmith-watch');

var siteBuild = metalsmith(__dirname)
  .metadata({
    site: {
      title: 'Lokesh Dhakar',
      url: 'https://lokeshdhakar.com'
    }
  })

  .source('./src')
  .destination('./dist')

  .clean(true) // Clean destination dir on build
  .use(sass({
    outputDir: 'css/',
    outputStyle: 'expanded'
  }))

  // .use(drafts()) // Only files that are NOT drafts.

  .use(markdown())
  .use(permalinks(':title'))
  .use(layouts({
    directory: 'src/layouts'
  }))
  .use(serve())
  .use(
    watch({
      paths: {
        '${source}/**/*': true,
        // When a SASS or JS file is edited, force a complete rebuild. I was not able to get
        // metalsmith-watch to rebuild just the CSS on a SASS edit or just the JS.
        '${source}/css/**/*': '**/*',
        '${source}/js/**/*': '**/*',
        '${source}/layouts/**/*': '**/*'
      },
      livereload: true
  }))
  .build(function (err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('Site build complete!');
    }
  });
