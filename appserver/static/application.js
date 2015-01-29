/**
 * Customize the message module so it wont constantly be telling the user that
 * lookup tables have been loaded and written to.
 * believe it or not, this is the least evil way I was able to find to
 * override the message handling.
 */
if (Splunk.Module.Message) {
    Splunk.Module.Message= $.klass(Splunk.Module.Message, {
        getHTMLTransform: function($super){
            // Please dont tell me any 'info' about lookups, nor 'error' about 
            // entityLabelSingular, etc...
            // Thank you that is all.
            var argh = [
                {contains:"lookup", level:"info"},
                {contains:"Results written to", level:"info"},
                {contains:"entityLabelSingular", level:"error"},
                {contains:"auto-finalized", level:"info"},
                {contains:"Your timerange was substituted", level:"info"},
                {contains:"Subsearches of a real-time search run over all-time unless explicit", level:"info"},                
                {contains:"Specified field(s) missing from results", level:"warn"}
            ];
            for (var i=this.displayedMessages.length-1; i>=0; i--){
                var message = this.displayedMessages[i];
                for (var j=0,jLen=argh.length;j<jLen;j++) {
                    if ((message.content.indexOf(argh[j]["contains"])!=-1) && (message.level == argh[j]["level"])) {

                        this.displayedMessages.splice(i,1);
                        break;
                    }
                }
            }
            return $super();
        }
    });
}