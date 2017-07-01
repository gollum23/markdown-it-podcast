# markdown-it-podcast

> Markdown-it plugin for embedding podcast

## Usage


#### Enable plugin

```js
const md = require('markdown-it')({
    html: true,
    linkify: true,
    typography: true
}).use(require('markdown-it-podcast', { // <-- this use(package_name) is required
  url: '',
  height: 450,
  auto_play: false,
  hide_related: false,
  show_comments: true,
  show_user: true,
  show_reposts: false,
  visual: true
}));
```

_**This is a first version and only support SoundCloud**_

#### SoundCloud

This only works in the inline style.

```md
@S[soundcloud](https://soundcloud.com/platziteam/la-historia-de-platzi)
```

is interpreted as

```html
<p>
  <div>
    <iframe width="100%" height="450" scrolling="no" frameborder="no" 
  src="https://w.soundcloud.com/player/?url=https://soundcloud.com/platziteam/la-historia-de-platzi&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>
  </div>
</p>
```

### TODO
* Add other podcast services
