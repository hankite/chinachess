$("#btnCreateRoom").on("click",()=>{
   var roomName = $("#roomName").val();
   var roomPass = $("#roomPasswd").val();
   $.post("/room/create",{name:roomName,passwd:roomPass},(res)=>{
        location.href = `/play?room=${res}`;
   });
});
$(()=>{
   var since = document.getElementsByClassName("time-since");
   for(var i=0; i<since.length; i++){
      since[i].innerHTML = timeSince(new Date(since[i].innerText));
   }
})
function timeSince(date) {

   var seconds = Math.floor((new Date() - date) / 1000);
 
   var interval = seconds / 31536000;
 
   if (interval > 1) {
     return Math.floor(interval) + " years ago";
   }
   interval = seconds / 2592000;
   if (interval > 1) {
     return Math.floor(interval) + " months ago";
   }
   interval = seconds / 86400;
   if (interval > 1) {
     return Math.floor(interval) + " days ago";
   }
   interval = seconds / 3600;
   if (interval > 1) {
     return Math.floor(interval) + " hours ago";
   }
   interval = seconds / 60;
   if (interval > 1) {
     return Math.floor(interval) + " minutes ago";
   }
   return Math.floor(seconds) + " seconds ago";
 }

 var DELI = {
  parameterURL : ( n = '', a = document.URL ) => {
		var d=a?a.split("?")[1]:window.location.search.slice(1);a={};if(d){d=d.split("#")[0];d=d.split("&");for(var f=0;f<d.length;f++){var c=d[f].split("="),b=c[0];c="undefined"===typeof c[1]?!0:c[1];"string"===typeof c;if(b.match(/\[(\d+)?\]$/)){var e=b.replace(/\[(\d+)?\]/,"");a[e]||(a[e]=[]);b.match(/\[\d+\]$/)?(b=/\[(\d+)\]/.exec(b)[1],a[e][b]=c):a[e].push(c)}else a[b]?(a[b]&&"string"===typeof a[b]&&(a[b]=[a[b]]),a[b].push(c)):a[b]=c}}
		if(n=='')
			return a;
		return a[n];
	}
 }