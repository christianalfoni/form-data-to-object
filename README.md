# form-data-to-object
Converts application/x-www-form-urlencoded data structure to plain JS object

```js
{
  'foo': 'bar',
  'foo[name]': 'bar2',
  'foo[0]': 'bar3',
  'foo[1][name]': 'bar4'
}
// converts to
{
  foo: 'bar',
  foo: {
    name: 'bar2'
  },
  foo: ['bar3', {
    name: 'bar4'
  }]
}
```
