# form-data-to-object
Converts application/x-www-form-urlencoded data structure to plain JS object

```js
{
  'foo': 'bar',
  'foo2[name]': 'bar2',
  'foo3[0]': 'bar3',
  'foo3[1][name]': 'bar4'
}
// converts to
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
