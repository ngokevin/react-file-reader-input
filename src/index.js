// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';

type Props = {
  as?: 'binary' | 'buffer' | 'text' | 'url',
  children?: React.Node,
  onChange: Function,
  style?: Object
};

export default class FileInput extends React.Component<Props> {
  _reactFileReaderInput: any;

  constructor(props: Props) {
    // FileReader compatibility warning.
    super(props);

    const win = typeof window === 'object' ? window : {};
    if (!win.File || !win.FileReader || !win.FileList || !win.Blob) {
      console.warn(
        '[react-file-reader-input] Some file APIs detected as not supported.' +
        ' File reader functionality may not fully work.'
      );
    }
  }

  handleChange = (e: any) => {
    const files = Array.prototype.slice.call(e.target.files); // Convert into Array
    const readAs = (this.props.as || 'url').toLowerCase();

    // Build Promise List, each promise resolved by FileReader.onload.
    Promise.all(files.map(file => new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = result => {
        // Resolve both the FileReader result and its original file.
        resolve([result, file]);
      };

      // Read the file with format based on this.props.as.
      switch (readAs) {
        case 'binary': {
          (reader: any).readAsBinaryString(file);
          break;
        }
        case 'buffer': {
          reader.readAsArrayBuffer(file);
          break;
        }
        case 'text': {
          reader.readAsText(file);
          break;
        }
        case 'url': {
          reader.readAsDataURL(file);
          break;
        }
      }
    })))
    .then(zippedResults => {
      // Run the callback after all files have been read.
      this.props.onChange(e, zippedResults);
    });
  }

  triggerInput = () => {
    const input = ((ReactDOM.findDOMNode(this._reactFileReaderInput): any): HTMLInputElement);
    if (input) {
      input.click();
    }
  }

  render() {
    const { as, children, style, ...props } = this.props;

    const hiddenInputStyle = children ? {
      // If user passes in children, display children and hide input.
      position: 'absolute',
      top: '-9999px'
    } : {};

    return (
      <div className="_react-file-reader-input" onClick={this.triggerInput} style={style}>
        <input
          {...props}
          type="file"
          ref={(c) => { this._reactFileReaderInput = c; }}
          onChange={this.handleChange}
          onClick={() => { this._reactFileReaderInput.value = null; }}
          style={hiddenInputStyle}
        />
        {children}
      </div>
    );
  }
}
