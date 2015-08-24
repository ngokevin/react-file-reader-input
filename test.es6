import assert from 'assert';
import React from 'react/addons';

import FileInput from './lib/index';


const test = React.addons.TestUtils;


describe('FileInput', () => {
  let div;
  beforeEach(() => {
    div = document.createElement('div');
  });
  afterEach(() => {
    React.unmountComponentAtNode(div);
  });

  it('renders', () => {
    const fileInput = test.renderIntoDocument(
      <FileInput className="input"/>, div);

    const input = test.findRenderedDOMComponentWithTag(fileInput, 'input');
    assert.ok(input);
    assert.ok(!input.props.children);
    assert.deepEqual(input.props.style, {});
    assert.equal(input.props.type, 'file');
  });

  it('can hide input with children', () => {
    const fileInput = test.renderIntoDocument(<FileInput className="input">
      <p>Input</p>
    </FileInput>, div);

    const input = test.findRenderedDOMComponentWithTag(fileInput, 'input');
    assert.ok(!input.props.children);
    assert.ok(Object.keys(input.props.style).length);
    assert.equal(input.props.type, 'file');

    const p = test.findRenderedDOMComponentWithTag(fileInput, 'p');
    assert.ok('p');
  });

  it('can hide input with children', () => {
    const fileInput = test.renderIntoDocument(<FileInput className="input">
      <p>Input</p>
    </FileInput>, div);

    const input = test.findRenderedDOMComponentWithTag(fileInput, 'input');
    assert.ok(!input.props.children);
    assert.ok(input.props.style);
    assert.equal(input.props.type, 'file');

    const p = test.findRenderedDOMComponentWithTag(fileInput, 'p');
    assert.ok('p');
  });
});
