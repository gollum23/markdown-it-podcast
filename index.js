'use strict'

const EMBED_REGEX = /@S\[([a-zA-Z].+)\]\([\s]*(.*?)[\s]*[\)]/im

function podcast_embed(md, options) {
  function podcast_return(state, silent) {
    let token
    let oldPos = state.pos

    if (state.src.charCodeAt(oldPos) !== 0x40/* @ */ ||
      state.src.charCodeAt(oldPos + 1) !== 0x53/* S */) {
      return false;
    }

    let match = EMBED_REGEX(state.src)

    if (!match || match.length < 3) {
      return false;
    }

    if (!silent) {
      token = state.push('podcast')
      token.podcastUrl = match[0]
    }

    return token
  }

  return podcast_return()
}


function tokenize_podcast(md, options) {
  function tolenize_podcast_return(token, idx) {
    var podcastUrl = md.utils.escapeHtml(token[idx].podcastUrl)

    return podcastID === '' ? '' :
      `<div><iframe width="100%" height="${options.height}" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=${options.url=podcastUrl}&amp;auto_play=${options.autoplay}&amp;hide_related=${options.hide_related}&amp;show_comments=${options.show_comments}&amp;show_user=${options.show_user}&amp;show_reposts=${options.show_reposts}&amp;visual=${options.visual}"></iframe></div>`
  }

  return tolenize_podcast_return
}

var defaults = {
  url: '',
  height: 450,
  auto_play: false,
  hide_related: false,
  show_comments: true,
  show_user: true,
  show_reposts: false,
  visual: true
};

module.exports = function podcast_plugin(md, options) {
  if (options) {
    Object.keys(defaults).forEach((key) => {
      if (typeof options[key] === 'undefined') {
        options[key] = defaults[key]
      }
    })
  }
  else {
    options = defaults
  }

  md.renderer.rules.podcast = tokenize_podcast(md, options)
  md.inline.ruler.before('emphasis', 'audio', podcast_embed(md, options))
}