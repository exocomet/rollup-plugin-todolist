const fs = require('fs');
const path = require('path');
const test = require('ava');
const { rollup } = require('rollup');

// eslint-disable-next-line import/no-unresolved
const {todolist} = require('..');

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Lexical_grammar#Comments


test('basic', async (t) => {
  let fixture = 'basic';

  const options = {
    input: `test/fixtures/${fixture}.js`,
    plugins: [todolist({
      logging: true,
      output: 'test/comments.log'
    })]
  };

  // const filename = path.resolve(options.input);
  // const input = fs.readFileSync(filename, 'utf-8');
  const bundle = await rollup(options);
  // t.log(JSON.stringify(bundle, null, 2));

  // let tl = todolist({})
  // let output = null;
  // output = tl.transform.call({});
  // console.log('...', output);
  t.is(0, 0);
})
