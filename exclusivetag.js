/*
 * ***** BEGIN LICENSE BLOCK *****
 * This work is licenced under http://creativecommons.org/licenses/by-sa/3.0/ 
 * Original version by http://www.maki-car-rental.com/
 * Please mention the original author's website if re-publishing this work
 * Modified by Sol1 (http://sol1.com.au/) for Zimbra 8.x compatibility
 * ***** END LICENSE BLOCK *****
 */

function com_sol1_exclusivetag_Handler() {
};

com_sol1_exclusivetag_Handler.prototype = new ZmZimletBase();
com_sol1_exclusivetag_Handler.prototype.constructor = com_sol1_exclusivetag_Handler;

com_sol1_exclusivetag_Handler.prototype.init = function() {}

com_sol1_exclusivetag_Handler.prototype.onTagAction = function(items, tag, doTag) {
	if (!doTag) return;
	var appController = appCtxt.getAppController();
	//appController.setStatusMsg("onTagAction " + tag.name + " / "  + tag.id, ZmStatusView.LEVEL_INFO);
	for (var i = 0, numItems = items.length; i < numItems; i++) {
		for (var j = 0, numTags = items[i].tags.length; j < numTags; j++) {
			this._removeTag(items[i].id, items[i].tags[j]);
		}
	}
};

com_sol1_exclusivetag_Handler.prototype._removeTag = function(itemId, tagId) {
	//console.log("Removing Tag " + tagId + " from " + itemId);
	var soapDoc = AjxSoapDoc.create("MsgActionRequest", "urn:zimbraMail");
	var actionNode = soapDoc.set("action");
	actionNode.setAttribute("id", itemId);
	actionNode.setAttribute("op", "!tag");
	actionNode.setAttribute("tn", tagId);
	appCtxt.getAppController().sendRequest({soapDoc:soapDoc, asyncMode:true});
};
