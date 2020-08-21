# unist-util-find-before

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**unist**][unist] utility to find a node before another node.

## Install

[npm][]:

```sh
npm install unist-util-find-before
```

## Use

```js
var u = require('unist-builder')
var findBefore = require('unist-util-find-before')

var tree = u('tree', [
  u('leaf', 'leaf 1'),
  u('node', [u('leaf', 'leaf 2'), u('leaf', 'leaf 3')]),
  u('leaf', 'leaf 4'),
  u('node', [u('leaf', 'leaf 5')]),
  u('leaf', 'leaf 6'),
  u('void'),
  u('leaf', 'leaf 7')
])

var empty = tree.children[5]

console.log(findBefore(tree, empty, 'node'))
```

Yields:

```js
{ type: 'node', children: [ { type: 'leaf', value: 'leaf 5' } ] }
```

## API

### `findBefore(parent, node|index[, test])`

Find the first [child][] before `index` (or `node`) in `parent`, that passes
`test`.

###### Parameters

*   `parent` ([`Node`][node]) — [Parent][] node
*   `node` ([`Node`][node]) — [Child][] of `parent`
*   `index` (`number`, optional) — [Index][] in `parent`
*   `test` (`Function`, `string`, `Object`, `Array`, optional)
    — See [`unist-util-is`][is]

###### Returns

[`Node?`][node] — [Child][] of `parent` passing `test`.

## Related

*   [`unist-util-find-after`](https://github.com/syntax-tree/unist-util-find-after)
    — Find a node after another node
*   [`unist-util-find-all-after`](https://github.com/syntax-tree/unist-util-find-all-after)
    — Find all nodes after another node
*   [`unist-util-find-all-before`](https://github.com/syntax-tree/unist-util-find-all-before)
    — Find all nodes before another node
*   [`unist-util-find-all-between`](https://github.com/mrzmmr/unist-util-find-all-between)
    — Find all nodes between two nodes
*   [`unist-util-visit`](https://github.com/syntax-tree/unist-util-visit)
    — Recursively walk over nodes
*   [`unist-util-visit-parents`](https://github.com/syntax-tree/unist-util-visit-parents)
    — Like `visit`, but with a stack of parents
*   [`unist-util-filter`](https://github.com/syntax-tree/unist-util-filter)
    — Create a new tree with all nodes that pass a test
*   [`unist-util-map`](https://github.com/syntax-tree/unist-util-map)
    — Create a new tree with all nodes mapped by a given function
*   [`unist-util-flatmap`](https://gitlab.com/staltz/unist-util-flatmap)
    — Create a new tree by mapping (to an array) by a given function
*   [`unist-util-remove`](https://github.com/syntax-tree/unist-util-remove)
    — Remove nodes from a tree that pass a test
*   [`unist-util-select`](https://github.com/syntax-tree/unist-util-select)
    — Select nodes with CSS-like selectors

## Contribute

See [`contributing.md` in `syntax-tree/.github`][contributing] for ways to get
started.
See [`support.md`][support] for ways to get help.

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/syntax-tree/unist-util-find-before.svg

[build]: https://travis-ci.org/syntax-tree/unist-util-find-before

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/unist-util-find-before.svg

[coverage]: https://codecov.io/github/syntax-tree/unist-util-find-before

[downloads-badge]: https://img.shields.io/npm/dm/unist-util-find-before.svg

[downloads]: https://www.npmjs.com/package/unist-util-find-before

[size-badge]: https://img.shields.io/bundlephobia/minzip/unist-util-find-before.svg

[size]: https://bundlephobia.com/result?p=unist-util-find-before

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[license]: license

[author]: https://wooorm.com

[unist]: https://github.com/syntax-tree/unist

[node]: https://github.com/syntax-tree/unist#node

[parent]: https://github.com/syntax-tree/unist#parent-1

[child]: https://github.com/syntax-tree/unist#child

[index]: https://github.com/syntax-tree/unist#index

[is]: https://github.com/syntax-tree/unist-util-is

[contributing]: https://github.com/syntax-tree/.github/blob/HEAD/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/HEAD/support.md

[coc]: https://github.com/syntax-tree/.github/blob/HEAD/code-of-conduct.md
