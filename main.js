/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets, window */

define(function (require, exports, module) {
	"use strict";

	var CommandManager  = brackets.getModule("command/CommandManager"),
			Menus           = brackets.getModule("command/Menus"),
			EditorManager   = brackets.getModule("editor/EditorManager"),
			DocumentManager = brackets.getModule('document/DocumentManager');

	function minimiseCode() {
		var doc      = DocumentManager.getCurrentDocument();
		var language = doc.getLanguage();
		var fileType = language._id;

		if((fileType == 'css') || fileType == 'html') {
			var content = doc.getText();

			if(fileType == 'css') {
				content = content.replace(/\/\*(?:(?!\*\/)[\s\S])*\*\/|[\r\n\t]+/g, '');
				content = content.replace(/ {2,}/g, ' ');
				content = content.replace(/ ([{:}]) /g, '$1');
				content = content.replace(/: /g, ':');
				content = content.replace(/([;,]) /g, '$1');
				content = content.replace(/ !/g, '!');
			} else if (fileType == 'html') {
				content = content.replace(/\n/g, '');
				content = content.replace(/>\s+</g, "><");
			}

			doc.setText(content);
		} else {
			window.alert(fileType + ' is not currently supported.');
		}
	}

	var MY_COMMAND_ID = "minimise.code";
	CommandManager.register("Minimise Code", MY_COMMAND_ID, minimiseCode);

	var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
	menu.addMenuItem(MY_COMMAND_ID, "Ctrl-Alt-m");
});
