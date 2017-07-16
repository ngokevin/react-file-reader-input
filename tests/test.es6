import React from 'react';
import ReactDOM from 'react-dom'
import assert from 'assert';
import FileInput from '../lib/index';

describe('FileInput', () => {
  let div;

  beforeEach(() => {
    div = document.createElement('div');
  });

  afterEach(() => {
    while (div.firstChild) { div.removeChild(div.firstChild); }
  });

  it('renders', () => {
    assert.ok(!div.querySelector('input'));
    ReactDOM.render(<FileInput className="input"/>, div);
    let input = div.querySelector('input');
    assert.ok(div.querySelector('input'));
    assert.equal(input.children.length, 0);
    assert.equal(input.getAttribute('type'), 'file');
  });

  it('can hide input with children', () => {
    const fileInput = ReactDOM.render(
      <FileInput className="input">
        <p>Input</p>
      </FileInput>,
    div);

    const input = div.querySelector('input');
    assert.equal(input.children.length, 0);
    assert.equal(input.getAttribute('type'), 'file');

    assert.ok(div.querySelector('p'));
  });
});
