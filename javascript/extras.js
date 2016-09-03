$(function() {
	var youtubeEmbedHtml = '<div style="display: none; width:560px" class="video wrapper c"><iframe width="560" height="315" src="https://www.youtube.com/embed/{vid}?autoplay=1&start={start}" frameborder="0" allowfullscreen></iframe></div>';
	var vimeoEmbedHtml = '<div style="display: none;" class="video wrapper c"><object width="512" height="294"><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="https://vimeo.com/moogaloop.swf?clip_id={vid}&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=1&amp;fullscreen=1&amp;autoplay=1" /><embed src="https://vimeo.com/moogaloop.swf?clip_id={vid}&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;fullscreen=1&amp;autoplay=1" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="512" height="294"></embed></object></div>';
	var vidmeEmbedHtml = '<div style="display: none; width: 640px" class="video wrapper c"><iframe src="https://vid.me/e/{vid}?autoplay=1" width="640" height="360" frameborder="0" allowfullscreen webkitallowfullscreen mozallowfullscreen scrolling="no"></iframe></div>';
	
	function transformVideoLink(vid, start, html) {
		var $this = $(this);
		var $play = $("<a href='#'>[play]</a>");
		
		var $video = $(html.replace(/\{vid\}/g, vid).replace(/\{start\}/g, start));
		var active = false;
		
		$play.click(function(e) {
			e.preventDefault();
			if(active) return;
			active = true;
			
			if($video.is(':visible')) {
				$play.text('[play]');
				$video.slideUp(function() {
					$video.remove();
					active = false;
				});
			}else{
				$play.text('[close]');
				$this.parent().after($video);
				$video.slideDown(function() {
					active = false;
				});
			}
		});
		
		$this.after($play);
		$this.after(" ");
	}
	
	// This can probably do a lot more effecient...
	function getTimeFromYTUrl(elem) {
		var parts = elem.search.substring(1).split('&');
		var time = null;
		for(var i = 0; i < parts.length; i++) {
			var pair = parts[i].split('=');
			if(pair[0] == "t") {
				time = decodeURIComponent(pair[1]);
				break;
			}
		}
		
		if(time == null) {
			var match = /^#t=([0-9ms]+)/.exec(elem.hash);
			if(match) time = match[1];
		}
		
		if(time == null) return 0;
		if(time.match(/^\d*$/)) return time;
		var regexp = /([0-9]+|[a-z]+)/g;
		var match = regexp.exec(time);
		var actual = 0;
		var carry = null;
		
		var weights = {
			'd': 86400,
			'h': 3600,
			'm': 60,
			's': 1
		};
		
		while(match != null) {
			if(!isNaN(match[0])) {
				carry = match[0];
			}else if(carry !== null) {
				var weight = weights[match[0]];
				if(weight) {
					actual += carry * weight;
					carry = null;
				}
			}
			
			match = regexp.exec(time);
		}
		
		return actual;
	}
	
	$("div.body a").each(function() {
		var $this = $(this);
		if(this.hostname.match(/(www\.)?youtube(-nocookie)?.com/)) {
			if(this.pathname.match(/^\/watch/)) {
				var parts = this.search.substring(1).split('&');
				var vid = null;
				for(var i = 0; i < parts.length; i++) {
					var pair = parts[i].split('=');
					if(pair[0] == "v") {
						transformVideoLink.call(this, decodeURIComponent(pair[1]), getTimeFromYTUrl(this), youtubeEmbedHtml);
						break;
					}
				}
			}
		}else if(this.hostname.match(/(www\.)?youtu.be/)) {
			var match = /^\/([^\/?#]+)/.exec(this.pathname);
			if(match) {
				transformVideoLink.call(this, match[1], getTimeFromYTUrl(this), youtubeEmbedHtml);
			}
		}else if(this.hostname.match(/(www\.)?vimeo.com/)) {
			var match = /^\/([0-9]+)/.exec(this.pathname);
			if(match) {
				transformVideoLink.call(this, match[1], 0, vimeoEmbedHtml);
			}
		}else if(this.hostname.match(/(www\.)?vid.me/)) {
			var match = /^\/([a-zA-Z0-9]+)/.exec(this.pathname);
			if(match) {
				transformVideoLink.call(this, match[1], 0, vidmeEmbedHtml);
			}
		}
	});
});

var shortcut={'all_shortcuts':{},'add':function(shortcut_combination,callback,opt){var default_options={'type':'keydown','propagate':false,'disable_in_input':false,'target':document,'keycode':false}
if(!opt)opt=default_options;else{for(var dfo in default_options){if(typeof opt[dfo]=='undefined')opt[dfo]=default_options[dfo];}}
var ele=opt.target;if(typeof opt.target=='string')ele=document.getElementById(opt.target);var ths=this;shortcut_combination=shortcut_combination.toLowerCase();var func=function(e){e=e||window.event;if(opt['disable_in_input']){var element;if(e.target)element=e.target;else if(e.srcElement)element=e.srcElement;if(element.nodeType==3)element=element.parentNode;if(element.tagName=='INPUT'||element.tagName=='TEXTAREA')return;}
if(e.keyCode)code=e.keyCode;else if(e.which)code=e.which;var character=String.fromCharCode(code).toLowerCase();if(code==188)character=",";if(code==190)character=".";var keys=shortcut_combination.split("+");var kp=0;var shift_nums={"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":"\"",",":"<",".":">","/":"?","\\":"|"}
var special_keys={'esc':27,'escape':27,'tab':9,'space':32,'return':13,'enter':13,'backspace':8,'scrolllock':145,'scroll_lock':145,'scroll':145,'capslock':20,'caps_lock':20,'caps':20,'numlock':144,'num_lock':144,'num':144,'pause':19,'break':19,'insert':45,'home':36,'delete':46,'end':35,'pageup':33,'page_up':33,'pu':33,'pagedown':34,'page_down':34,'pd':34,'left':37,'up':38,'right':39,'down':40,'f1':112,'f2':113,'f3':114,'f4':115,'f5':116,'f6':117,'f7':118,'f8':119,'f9':120,'f10':121,'f11':122,'f12':123}
var modifiers={shift:{wanted:false,pressed:false},ctrl:{wanted:false,pressed:false},alt:{wanted:false,pressed:false},meta:{wanted:false,pressed:false}};if(e.ctrlKey)modifiers.ctrl.pressed=true;if(e.shiftKey)modifiers.shift.pressed=true;if(e.altKey)modifiers.alt.pressed=true;if(e.metaKey)modifiers.meta.pressed=true;for(var i=0;k=keys[i],i<keys.length;i++){if(k=='ctrl'||k=='control'){kp++;modifiers.ctrl.wanted=true;}else if(k=='shift'){kp++;modifiers.shift.wanted=true;}else if(k=='alt'){kp++;modifiers.alt.wanted=true;}else if(k=='meta'){kp++;modifiers.meta.wanted=true;}else if(k.length>1){if(special_keys[k]==code)kp++;}else if(opt['keycode']){if(opt['keycode']==code)kp++;}else{if(character==k)kp++;else{if(shift_nums[character]&&e.shiftKey){character=shift_nums[character];if(character==k)kp++;}}}}
if(kp==keys.length&&modifiers.ctrl.pressed==modifiers.ctrl.wanted&&modifiers.shift.pressed==modifiers.shift.wanted&&modifiers.alt.pressed==modifiers.alt.wanted&&modifiers.meta.pressed==modifiers.meta.wanted){callback(e);if(!opt['propagate']){e.cancelBubble=true;e.returnValue=false;if(e.stopPropagation){e.stopPropagation();e.preventDefault();}
return false;}}}
this.all_shortcuts[shortcut_combination]={'callback':func,'target':ele,'event':opt['type']};if(ele.addEventListener)ele.addEventListener(opt['type'],func,false);else if(ele.attachEvent)ele.attachEvent('on'+opt['type'],func);else ele['on'+opt['type']]=func;},'remove':function(shortcut_combination){shortcut_combination=shortcut_combination.toLowerCase();var binding=this.all_shortcuts[shortcut_combination];delete(this.all_shortcuts[shortcut_combination])
if(!binding)return;var type=binding['event'];var ele=binding['target'];var callback=binding['callback'];if(ele.detachEvent)ele.detachEvent('on'+type,callback);else if(ele.removeEventListener)ele.removeEventListener(type,callback,false);else ele['on'+type]=false;}}

$(function() {
	shortcut.add("Ctrl+B", function() {
		window.location = "/bumps";
	});
});

$(function() {
	$(".markup_editor").each(createMarkupEditor);
});

function createMarkupEditor() {
	var $this = $(this);
	
	var $bar = $("<span />");
	$this.before($bar);
	
	function createButton(html, cb) {
		var $elem = $("<h3 />");
		$elem.css('display', 'inline-block');
		$elem.css('cursor', 'pointer');
		$elem.css('margin-right', '3px');
		$elem.html(html);
		$elem.click(function(e) {
			e.preventDefault();
			e.stopPropagation();
			cb();
			return false;
		});
		$bar.append($elem);
	}
	
	function createBB(html, tag) {
		createButton('['+html+']', function() {
			wrapText($this, '['+tag+']', '[/'+tag+']');
		});
	}

	function createShortcut(shortcutSpec, tag) {
		shortcut.add(shortcutSpec, function() {
			wrapText($this, '['+tag+']', '[/'+tag+']');
		}, {
			target: $this[0]
		});
	}
	
	createBB('<strong>b</strong>', 'b');
	createBB('<em>i</em>', 'i');
	createBB('<u>u</u>', 'u');
	createBB('<s>s</s>', 's');
	createBB('spoiler', 'sp');
	createBB('border', 'border');
	createButton('[code]', function() {
		wrapText($this, '[code]\n', '\n[/code]');
	});
	createButton('[url]', function() {
		var url = prompt("What URL do you want to use?");
		var start = '', end = '';
		if(url) {
			start = '[url='+url+']';
			end = '[/url]';
		}
		wrapText($this, start, end);
	});

	createShortcut("Ctrl+B", "b");
	createShortcut("Ctrl+I", "i");
	createShortcut("Ctrl+U", "u");
    createShortcut("Ctrl+S", "s");
}

function wrapText(elem, openTag, closeTag) {
	var textArea = $(elem);

	var len = textArea.val().length;
	var start = textArea[0].selectionStart;
	var end = textArea[0].selectionEnd;
	var selectedText = textArea.val().substring(start, end);
	var replacement = openTag + selectedText + closeTag;

	var event = document.createEvent('TextEvent');
	if(typeof event.initTextEvent == 'function') {
		event.initTextEvent('textInput', true, true, null, replacement);
		textArea.get(0).dispatchEvent(event);
	}else{
		textArea.val(textArea.val().substring(0, start) + replacement + textArea.val().substring(end, len));
	}

	setSelectionRange(textArea[0], end+openTag.length, end+openTag.length);
}

function setSelectionRange(input, selectionStart, selectionEnd) {
	if (input.setSelectionRange) {
		input.focus();
		input.setSelectionRange(selectionStart, selectionEnd);
	} else if (input.createTextRange) {
		var range = input.createTextRange();
		range.collapse(true);
		range.moveEnd('character', selectionEnd);
		range.moveStart('character', selectionStart);
		range.select();
	}
}