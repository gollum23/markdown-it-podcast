'use strict'

const EMBED_REGEX = /@S\[([a-zA-Z].+)\]\([\s]*(.*?)[\s]*[\)]/im

function podcast_embed(md, options) {
  function podcast_return(state, silent) {
    var token
    var serviceEnd
    var serviceStart
    var oldPos = state.pos

    if (state.src.charCodeAt(oldPos) !== 0x40/* @ */ ||
      state.src.charCodeAt(oldPos + 1) !== 0x53/* S */) {
      return false;
    }

    var match = EMBED_REGEX.exec(state.src)

    if (!match || match.length < 3) {
      return false;
    }

    serviceStart = oldPos + 3;
    serviceEnd = md.helpers.parseLinkLabel(state, oldPos + 1, false)

    if (!silent) {
      state.pos = serviceStart
      state.posMax = serviceEnd
      state.service = state.src.slice(serviceStart, serviceEnd)
      var newState = new state.md.inline.State('soundcloud', state.md, state.env, [])
      newState.md.inline.tokenize(newState)

      token = state.push('podcast', '')
      token.podcastUrl = match[2]
      token.service = 'soundcloud'
      token.level = state.level
    }

    state.pos = state.pos + state.src.indexOf(')', state.pos)
    state.posMax = state.tokens.length;

    return true
  }

  return podcast_return
}


function tokenize_podcast(md, options) {
  function tolenize_podcast_return(token, idx) {
    var podcastUrl = md.utils.escapeHtml(token[idx].podcastUrl)
    options.url = podcastUrl
    return podcastUrl === '' ? '' :
      '<div><iframe width="100%" height="' + options.height + '" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=' + options.url + '&amp;auto_play=' + options.auto_play + '&amp;hide_related=' + options.hide_related + '&amp;show_comments=' + options.show_comments + '&amp;show_user=' + options.show_user + '&amp;show_reposts=' + options.show_reposts + '&amp;visual=' + options.visual + '"></iframe></div>'
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
  if (typeof options === 'object') {
    options = Object.assign({}, defaults, options)
  }
  else {
    options = defaults
  }

  md.renderer.rules.podcast = tokenize_podcast(md, options)
  md.inline.ruler.before('emphasis', 'audio', podcast_embed(md, options))
}
