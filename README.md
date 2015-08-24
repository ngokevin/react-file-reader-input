react-file-reader-input
=======================

React file input component for complete control over styling, abstraction
from file reading, or both!

## \<FileInput as={dataFormat} onChange={handler} {...props}/\>

- **as** (React.PropTypes.string): what format the FileReader should read the
  file as (i.e., ```buffer```, ```binary```, ```url```, ```text```). Defaults
  to ```url```.
- **onChange** (React.PropTypes.func): callback ```function(event, results)```.
  Results will be an array of arrays, the size of which depending on how many
  files were selected. Each result will be an array of two items:
    - *progressEvent*: ```result[0]``` is a
      [ProgressEvent](https://developer.mozilla.org/docs/Web/API/ProgressEvent)
      object. You can retrieve the raw results at
      ```progressEvent.target.result``` among other things.
    - *file*: ```result[1]``` is a
      [File](https://developer.mozilla.org/docs/Web/API/File) object. You can
      retrieve the file name at ```file.name``` among other things.

### Usage

```js
import React from 'react';
import FileInput from 'react-file-reader-input';


class MyComponent extends React.Component {
  handleChange = (e, results) => {
    results.forEach(result => {
      const {e, file} = result;
      this.props.dispatch(uploadFile(e.target.result));
      console.log(`Successfully uploaded ${file.name}!`);
    });
  }
  render() {
    <form>
      <label htmlFor="my-file-input">Upload a File:</label>
      <FileInput as="binary" id="my-file-input" onChange={this.handleChange}>
        <button>Select a file!</button>
      </FileInput>
    </form>
  }
}
```
