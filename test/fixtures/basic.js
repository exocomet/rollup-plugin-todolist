function func() {
  // This is a one line JavaScript comment
  // TODO: This is a valid TODO tagged comment
  // This doesn't belong to the above TODO comment
  console.log('Hello world!');
  /* This is a one line JavaScript comment */
  // FIXME: This is a valid TODO tagged comment
  /* This comment spans multiple lines. Notice
    that we don't need to end the comment until we're done. */
  console.log('Hello ' + x /* BUG: insert the value of x */ + ' !');
  /* WARN: important warning */
  /* HACK: bad hack
  next line missing */
}
func();