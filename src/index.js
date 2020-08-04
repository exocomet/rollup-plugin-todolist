
// https://github.com/JohnPostlethwait/fixme
// https://regex101.com/

const path = require('path');
const fs = require('fs');

const regexTag = /^(\s*(TODO|FIXME|WARNING|WARN|NOTE|HACK|BUG|OPTIMIZE|XXX|TEST)\:?)(.*|\s*)$/s;

function findTag(str, regex) {
  let m = regex.exec(str);
  let output = null;
  if (m !== null) {
    output = {
      match: m,
      text: m[3].trim(),
      tag: m[2].trim()
    };
  }
  return output;
}

const colors = {
  TODO: '\u001b[38;5;11m',
  FIXME: '\u001b[38;5;166m',
  WARNING: '\u001b[31m',
  WARN: '\u001b[31m',
  NOTE: '\u001b[32m',
  HACK: '\u001b[33m',
  BUG: '\u001b[33m',
  OPTIMIZE: '\u001b[38;5;245m',
  XXX: '\u001b[31m',
  TEST: '\u001b[31m',
}

function formatCommentLoc(id, comment) {
  let output = '';
  if (comment.locs) {
    output += path.relative('./', id);
    output += ':'+comment.locs.startLine;
  }
  return output;
}

export function logComments(id, comments) {
  comments.forEach((comment) => {
    console.log(formatCommentLoc(id, comment));
    let col = colors[comment.tag] || '\u001b[38;5;245m';
    console.log(
      col + comment.tag + ':\u001b[0m',
      comment.value.trim(),
      '\n'
    );
  })
}

export function writeComments(id, comments, writeStream) {
  // TODO: implement file logging
  comments.forEach((comment) => {
    writeStream.write(formatCommentLoc(id, comment) + '\n\n');
    writeStream.write(comment.value.trim()) + '\n\n';
  });
}

function pushComment(options, array) {
  return function(block, text, start, end, startLoc, endLoc) {
    let match = findTag(text, regexTag)

    if (match && match.text.length) {

      let comment = {
        type: block ? "Block" : "Line",
        // value: match.text,
        start: start,
        end: end,
      }

      comment.value = match.text.trim();

      if (options.locations) {
        comment.locs = {
          "startLine": startLoc.line,
          "startCol": startLoc.column,
          "endLine": endLoc.line,
          "endCol": endLoc.column,
        }
      }

      comment.tag = match.tag;
      array.push(comment);
    }
  }
}

const defaults = {
  output: null,
  logging: true,
}

export function todolist(opts = {}) {
  const options = Object.assign({}, defaults, opts);

  const output = options.output || null;
  const logging = options.logging || true;


  let writeStream = null;
  if (output) {
    writeStream = fs.createWriteStream(options.output, {flags: 'w'});
    writeStream.on('close', function() {
      console.log('closed')
    })
  }


  return {
    name: 'todolist',
    transform(code, id) {
      let comments = []
      let ast = this.parse(code, {
        locations: true,
        onComment: pushComment({
          locations: true
        }, comments)
      });

      if (!ast) {
        return null;
      }
      if (comments.length) {
        if (output) {
          writeComments(id, comments, writeStream);
        }
        if (logging) {
          console.log('\n'+id);
          console.group();
          logComments(id, comments);
          console.groupEnd();
        }
      }
      if (writeStream) {
        // writeStream.close()
      }
      return null
    }
  };
}

export default todolist;