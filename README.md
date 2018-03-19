react-file-reader-input
=======================

React file input component for complete control over styling and abstraction
from file reading.

## \<FileReaderInput as={dataFormat} onChange={handler} {...props}/\>

- **as** (string): what format the FileReader should read the
  file as (i.e., ```buffer```, ```binary```, ```url```, ```text```). Defaults
  to ```url```.
- **children** (element): if children is passed into
  FileReaderInput, then the component will hide the native file input and
  instead display ```children```. Whenever the custom ```children``` are
  clicked, the component will trigger the native file input prompt. This
  allows complete control over styling an display.
- **onChange** (function): callback ```function(event, results)```.
  Results will be an array of arrays, the size of which depending on how many
  files were selected. Each result will be an array of two items:
    - *progressEvent*: ```result[0]``` is a
      [ProgressEvent](https://developer.mozilla.org/docs/Web/API/ProgressEvent)
      object. You can retrieve the raw results at
      ```progressEvent.target.result``` among other things.
    - *file*: ```result[1]``` is a
      [File](https://developer.mozilla.org/docs/Web/API/File) object. You can
      retrieve the file name at ```file.name``` among other things.

All other props on ```FileReaderInput``` will be passed down to the native file
input.

### Usage

```js
import React from 'react';
import FileReaderInput from 'react-file-reader-input';


class MyComponent extends React.Component {
  handleChange = (e, results) => {
    results.forEach(result => {
      const [e, file] = result;
      this.props.dispatch(uploadFile(e.target.result));
      console.log(`Successfully uploaded ${file.name}!`);
    });
  }
  render() {
    return (
      <form>
        <label htmlFor="my-file-input">Upload a File:</label>
        <FileReaderInput as="binary" id="my-file-input"
                         onChange={this.handleChange}>
          <button>Select a file!</button>
        </FileReaderInput>
      </form>
    );
  }
}
```
