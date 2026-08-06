# form-data-to-object
Converts application/x-www-form-urlencoded data structure to plain JS object

## API
- `formData.toObj()` - Converts keys in x-www-form-urlencoded format on an object to a normal object
- `formData.fromObj()` - Converts a normal object to object with keys in x-www-form-urlencoded format
```js

// keys in x-www-form-urlencoded format
{
  'foo': 'bar',
  'foo2[name]': 'bar2',
  'foo3[0]': 'bar3',
  'foo3[1][name]': 'bar4'
}

// converts from/to

// normal object
{
  foo: 'bar',
  foo2: {
    name: 'bar2'
  },
  foo3: ['bar3', {
    name: 'bar4'
  }]
}
```

## Prototype safety
`toObj` is safe to call on untrusted input. Keys containing a `__proto__`,
`constructor` or `prototype` segment are dropped rather than written, so form
data can never reach `Object.prototype`. Other keys in the same input are
converted as usual.

```js
formData.toObj({'__proto__[polluted]': 'yes', 'foo': 'bar'}); // {foo: 'bar'}
```

Versions up to and including 0.2.0 are vulnerable to prototype pollution
through such keys (CWE-1321) and should not be used to parse untrusted data.
