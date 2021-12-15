[![Build Status](https://travis-ci.org/Connormiha/bem-gen.svg?branch=master)](https://travis-ci.org/Connormiha/bem-gen)

### Example (with BEM generator)
```jsx
import style from './form-payment.styl';
import block from 'bem-gen';

const b = block('form-payment');

export default () => {
    return (
        // form-payment
        <div className={b()}>
            // form-payment__title
            <h1 className={b('title')}>Title</h1>
            // form-payment__label
            <label className={b('label')}>
                Simple label
            </label>
            // form-payment__label form-payment__label--error
            <label className={b('label', {error: true})}>
                Label Error
            </label>
        </div>
    );
}
```

#API
```js
import block from 'bem-css-modules';

const b = block('input');// Base name

b(); // 'input'
b('field'); // 'input__field'
b('field', {type: 'text'}); // 'input__field input__field--type--text'
b('field', {disabled: true}); // 'input__field input__field--disabled'
b('icon', null, {active: true, removed: false); // 'input__icon is-active'
b('icon', {active: true, removed: false); // 'input__icon is-active'
```

### Flow and Typescript

Flow and Typescript definitions already included.

### Options
Type: `Object`  

##### elementDelimiter
Type: `String`  
Default: `__`  

##### modifierDelimiter
Type: `String`  
Default: `--`  

#### Set settings

```js
const block = require('bem-css-modules');
block.setSettings({
    modifierDelimiter: '--'
});
```
