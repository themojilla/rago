# rago

A utility helper to calculate "time ago" or "from now " in a readable format using Intl API

> Warning: rago tend to use Intl API internally. It made for modern browsers, but if your wan't to keep things also working for older ones, make sure to polyfill the Intl API

## Installation

```bash
yarn add rago
```

## Usage

```javascript
import { fromNow } from 'rago';

fromNow('2019-04-21T11:34:41.773Z'); // 2 years ago
fromNow('2020-04-21T12:24:01Z', 'fa'); // سال گذشته
```
