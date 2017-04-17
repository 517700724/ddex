
//<![CDATA[
$(document).ready(function(){

	new jPlayerPlaylist({
		jPlayer: "#jquery_jplayer_1",
		cssSelectorAncestor: "#jp_container_1"
	}, [
		{
			title:"匆匆那年",
			//artist:"王菲",
			mp3:"http://media.97ting.com/content/01/245/1245200-MP3-320K-FTD.mp3",			
			poster: "http://media.97ting.com/album/012/121812-JPG-1000X1000-ALBUM.jpg"
		},
		{
			title:"修仙缘",
			artist:"陈楚生",
			mp3:"http://media.97ting.com/content/01/201/1201770-MP3-320K-FTD.mp3",
			//oga:"http://www.jplayer.org/audio/ogg/TSP-05-Your_face.ogg",
			poster: "http://media.97ting.com/album/011/114383-JPG-1000X1000-ALBUM.jpg"
		},
		{
			title:"千古",
			artist:"花千骨",
			mp3:"http://media.97ting.com/content/01/536/1536828-MP3-320K-FTD.mp3",
			//oga:"http://www.jplayer.org/audio/ogg/Miaow-02-Hidden.ogg",
			poster: "http://media.97ting.com/album/013/132717-JPG-1000X1000-ALBUM.jpg"
		},
		{
			title:"Big Buck Bunny Trailer",
			artist:"Blender Foundation",
			m4v:"http://www.jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v",
			ogv:"http://www.jplayer.org/video/ogv/Big_Buck_Bunny_Trailer.ogv",
			webmv: "http://www.jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm",
			poster:"http://www.jplayer.org/video/poster/Big_Buck_Bunny_Trailer_480x270.png"
		},
		{
			title:"Finding Nemo Teaser",
			artist:"Pixar",
			m4v: "http://www.jplayer.org/video/m4v/Finding_Nemo_Teaser.m4v",
			ogv: "http://www.jplayer.org/video/ogv/Finding_Nemo_Teaser.ogv",
			webmv: "http://www.jplayer.org/video/webm/Finding_Nemo_Teaser.webm",
			poster: "http://www.jplayer.org/video/poster/Finding_Nemo_Teaser_640x352.png"
		},
		{
			title:"不可说",
			artist:"霍建华&赵丽颖",
			mp3:"http://media.97ting.com/content/01/499/1499900-MP3-320K-FTD.mp3",
			//oga:"http://www.jplayer.org/audio/ogg/TSP-07-Cybersonnet.ogg",
			poster: "http://media.97ting.com/album/013/131350-JPG-1000X1000-ALBUM.jpg"
		},
		{
			title:"Incredibles Teaser",
			artist:"Pixar",
			m4v: "http://www.jplayer.org/video/m4v/Incredibles_Teaser.m4v",
			ogv: "http://www.jplayer.org/video/ogv/Incredibles_Teaser.ogv",
			webmv: "http://www.jplayer.org/video/webm/Incredibles_Teaser.webm",
			poster: "http://www.jplayer.org/video/poster/Incredibles_Teaser_640x272.png"
		},
		{
			title:"夏洛特烦恼",
			//artist:"Miaow",
			mp3:"http://media.97ting.com/content/01/553/1553556-MP3-320K-FTD.mp3",
			//oga:"http://www.jplayer.org/audio/ogg/Miaow-01-Tempered-song.ogg",
			poster: "http://media.97ting.com/album/013/133659-JPG-1000X1000-ALBUM.jpg"
		},
		{
			title:"年轮",
			artist:"花千骨",
			mp3:"http://media.97ting.com/content/01/500/1500259-MP3-320K-FTD.mp3",
			//oga:"http://www.jplayer.org/audio/ogg/Miaow-03-Lentement.ogg",
			poster: "http://media.97ting.com/album/013/131418-JPG-1000X1000-ALBUM.jpg"
		}
	], {
		swfPath: "../js",
		wmode:"window",
		supplied: "webmv, ogv, m4v, oga, mp3",
		useStateClassSkin: true,
		autoBlur: false,
		smoothPlayBar: true,
		keyEnabled: true,
		audioFullScreen: true,
  size: {
   width: "400px"}
	});
	$("#jp_container_1").css("width",400);
	$("#jquery_jplayer_1").css("width",398);
	$("#jquery_jplayer_1 img").css("width",398);
});
