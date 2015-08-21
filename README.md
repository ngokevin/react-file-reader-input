react-file-reader-input
=======================

React file input component for complete control over styling and abstraction
from file reading.

## \<FileInput as={dataFormat} onChange={handler} {...props}/\>

- **as** (React.PropTypes.string): what format the FileReader should read the
  file as (i.e., ```buffer```, ```binary```, ```url```, ```text```).
- **onChange** (React.PropTypes.func): passes the event object as the first
  argument. If ```as``` is defined, then FileInput will pass the read file data
  as the second argument.

```js
import React from 'react';
import FileInput from 'react-fileinput';


class MyComponent extends React.Component {
  handleChange = (e, fileData) => {
    this.props.dispatch(uploadFile(fileData));
  }
  render() {
    <form>
      <label htmlFor="my-file-input">Upload a File:</label>
      <FileInput as="binary" id="my-file-input" onChange={this.handleChange}/>
    </form>
  }
}
```
