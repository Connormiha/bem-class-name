import block from '../../src/bem-class-name.js';

block('input');
block('input')({foo: '1'});
block('input')('element');
block('input')({foo: '1'});
block('input')({foo: '1'}, {bar: true});
block('input')();
block('input')(null);
block('input')('', null, null);
block('input')(null, {foo: true, foo2: false});
block('input')('', null, {foo: true, foo1: false});

block.setSettings({modifierDelimiter: '___'});
block.setSettings({});
