     'use strict'; 

	 (function () {
		var ESC_KEYCODE=27;


        function topWalker(node,testFunc, lastParant) {
        	while (node&&node!==lastParant) {
        		if (testFunc(node)) {
        			return node;
        		}
        		node=node.parentNode;
        	}
        }


		function ContextMenu(parantNode, menuStructure) {
		    	this.mainElemOfMenu=parantNode;
				this.menu=this.buildMenuMarkup(menuStructure);
				this.menu.className+=' context-main';

				document.body.appendChild(this.menu);
				this.mainElemOfMenu.addEventListener('contextmenu', this.show.bind(this),false);
		document.documentElement.addEventListener('click', this._onGlobalClick.bind(this), false);
		document.documentElement.addEventListener('keyup', this._onGlobalKeyup.bind(this), false);
		
		}



 		ContextMenu.prototype._onGlobalClick = function (event) {
 			var menu=this.menu;
 			if (!topWalker(event.target, function (node) {
 				return menu===node;
 			})) {
 				this.hide();
 	
 			}
 		};


 		ContextMenu.prototype._onGlobalKeyup = function (event) {
 			if(event.keyCode===ESC_KEYCODE) {
 				this.hide();
 			}
 		}

		ContextMenu.prototype.buildMenuMarkup = function (structure) {
			var mainElemOfMenu=document.createElement("ul"); 
				mainElemOfMenu.className='context-menu';
			var submenuArrowNode;
			for (var i=0; i<structure.length; i+=1) {
			    var menuItem1=document.createElement("li");
			    menuItem1.appendChild(document.createTextNode(structure[i].title));
						if(structure[i].action){
						menuItem1.addEventListener('click',structure[i].action, false);
						menuItem1.setAttribute('class', 'menu');
				    }else if(structure[i].submenu) {
				    	submenuArrowNode=document.createElement('span');
				    	submenuArrowNode.innerText='▸';

    	
    				//var menuItem2=document.createElement("ul"); 
    				//menuItem1.appendChild(menuItem2);
	    				menuItem1.setAttribute('class', 'submenu');
	    		 				menuItem1.appendChild(this.buildMenuMarkup(structure[i].submenu));
	    				menuItem1.appendChild(submenuArrowNode);
	    		//		menuItem2.setAttribute('class', 'subMenu');
	    				menuItem1.addEventListener('mouseenter', function (event) {
						menuItem1.querySelector('ul').style.display = 'block';
						}, false); 
						// disappear Submenu
						menuItem1.addEventListener('mouseleave', function (event) {
						menuItem1.querySelector('ul').style.display= 'none';
						}, false); 


					}
				mainElemOfMenu.appendChild(menuItem1);
			}
				return mainElemOfMenu;
		}

		ContextMenu.prototype.show= function (event) { 


			function toArray(param) {
		     return Array.prototype.slice.call(param);
			}
			var takeAllMenu=document.getElementsByClassName('context-main');
			var makeArrayOfAllmenu=toArray(takeAllMenu);
			
			makeArrayOfAllmenu.forEach(function(val) {
				val.style.display= 'none';
			});
			

			event.preventDefault();
			this.menu.style.display= 'block';
			this.menu.style.left = event.pageX + 'px';
   			this.menu.style.top = (event.pageY) + 'px';

		
		}

		ContextMenu.prototype.hide = function(event) {
			this.menu.style.display= 'none';
		}


			window.ContextMenu=ContextMenu;

 } ());







	