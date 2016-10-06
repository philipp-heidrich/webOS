(function()
{
	this.startmenu = {
		AUTHOR: 'Philipp Heidrich'
	}


	/**
	 *
	 *	Boot functions
	 *
	 */

	 /**
 	 *	Start login boot
 	 */
 	startmenu.boot = function()
 	{
 		// Show message
 		boot.printBootMessage('Load startmenu');

		// Lade HTML
		boot.printBootMessage('&#10142; load objects');

		startmenu.obj = {
			startmenu_btn: document.querySelector('.taskline__start'),

			area: document.querySelector('.startmenu'),
 			programm_terminal: document.querySelector('.startmenu .js__onclickTerminal'),
 			programm_explorer: document.querySelector('.startmenu .js__onclickExplorer')
 		}

		boot.printBootMessage('<br>');

		// Add Events
		addEvents();
 	}







	/**
	 *
	 *	Private functions
	 *
	 */

	/**
	 *	Open startmenu
	 */
	function openstartmenu()
	{
		if(!startmenu.status_startmenu)
		{
			startmenu.status_startmenu = true;

			startmenu.obj.area.className += ' startmenu--active';
		}
	}


	/**
	 *	Close startmenu
	 */
	function closestartmenu()
	{
		if(startmenu.status_startmenu)
		{
			startmenu.status_startmenu = false;

			startmenu.obj.area.className = startmenu.obj.area.className.replace(' startmenu--active', '');
		}
	}


	/**
	 *	Add events
	 */
	function addEvents()
	{
		// Global click event
		document.addEventListener('click', function(event)
		{
			var obj = event.target;

			if(
				hasParent('.taskline__start', obj) &&
				!startmenu.status_startmenu
			)
			{
				openstartmenu();
			}

			else if(
				!hasParent('.startmenu', obj) &&
				startmenu.status_startmenu
			)
			{
				closestartmenu();
			}
		});

		// Click event: terminal program
		startmenu.obj.programm_terminal.addEventListener('click', function()
		{
			// Close start menu
			closestartmenu();

			// Open terminal
			new program_terminal;
		});

		// Click event: explorer program
		startmenu.obj.programm_explorer.addEventListener('click', function()
		{
			// Close start menu
			closestartmenu();

			// Open terminal
			new programm_explorer;
		});
	}


	/**
	 *	Check has this element this parent
	 */
	function hasParent(parent, child)
	{
		var node 	= child.parentNode,
			parent 	= document.querySelector(parent);

        while(node != null)
		{
            if(node == parent)
			{
                return true;
            }

            node = node.parentNode;
        }

        return false;
	}


}).call(this);

(function()
{
	this.taskline = {
		AUTHOR: 'Philipp Heidrich'
	}


	/**
	 *
	 *	Boot functions
	 *
	 */

	 /**
 	 *	Start login boot
 	 */
 	taskline.boot = function()
 	{
 		// Show message
 		boot.printBootMessage('Load taskline');

		// Lade HTML
		boot.printBootMessage('&#10142; load objects');
 		taskline.obj = {
 			time_timeday: document.querySelector('.taskline .taskline__timeday'),
 			time_date: document.querySelector('.taskline .taskline__date'),
			program_open: document.querySelector('.taskline .taskline__programOpen')
 		}

		// Lade date + time
		boot.printBootMessage('&#10142; load time');
		initalTime();

		boot.printBootMessage('<br>');
 	}


	/**
	 *	Inital time
	 */
	function initalTime()
	{
		printDate();
		printTime();

		setInterval(function()
		{
			printDate();
			printTime();
		}, 1000);
	}





	/**
	 *
	 *	Public function
	 *
	 */

	/**
  	 *	Add a new program to taskline
  	 */
  	taskline.createTaskProgram = function(o)
  	{
  		o.taskProgram = document.createElement('li');
  		o.taskProgram.program_id = o.id_counter;
  		o.taskProgram.className = 'taskline__window';

  		// Value
		o.taskShow = document.createElement('div');
		o.taskShow.className = 'taskline__showBlock';
		o.taskShow.onclick = function(event)
 		{
 			// Remove global click event
 			program.disableClickEvent = true;

 			// Check is this minimized
 			if(o.isMinimized)
 			{
 				taskline.reminizedWindow(o.id_counter);
 				program.reminizedWindow(o.id_counter);
 			}

 			// Check ist selected
 			else if(o.isSelected)
 			{
 				taskline.minimizeWindow(o.id_counter);
 				program.minimizeWindow(o.id_counter);
 			}

 			// Set a new selection
 			else
			{
 				taskline.setSelection(o.id_counter);
 				program.setSelection(o.id_counter);
 			}
 		}
		o.taskProgram.appendChild(o.taskShow);

  		o.taskName = document.createElement('div');
  		o.taskName.className = 'taskline__programTxt';
  		o.taskName.innerHTML = o.title;
  		o.taskShow.appendChild(o.taskName);

 		// Taskmenu
 		o.taskMenu = document.createElement('div');
 		o.taskMenu.className = 'taskline__programMenu';
 		o.taskProgram.appendChild(o.taskMenu);

 		// Taskmenu - close
 		o.taskMenuClose = document.createElement('div');
 		o.taskMenuClose.className = 'taskline__programMenuBtn taskline__programMenuBtn--close';
 		o.taskMenuClose.onclick = function()
 		{
 			// Remove global click event
 			program.disableClickEvent = true;

 			program.removeWindow(o.id_counter);
 		}
 		o.taskMenu.appendChild(o.taskMenuClose);
 		o.taskMenuClose.appendChild(createFontIcon('close'));

  		// Output
  		taskline.obj.program_open.appendChild(o.taskProgram);
  	}


	/**
 	 *	Remove selection
 	 */
 	taskline.removeSelection = function()
 	{
 		if(program.selected)
 		{
 			var o = program.list[program.selected];

 			// Remove selection class
 			o.taskProgram.className = o.taskProgram.className.replace(' taskline__program--selected', '');
 		}
 	}


	/**
 	 *	Set selection
 	 */
 	taskline.setSelection = function(selectNr)
 	{
 		if(
 			program.list[selectNr] &&
 			selectNr !== program.selected
 		)
 		{
 			var o = program.list[selectNr];

 			// Delete selections
			taskline.removeSelection();

 			// Set selection class
 			o.taskProgram.className += ' taskline__program--selected';
 		}
 	}


	/**
 	 *	Minimize window
 	 */
 	taskline.minimizeWindow = function(id)
 	{
 		var o = program.list[id];

 		// Remove selection
		taskline.removeSelection();

 		// Edit HTML
		o.taskProgram.className += ' taskline__program--minimized';
 	}


	/**
 	 *	Reminimize window
 	 */
 	taskline.reminizedWindow = function(id)
 	{
		var o = program.list[id];

 		// Remove selection
		taskline.removeSelection();

 		// Edit HTML
		o.taskProgram.className = o.taskProgram.className.replace(' taskline__program--minimized', '');
	}









	/**
	 *
	 *	Private functions
	 *
	 */

	/**
	 *	Load time object
	 */
	function getTime()
	{
		var monthNames = [
			{
				name: 'January',
				short: 'Jan'
			},
			{
				name: 'February',
				short: 'Feb'
			},
			{
				name: 'March',
				short: 'Mar'
			},
			{
				name: 'April',
				short: 'Apr'
			},
			{
				name: 'May',
				short: 'May'
			},
			{
				name: 'June',
				short: 'Jun'
			},
			{
				name: 'July',
				short: 'Jul'
			},
			{
				name: 'August',
				short: 'Aug'
			},
			{
				name: 'September',
				short: 'Sep'
			},
			{
				name: 'October',
				short: 'Oct'
			},
			{
				name: 'November',
				short: 'Nov'
			},
			{
				name: 'December',
				short: 'Dec'
			}
		]

		var date 	= new Date(),
			returnObj = {
			hour: 				date.getHours(),
			min: 				date.getMinutes(),
			day: 				date.getDate(),
			month:				date.getMonth() + 1,
			monthName: 			monthNames[date.getMonth() + 1].name,
			monthNameShort:		monthNames[date.getMonth() + 1].short,
			year:				date.getFullYear()
		};

		// Change form
		returnObj.min = (returnObj.min < 10) ? '0' + returnObj.min : returnObj.min;
		returnObj.hour = (returnObj.hour < 10) ? '0' + returnObj.hour : returnObj.hour;
		returnObj.date = (returnObj.date < 10) ? '0' + returnObj.date : returnObj.date;
		returnObj.month = (returnObj.month < 10) ? '0' + returnObj.month : returnObj.month;

		return returnObj;
	}


	/**
	 *	Load date and print this
	 */
	function printDate()
	{
		var time = getTime();

		// Print time
		taskline.obj.time_date.innerHTML = time.day + '.' + time.monthNameShort + ' ' + time.year;
	}


	/**
	 *	Load time and print this
	 */
	function printTime()
	{
		var time = getTime();

		// Print time
		taskline.obj.time_timeday.innerHTML = time.hour + ':' + time.min;
	}


	/**
	 *	Create a google font icon
	 */
	function createFontIcon(fontType)
	{
		var iconfontObj = document.createElement('i');
		iconfontObj.className = 'material-icons';
		iconfontObj.innerHTML = fontType;

		return iconfontObj;
	}




}).call(this);

(function()
{
	this.class_module = {
		AUTHOR: 'Philipp Heidrich'
	}


	/**
	 *
	 *	Public functions
	 *
	 **/

	/**
	 *	Change module
	 **/
	class_module.changeModule = function(content)
	{
		var allContents = document.querySelectorAll('#wrapper .content');

		// Get new counter
		if(!class_module.changeModule_ctr)
		{
			class_module.changeModule_ctr = 9;
		}
		else
		{
			class_module.changeModule_ctr++;
		}

		// Hide current content
		content.className += ' content--show';

		// Loop all contents to hide them
		for(var i = 0; i < allContents.length; i++)
		{
			var _content = allContents[i];

			// Check if this content show
			if(_content.className.match('content--active'))
			{
				// Remove hidden attribute
				_content.className = _content.className.replace(' content--active', '');
			}
		}

		// Get new z-index
		content.style.zIndex = class_module.changeModule_ctr;

		// Fadein
		setTimeout(function()
		{
			// Remove hide class
			// content.className = content.className.replace(' content--hide', '');

			// Show new content
			content.className += ' content--active';
		}, 10);
	}




	/**
	 *
	 *	Private functions
	 *
	 **/





}).call(this);

(function()
{
	this.class_os = {
		AUTHOR: 'Philipp Heidrich'
	}


	/**
	 *
	 *	Public functions
	 *
	 */

	/**
	 *	Save first pc visit
	 */
	class_os.saveFirstPcVisit = function()
	{
		option.save('os_firstVisit', true);

		return true;
	}


	/**
	 *	Get first pc visit
	 */
	class_os.getFirstPcVisit = function()
	{
		if(
			!option.load('os_firstVisit') ||
			option.load('os_firstVisit') == false
		)
		{
			return true;
		}
		else
		{
			return false;
		}
	}


	/**
	 *	Save pc name
	 */
	class_os.savePcName = function(name)
	{
		// Save pc name
		option.save('os_name', name);
	}


	/**
	 *	Get pc name
	 */
	class_os.getPcName = function()
	{
		return option.load('os_name');
	}

}).call(this);

(function()
{
	this.class_storage = {
		AUTHOR: 'Philipp Heidrich'
	}


	var currentPath = '~';




	/**
	 *
	 *	Boot functions
	 *
	 */

	 /**
 	 *	Start login boot
 	 */
 	class_storage.boot = function()
 	{
 		// Show message
 		boot.printBootMessage('Load storage');

		// Lade HTML
		boot.printBootMessage('&#10142; load filesystem');
		loadFilesystem();

		boot.printBootMessage('<br>');
 	}




	/**
	 *
	 *	Public functions
	 *
	 */

	/**
	 *	Show current path
	 */
	class_storage.getCurrentPath = function()
	{
		return currentPath;
	}


	/**
	 *	Show current real path
	 */
	class_storage.getCurrentRealPath = function()
 	{
 		var path = currentPath;

		// Replace ~ with the real path
		path = path.replace('~', '/home/' + class_user.getCurrentUser());

		return path;
 	}


	/**
	 *	Create a dir - mkdir
	 */
	class_storage.createDir = function(path)
	{
		var path = getSplitPath(path),
			createDir = path.pop(),
			foundPath = class_storage.fs,
			isFound = false;

		for(var _dir in path)
		{
			var _item = path[_dir];

			if(
				foundPath[_item] &&
				foundPath[_item].type == 'dir'
			)
			{
				isFound = true;
				foundPath = foundPath[_item];
			}
			else
			{
				isFound = false;
				break;
			}
		}

		// Check if this a valid path to the dir
		if(
			isFound &&
			!foundPath[createDir]
		)
		{
			// Create new dir
			foundPath[createDir] = {
				'type': 'dir',
				'dir': {}
			};

			// Save filesystem
			saveFileSystem();

			return true;
		}

		return false;
	}


	/**
	 *	Create new file
	 */
	class_storage.createFile = function(path, file, content)
	{
		var splitPath = getSplitPath(path),
			dirObj = getDir(splitPath);

		if(dirObj)
		{
			dirObj[file] = {
				'type': 'file',
				'content': content
			}

			saveFileSystem();

			return true;
		}

		return false;
	}


	/**
	 *	Append content to file
	 */
	class_storage.appendContent = function(path, content)
	{
		var splitPath = getSplitPath(path),
			dirObj = getFile(splitPath);

		if(dirObj)
		{
			dirObj.content += content;

			saveFileSystem();

			return true;
		}

		return false;
	}



	/**
	 *	Show all files
	 */
	class_storage.showAll = function(path)
	{
		var path = (path) ? path : class_storage.getCurrentRealPath();

		var splitPath = getSplitPath(path),
			dirContent = getDir(splitPath);

		return dirContent;
	}







	/**
	 *
	 *	Private functions
	 *
	 */

	/**
	 *	Split path
	 */
	function getSplitPath(path)
	{
		// Check if the first character ~
		if(path[0] == '~')
		{
			path = path.replace('~', '/home/' + class_user.getCurrentUser());
		}

		if(path[0] !== '/')
		{
			path = class_storage.currentPath + path;
		}

		var splitPath = path.split('/');

		// Replace the first item
		if(splitPath[0] == '')
		{
			splitPath.shift();
		}

		return splitPath;
	}


	/**
	 *	Get the dir
	 */
	function getDir(dirArray)
	{
		var foundPath = class_storage.fs,
			isFound = false;

		if(
			dirArray.length == 1 &&
			dirArray == ''
		)
		{
			isFound = true;
		}
		else {
			for(var _item in dirArray)
			{
				var _dir = dirArray[_item];

				if(
					foundPath[_dir] &&
					foundPath[_dir].type == 'dir'
				)
				{
					isFound = true;
					foundPath = foundPath[_dir];
				}
				else
				{
					isFound = false;
				}
			}

			foundPath = foundPath.dir;
		}

		// Check have this element a dir
		if(isFound)
		{
			return foundPath;
		}
		else {
			return false;
		}
	}


	/**
	 *	Get file
	 */
	function getFile(pathArray)
	{
		var foundPath = class_storage.fs,
			isDirFound = false;

		var path = pathArray,
			file = path.pop();

		for(var _item in path)
		{
			var _dir = path[_item];

			if(
				foundPath[_dir] &&
				foundPath[_dir].type == 'dir'
			)
			{
				foundPath = foundPath[_dir];
				isDirFound = true;
			}
			else {
				break;
			}
		}

		// Check if the dir found
		if(
			isDirFound &&
			foundPath.dir &&
			foundPath.dir[file]
		)
		{
			return foundPath.dir[file];
		}

		return false;
	}


	/**
	 *	Load options
	 */
	function loadFilesystem()
	{
		class_storage.fs = option.load('storage_filesys');
	}


	/**
	 *	Save fs
	 */
	function saveFileSystem()
	{
		option.save('storage_filesys', class_storage.fs);
	}



}).call(this);

(function()
{
	this.class_user = {
		AUTHOR: 'Philipp Heidrich'
	}



	/**
	 *	Public functons
	 */

	/**
	 *	Create new user
	 */
	class_user.createNewUser = function(name, id, pwd, type)
	{
		// Check is valid name
		if(!name || !name.length)
		{
			return;
		}

		// Check user type
		if(!type || !type.match(/[admin|user]/g))
		{
			return;
		}

		var userObj = {
			id: id,
			name: name,
			type: type,
			pwd: false
		}

		// Hash pwd
		if(pwd)
		{
			userObj.pwd = hashpwd(pwd);
		}

		// Load account array
		var allAccounts = option.load('account_users');

		// Add new user to array
		allAccounts[id] = userObj;

		// Save new account array
		option.save('account_users', allAccounts);

		// Save new files + dirs content
		class_storage.createDir('/home/' + id);
		class_storage.createFile('/home/' + id, '.bash_history', '');

		return true;
	}


	/**
	 *	Get all pc users
	 */
	class_user.getAllUsers = function()
	{
		return option.load('account_users');
	}


	/**
	 *	Get this user
	 */
	class_user.getUser = function(userId)
	{
		var allUsers = option.load('account_users');

		if(allUsers[userId])
		{
			return allUsers[userId];
		}
		else {
			return false;
		}
	}


	/**
	 *	Get length of users
	 */
	class_user.getUserLength = function()
	{
		var users = option.load('account_users'),
			userLength = 0;

		for(var _user in users)
		{
			userLength++;
		}

		return userLength;
	}


	/**
	 *	Get last login user
	 */
	class_user.getCurrentUser = function()
	{
		var lastlogin = option.load('account_currentUser');
		return lastlogin;
	}


	/**
	 *	Save last login user
	 */
	class_user.saveCurrentUser = function(userId)
	{
		option.save('account_currentUser', userId);
	}


	/**
	 *	Check right pwd
	 */
	class_user.comparePwd = function(pwd, pwdhash)
	{
		var newPwdHash = hashpwd(pwd);
		if(newPwdHash == pwdhash)
		{
			return true;
		}
		else
		{
			return false;
		}
	}


	/**
	 *	Set login user
	 */
	class_user.setLoginUser = function(userId)
	{
		option.save('account_login', userId);
	}


	/**
	 *	Remove login user
	 */
	class_user.removeLoginUser = function()
	{
		option.save('account_login', false);
	}







	/**
	 *	Private functions
	 */

	/**
	 *	Hash password
	 */
	function hashpwd(pwd)
	{
		var hash = 0;

		if(pwd.length == 0)
		{
			return hash;
		}

		for(i = 0; i < pwd.length; i++)
		{
			char = pwd.charCodeAt(i);
			hash = ((hash<<5)-hash)+char;
			hash = hash & hash; // Convert to 32bit integer
		}

		return hash;
	}


}).call(this);

(function()
{
	this.boot = {
		AUTHOR: "Philipp Heidrich"
	}

	// var delay_boot = 0,
	// 	delay_program = 0;
	var delay_boot = 500,
		delay_program = 150;


	/**
	 *	Inital boot
	 */
	boot.init = function()
	{
		// Load HTML
		boot.loadHTML();

		// Inital bootloader
		boot.loader([
			register.boot,
			login.boot,
			desktop.boot,
			class_storage.boot,
			taskline.boot,
			startmenu.boot,
			program.boot
		],

		// Run Callback
		function()
		{
			// Check is this the first visit
			if(class_os.getFirstPcVisit())
			{
				setTimeout(register.init, delay_boot);
			}
			else
			{
				setTimeout(login.init, delay_boot);
			}
		});
	}


	/**
	 *	Load all HTML
	 */
	boot.loadHTML = function()
	{
		boot.obj = {
			content: document.querySelector('#wrapper .boot'),
			scroller: document.querySelector('.boot .boot__scroller')
		}
	}


	/**
	 *	Load all objects
	 */
	boot.loader = function(loadArray, cb)
	{
		setTimeout(function()
		{
			if(loadArray.length)
			{
				// Delete first array function
				var _firstEl = loadArray.shift();

				// Run first array function
				if(_firstEl)
					_firstEl();

				// Run next loading
				boot.loader(loadArray, cb);
			}

			// Nothing in bootloader
			else
			{
				cb();
			}
		}, delay_program);
	}



	/**
	 *	Print new boot message
	 */
	boot.printBootMessage = function(message)
	{
		var li = document.createElement('li');
		li.innerHTML = message;
		boot.obj.scroller.appendChild(li);
	}







	/**
	 *	Events
	 */
	window.addEventListener('load', function()
	{
		boot.init();
	});


}).call(this);

(function()
{
	this.desktop = {
		AUTHOR: "Philipp Heidrich"
	}


	/**
	 *
	 *	Inital functions
	 *
	 */

	/**
	 *	Inital Desktop
	 */
	desktop.init = function()
	{
		// Starte Screen
		desktop.init_showScreen();
	}


	/**
	 *	Start screen
	 */
	desktop.init_showScreen = function()
 	{
		// Change Module
		class_module.changeModule(desktop.obj.content);
 	}





	/**
	 *
	 *	Boot functions
	 *
	 */

	 /**
 	 *	Start login boot
 	 */
 	desktop.boot = function()
 	{
 		// Show message
 		boot.printBootMessage('Load desktop');

		// Lade HTML
		boot.printBootMessage('&#10142; load objects');
 		desktop.obj = {
 			wrapper: document.querySelector('#wrapper'),
 			content: document.querySelector('.desktop'),
			program: document.querySelector('.desktop .desktop__programs')
 		}

		boot.printBootMessage('<br>');
 	}





	/**
	 *
	 *	Private functions
	 *
	 */






}).call(this);

(function()
{
	this.login = {
		AUTHOR: "Philipp Heidrich"
	}


	/**
	 *
	 *	Inital functions
	 *
	 */

	/**
	 *	Inital Desktop
	 */
	login.init = function()
	{
		// Starte Screen
		login.init_showScreen();

		// Show right content
		login.init_showContent();

		// Add events
		login.init_addEvents();
	}


	/**
	 *	Start login screen
	 */
	login.init_showScreen = function()
 	{
		// Change Module
		class_module.changeModule(login.obj.content);
 	}


	/**
	 *	Show right content
	 */
	login.init_showContent = function()
	{
		var lastlogin = class_user.getCurrentUser();

		// Show change user button
		if(lastlogin)
		{
			// Show user login
			showLoginUserBox(lastlogin);

			// Show user change button
			showLoginChangeButton();
		}

		// No account found
		else
		{
			showAllUsersBox();
		}
	}


	/**
	 *	Add eventlistener
	 */
	login.init_addEvents = function()
	{
		// Event keypress password input field
		login.obj.showbox_password_input.addEventListener('keyup', function(event)
		{
			checkPwd();
		});

		// Event onclick login button
		login.obj.showbox_button.addEventListener('click', function()
		{
			goLogin();
		});

		// Click event: change button
		login.obj.showbox_changeUserBtn.addEventListener('click', function()
		{
			changeUser();
		});
	}






	/**
	 *
	 *	Boot functions
	 *
	 */

	 /**
 	 *	Start login boot
 	 */
 	login.boot = function()
 	{
 		// Show message
 		boot.printBootMessage('Load login...');

 		// Lade HTML
		boot.printBootMessage('&#10142; load objects');
 		login.obj = {
 			wrapper: document.querySelector('#wrapper'),
 			content: document.querySelector('.login'),
 			show_name: document.querySelector('.login .js__showName'),
			loginbox_withAccount: document.querySelector('.login .login__box.login__box--withUser'),
			loginbox_noAccount: document.querySelector('.login .login__box.login__box--noUser'),
 			showbox_password: document.querySelector('.login .login__area--password'),
			showbox_password_input: document.querySelector('.login .login__inputField'),
 			showbox_button: document.querySelector('.login .login__area--button'),
			showbox_changeUser: document.querySelector('.login .login__changeUser'),
			showbox_changeUserBtn: document.querySelector('.login .login__changUserBtn'),

			noUser_loginList: document.querySelector('.login .login__chooseUserList')
 		}

		// Load user functions
		boot.printBootMessage('&#10142; load user');
		class_user.removeLoginUser();

		boot.printBootMessage('<br>');
 	}







	/**
	 *
	 *	Private functions
	 *
	 */

	/**
	 *	Ceck is this the right pwd
	 */
	function checkPwd()
	{
		var currentUser = class_user.getCurrentUser();
		if(currentUser)
		{
			var pwd 	= login.obj.showbox_password_input.value,
				pwdHash = class_user.getUser(currentUser).pwd;

			// Pwd is correct
			if(class_user.comparePwd(pwd, pwdHash))
			{
				goLogin();
			}
		}
	}


	/**
	 *	Login and show desktop
	 */
	function goLogin()
	{
		// Save new current user
		class_user.saveCurrentUser(login.currentUser.id);

		// Save login user
		class_user.setLoginUser(login.currentUser.id);

		// Show desktop
		desktop.init();
	}


	/**
	 *	Change user
	 */
	function changeUser()
	{
		showAllUsersBox();

		// Save no current user
		class_user.saveCurrentUser(false);
	}


	/**
	 *	Show all users
	 */
	function printAllUsers()
	{
		var allUsers 	= class_user.getAllUsers(),
			allObj		= [];

		// Reset user
		login.obj.noUser_loginList.innerHTML = '';

		// Create all user html objects
		for(_user in allUsers)
		{
			var user = allUsers[_user];

			var li = document.createElement('li');
			li.userId = user.id;
			li.className = 'login__chooseUser';

			var name = document.createElement('h4');
			name.className = 'login__chooseUserName';
			name.innerHTML = user.name;
			li.appendChild(name);

			var id = document.createElement('h6');
			id.className = 'login__chooseUserId';
			id.innerHTML = user.id;
			li.appendChild(id);

			// Check is this a admin
			if(user.type == 'admin')
			{
				var type = document.createElement('div');
				type.className = 'login__chooseUserType';
				type.innerHTML = user.type;
				li.appendChild(type);
			}

			// Print
			login.obj.noUser_loginList.appendChild(li);

			// Add to array
			allObj.push(li);

			// Add event
			li.addEventListener('click', function()
			{
				// Save no current user
				class_user.saveCurrentUser(this.userId);

				// Show login user box
				showLoginUserBox(this.userId);

				// Show user change button
				showLoginChangeButton();
			});
		}

		// FadeIn
		var delaytimer = 200;
		for(_obj in allObj)
		{
			(function(timer)
			{
				var obj = this;

				setTimeout(function()
				{
					// Add class for css animation
					obj.className += ' login__chooseUser--active';
				}, timer);

			}).call(allObj[_obj], delaytimer);

			delaytimer = delaytimer + 100;
		}




	}


	/**
	 *	Show login user
	 */
	function showLoginUserBox(_user)
	{
		var allUsers = class_user.getAllUsers();
		login.currentUser = allUsers[_user];

		// Print user name
		login.obj.show_name.innerHTML = login.currentUser.name;

		// Reset all login areas
		login.obj.showbox_password.className 	= login.obj.showbox_password.className.replace(' login__area--active', '');
		login.obj.showbox_button.className 		= login.obj.showbox_button.className.replace(' login__area--active', '');

		// Check have this user a password
		if(login.currentUser.pwd)
		{
			login.obj.showbox_password.className += ' login__area--active';
			login.obj.showbox_password_input.select();
		}

		// Check have user no password
		else
		{
			login.obj.showbox_button.className += ' login__area--active';
		}

		// Show login box
		login.obj.loginbox_noAccount.className = login.obj.loginbox_noAccount.className.replace(' login__box--active', '');
		login.obj.loginbox_withAccount.className += ' login__box--active';
	}


	/**
	 *	Show all users
	 */
	function showAllUsersBox()
	{
		login.obj.loginbox_withAccount.className = login.obj.loginbox_withAccount.className.replace(' login__box--active', '');
		login.obj.loginbox_noAccount.className += ' login__box--active';

		printAllUsers();
	}


	/**
	 *	Show user change button
	 */
	function showLoginChangeButton()
	{
		// Check how many account exits
		if(class_user.getUserLength() > 1)
		{
			login.obj.showbox_changeUser.className += ' login__changeUser--active';
		}
		else {
			login.obj.showbox_changeUser.className = login.obj.showbox_changeUser.className.replace(' login__changeUser--active', '');
		}
	}





}).call(this);

(function()
{
	this.register = {
		AUTHOR: "Philipp Heidrich"
	}


	/**
	 *
	 *	Inital functions
	 *
	 */

	/**
	 *	Inital Desktop
	 */
	register.init = function()
	{
		// Starte Screen
		init_showScreen();

		// Add events
		init_addEvents();
	}


	/**
	 *	Start login screen
	 */
	function init_showScreen()
 	{
		// Change Module
		class_module.changeModule(register.obj.content);
 	}


	/**
	 *	Add event listener to objects
	 */
	function init_addEvents()
	{
		// Submit form
		register.obj.form.addEventListener('submit', function(event)
		{
			event.preventDefault();
			return false;
		});

		// Next Button
		register.obj.button_fin.addEventListener('click', function(event)
		{
			if(
				createFirstUser() &&
				createOSSettings()
			)
			{
				goLoginSite();
			}
		});
	}






	/**
	 *
	 *	Boot functions
	 *
	 */

	/**
 	 *	Start login boot
 	 */
	register.boot = function()
 	{
 		// Show message
 		boot.printBootMessage('Load register');

 		// Lade HTML
		boot.printBootMessage('&#10142; load objects');
 		register.obj = {
 			wrapper: document.querySelector('#wrapper'),
 			content: document.querySelector('.register'),
 			form: document.querySelector('.register .register__form'),
 			input_name: document.querySelector('.register .js__inputName'),
 			input_pcName: document.querySelector('.register .js__inputPcname'),
 			input_pwd: document.querySelector('.register .js__inputPwd'),
 			input_pwdRepeat: document.querySelector('.register .js__inputPwdRepeat'),
 			button_fin: document.querySelector('.register .js__registerFin')
 		}

		boot.printBootMessage('<br>');
 	}






	/**
	 *
	 *	Private functions
	 *
	 */

	/**
	 *	Convert pcname
	 */
	function convertPCname(name)
	{
		// Edit
		name = name.replace(/ /gi, '.');
		name = name.replace(/[^a-zA-Z0-9\.]/g, '');
		name = name.toLowerCase();

		return name;
	}


	/**
	 *	Create first user
	 **/
	function createFirstUser()
	{
		var name 	= register.obj.input_name.value,
			pwd 	= register.obj.input_pwd.value,
			id 		= convertPCname(register.obj.input_name.value);

		// Check is this the same pwd
		if(
			(register.obj.input_pwd.value || register.obj.input_pwdRepeat.value)
			&&
			(register.obj.input_pwd.value !== register.obj.input_pwdRepeat.value)
		)
		{
			new msg.init({
				content: {
					txt: "Not the same passwords"
				}
			});

			return false;
		}

		// Create new user
		var newUser = class_user.createNewUser(name, id, pwd, 'admin');
		if(newUser)
		{
			// Save last login user
			class_user.saveCurrentUser(id);

			return true;
		}
		else
		{
			new msg.init({
				content: {
					txt: "Please fill all fields"
				}
			});

			return false;
		}
	}


	/**
	 *	Create os settings
	 */
	function createOSSettings()
	{
		var pcname = convertPCname(register.obj.input_pcName.value);

		// Save first pc visit
		class_os.saveFirstPcVisit();

		// Save PC name
		class_os.savePcName(pcname);

		return true;
	}


	/**
	 *	Go to login site
	 */
	function goLoginSite()
	{
		// Go to login screen
		login.init();
	}


}).call(this);

var programm_explorer = function(fullscreen)
{
	// Create global object
	var o = {
		AUTHOR: 'Philipp Heidrich',
		VERSION: 1,
		pressedKeys: []
	};

	// Create window
	o.progObj = program.startWindow('explorer', 'Explorer');

	// Get HTML
	o.obj = {

	}

};

(function()
{
	this.program = {
		AUTHOR: 'Philipp Heidrich'
	}

	program.list 		= {};
	program.selected	= false;
	program.counter 	= 10;
	program.idCounter 	= 0;







	/**
	 *
	 *	Boot functions
	 *
	 */

	 /**
 	 *	Start login boot
 	 */
 	program.boot = function()
 	{
 		// Show message
 		boot.printBootMessage('Load program');

		// Lade HTML
		boot.printBootMessage('&#10142; load objects');

		program.obj = {
			programArea: document.querySelectorAll('.desktop__programs')
 		}

		boot.printBootMessage('<br>');

		// Add Events
		addEvents();
 	}


	/**
	 *	Start program
	 */
	program.startWindow = function(id, title, fullscreen)
	{
		var o = {};

		// Set new id
		program.idCounter++;
		o.id_counter = program.idCounter;
		o.id_program = id;
		o.title = title;

		// Add window
		createWindow(o);

		// Add taskmanager
		taskline.createTaskProgram(o);

		// Set new position
		// Check if is a selected window
		if(program.selected)
		{
			var obj = program.list[program.selected],
				pos_x = obj.layer.offsetLeft,
				pos_y = obj.layer.offsetTop;

			setNewWindowPosition(o.layer, pos_x, pos_y);
		}

		// Check if is a window found
		else if(
			program.idCounter - 1 &&
			program.list[program.idCounter - 1] &&
			!program.list[program.idCounter - 1].minimized
		)
		{
			var obj = program.list[program.idCounter - 1],
				pos_x = obj.layer.offsetLeft,
				pos_y = obj.layer.offsetTop;

			setNewWindowPosition(o.layer, pos_x, pos_y);
		}

		// Disalbe global click event
		program.disableClickEvent = true;

		// Add this object to global array
		program.list[o.id_counter] = o;

		// Add program to desktop
		desktop.obj.program.appendChild(o.layer);

		// Set new z-index
		program.counter++;
		o.layer.style.zIndex = program.counter;

		// Set to selected
		program.setSelection(o.id_counter);

		if(fullscreen)
		{
			program.maximizeWindow(program.idCounter);
		}

		return o;
	}






	/**
	 *
	 *	Public functions
	 *
	 */

	 /**
 	 *	Get current selected window
 	 */
 	program.getSelectedWindow = function()
 	{
 		if(program.selected)
 		{
 			return program.list[program.selected];
 		}
 		else {
 			return false;
 		}
 	}


 	/**
 	 *	Close window
 	 */
 	program.removeWindow = function(id)
 	{
 		var _layer = program.list[id].layer,
 			_task = program.list[id].taskProgram;

 		// Remove selection
 		if(program.selected == id)
 		{
 			program.selected = false;
 		}

		// Add close class
		_layer.className += ' window--close';
		_task.parentNode.removeChild(_task);

		setTimeout(function()
		{
			// Remove html object
	 		_layer.parentNode.removeChild(_layer);
		}, 500);

		// Remove object
 		delete program.list[id];
 	}


 	/**
 	 *	Minimize window
 	 */
 	program.minimizeWindow = function(id)
 	{
 		var o = program.list[id],
 			_layer = o.layer;

 		// Edit object
 		o.isMinimized = true;

 		// Remove selection
 		program.removeSelection();

		// Edit HTML
 		_layer.className += ' window--minimized';

		// Delay
		setTimeout(function()
		{
			_layer.style.display = 'none';
		}, 500);
 	}


 	/**
 	 *	Reminimize window
 	 */
 	program.reminizedWindow = function(id)
 	{
 		var o = program.list[id];
 		var _layer = o.layer;

 		// Edit object
 		o.isMinimized = false;

 		// Remove selection
 		program.setSelection(id);

 		// Edit HTML
 		_layer.className = _layer.className.replace(' window--minimized', ' window--reminimized');
		_layer.style.display = 'block';

 		// Delete reminimized class
 		setTimeout(function()
 		{
 			_layer.className = _layer.className.replace(' window--reminimized', '');
 		}, 550);
 	}


 	/**
 	 *	Remove selection
 	 */
 	program.removeSelection = function()
 	{
 		if(program.selected)
 		{
 			var o 			= program.list[program.selected],
 				_layer 		= o.layer,
 				_task 		= o.taskProgram;

 			// Edit object
 			o.isSelected = false;

 			// Remove selection class
 			_layer.className = _layer.className.replace(' window--selected', '');
 			_task.className = _task.className.replace(' taskline__window--selected', '');

 			// Remove selection
 			program.selected = false;
 		}
 	}


 	/**
 	 *	Set selection
 	 */
 	program.setSelection = function(selectNr)
 	{
 		if(
 			program.list[selectNr] &&
 			selectNr !== program.selected
 		)
 		{
 			var o 			= program.list[selectNr],
 				_layer 		= o.layer,
 				_task 		= o.taskProgram;

 			// Delete selections
 			program.removeSelection();

 			// Edit object
 			o.isSelected = true;

 			// Set new z-index
 			program.counter++;
 			_layer.style.zIndex = program.counter;

 			// Set selection class
 			_layer.className += ' window--selected';
 			_task.className += ' taskline__window--selected';

 			// Set global selection
 			program.selected = selectNr;
 		}
 	}


	/**
	 *	Maximize window to the screen size
	 */
	program.maximizeWindow = function(id)
	{
		var o = program.list[id];

		if(!o.isMaximize)
		{
			// Set is variable to true
			o.isMaximize = true;

			// Save current window size
			o.windowsSize = {
				x: o.layer.offsetWidth,
				y: o.layer.offsetHeight
			}

			// Save window position
			o.windowPos = {
				x: o.layer.offsetLeft,
				y: o.layer.offsetTop
			}

			o.layer.className += ' window--maximize';

			// Run all extern maximize functions
			if(o.pushMaximizedArray)
			{
				for(var i = 0; i < o.pushMaximizedArray.length; i++)
				{
					o.pushMaximizedArray[i]();
				}
			}
		}
	}


	/**
	 *	Reduce window size to the original window size
	 */
	program.reduceWindow = function(id)
	{
		var o = program.list[id],
			oldWindowsSize = o.windowsSize,
			oldWindowsPos = o.windowPos;

		if(o.isMaximize)
		{
			o.isMaximize = false;

			// Delete class
			o.layer.className = o.layer.className.replace(' window--maximize', '');

			// Set new position
			if(oldWindowsPos)
			{
				o.layer.style.left = oldWindowsPos.x;
				o.layer.style.top = oldWindowsPos.y;
			}

			// Set new size
			if(oldWindowsSize)
			{
				o.layer.style.width = oldWindowsPos.x;
				o.layer.style.height = oldWindowsPos.y;
			}

			// Run all extern reduce functions
			if(o.pushReduceArray)
			{
				for(var i = 0; i < o.pushReduceArray.length; i++)
				{
					o.pushReduceArray[i]();
				}
			}
		}
	}


	/**
	 *	Push window resize function
	 */
	program.pushResizeFunction = function(id, func)
	{
		var o = program.list[id];

		if(!o.pushResizeArray)
		{
			o.pushResizeArray = [];
		}

		o.pushResizeArray.push(func);
	}


	/**
	 *	Push window maximized function
	 */
	program.pushMaximizedFunction = function(id, func)
	{
		var o = program.list[id];

		if(!o.pushMaximizedArray)
		{
			o.pushMaximizedArray = [];
		}

		o.pushMaximizedArray.push(func);
	}


	/**
	 *	Push window maximized function
	 */
	program.pushReduceFunction = function(id, func)
	{
		var o = program.list[id];

		if(!o.pushReduceArray)
		{
			o.pushReduceArray = [];
		}

		o.pushReduceArray.push(func);
	}







	/**
	 *
	 *	Private functions
	 *
	 */

	/**
	 *	Add a new window
	 */
	function createWindow(o)
	{

		var tmpl = document.querySelector('#programs [program="' + o.id_program + '"]');

		o.layer = document.createElement('div');
		o.layer.program_id = o.id_counter;
		o.layer.setAttribute('data-program-id', o.id_counter);
		o.layer.className = 'window';

		o.resizeArea = document.createElement('div');
		o.resizeArea.className = 'window__resizeArea';
		o.layer.appendChild(o.resizeArea);

		// Resize - top
		createResizeDiv('top', o);
		createResizeDiv('right', o);
		createResizeDiv('bottom', o);
		createResizeDiv('left', o);
		createResizeDiv('rightTop', o);
		createResizeDiv('rightBottom', o);
		createResizeDiv('leftBottom', o);
		createResizeDiv('leftTop', o);

		// Header
		o.header = document.createElement('div');
		o.header.className = 'window__header';
		o.layer.appendChild(o.header);

		// Header - move
		o.headerMove = document.createElement('div');
		o.headerMove.className = 'window__move';
		o.headerMove.onmousedown = function(event)
		{
			// Disabled global click event
			program.disableClickEvent = true;
			startWindowMovment(event, o.id_counter);
		}
		o.headerMove.ondblclick = function()
		{
			// Disabled global click event
			program.disableClickEvent = true;

			if(o.isMaximize)
			{
				program.reduceWindow(o.id_counter);
			}
			else {
				program.maximizeWindow(o.id_counter);
			}
		}
		o.header.appendChild(o.headerMove);

		// Header - title
		o.headerTitle = document.createElement('div');
		o.headerTitle.className = 'window__title';
		o.headerTitle.innerHTML = o.title;
		o.header.appendChild(o.headerTitle);

		o.headerRight = document.createElement('div');
		o.headerRight.className = 'window__headerRight';
		o.header.appendChild(o.headerRight);

		// Header - Minimze Btn
		o.headerMinimize = document.createElement('div');
		o.headerMinimize.className = 'window__headerBtn window__headerBtn--mini';
		o.headerMinimize.onclick = function()
		{
			// Disabled global click event
			program.disableClickEvent = true;

			taskline.minimizeWindow(o.id_counter);
			program.minimizeWindow(o.id_counter);
		}
		o.headerRight.appendChild(o.headerMinimize);
		o.headerMinimize.appendChild(createFontIcon('remove'));

		// Header - Max-min Btn
		o.headerMaxMinimize = document.createElement('div');
		o.headerMaxMinimize.className = 'window__headerBtn window__headerBtn--maxminmize';
		o.headerMaxMinimize.onclick = function()
		{
			// Disabled global click event
			program.disableClickEvent = true;

			if(o.isMaximize)
			{
				program.reduceWindow(o.id_counter);
			}
			else {
				program.maximizeWindow(o.id_counter);
			}
		}
		o.headerRight.appendChild(o.headerMaxMinimize);
		o.headerMaxMinimize.appendChild(createFontIcon('crop_5_4'));

		// Header - Close Btn
		o.headerClose = document.createElement('div');
		o.headerClose.className = 'window__headerBtn window__headerBtn--close';
		o.headerClose.onclick = function()
		{
			// Disabled global click event
			program.disableClickEvent = true;

			program.removeWindow(o.id_counter);
		}
		o.headerRight.appendChild(o.headerClose);
		o.headerClose.appendChild(createFontIcon('close'));

		// Content
		o.content = tmpl.cloneNode(true);
		o.content.className = 'window__content ' + o.id_program;
		o.layer.appendChild(o.content);
	}


	/**
	 *	Add Events
	 */
	function addEvents()
	{
		// Global click event
		document.addEventListener('click', function(event)
		{
			if(program.disableClickEvent)
			{
				program.disableClickEvent = false;
			}
			else
			{
				var parentProgram = hasParent('.window', event.target, true);

				// Check if this a child from a program
				if(
					!parentProgram ||
					parentProgram.program_id !== program.list
				)
				{
					// Remove selection
					program.removeSelection();
					taskline.removeSelection();
				}

				// Set program selection
				if(
					parentProgram &&
					parentProgram.program_id
				)
				{
					program.setSelection(parentProgram.program_id);
				}
			}
		});


		// Global mousemove event
		window.addEventListener('mousemove', function(event)
		{
			moveWindowMovment(event);
			moveWindowResize(event);
		});

		// Global mouseup event
		window.addEventListener('mouseup', function(event)
		{
			stopWindowMovment(event),
			stopWindowResize(event);
		});
	}


	/**
 	 *	Check has this element this parent
 	 */
 	function hasParent(parent, child, returnParent)
 	{
		// Loop all Parents
		function loopAllParents(node, parentArray)
		{
			for(var i = 0; i < parentArray.length; i++)
			{
				if(parentArray[i] == node)
				{
					return node;
				}
			}

			return false;
		}

 		var node = child.parentNode,
			parents = (typeof parent == 'string') ? document.querySelectorAll(parent) : parent;

        while(node != null)
 		{
			var parentFound = loopAllParents(node, parents);

			if(parentFound)
			{
				if(returnParent)
				{
					return parentFound;
				}
				else {
					return true;
				}
			}

			node = node.parentNode;
        }

        return false;
 	}


	/**
	 *	Set new window position
	 */
	function setNewWindowPosition(obj, left, top)
	{
		var distance = 25;

		// Add new position
		obj.style.left = left + distance + 'px';
		obj.style.top = top + distance + 'px';
	}


	/**
	 *	Create a google font icon
	 */
	function createFontIcon(fontType, addClass)
	{
		var iconfontObj = document.createElement('i');
		iconfontObj.className = 'material-icons';
		iconfontObj.innerHTML = fontType;

		if(addClass)
		{
			iconfontObj.className += ' ' + addClass;
		}

		return iconfontObj;
	}


	/**
	 *	Create resize div
	 */
	function createResizeDiv(type, o)
	{
		var id = 'changeSize_' + type;

		o[id] = document.createElement('div');
		o[id].className = 'window__changeSize';
		o[id].setAttribute('data-position', type);
		o[id].onmousedown = function(event)
		{
			// Disabled global click event
			program.disableClickEvent = true;

			// Start resize window size
			startWindowResize(event, o.id_counter, type);
		}
		o.resizeArea.appendChild(o[id]);
	}


	/**
	 *	Start window movement
	 */
	function startWindowMovment(event, id)
	{
		var o = program.list[id];

		// If the window not maximized
		if(
			!o.isMovment &&
			!o.isMaximize
		)
		{
			// Set new selection
			program.setSelection(id);

			// Set global movment variable
			program.isMovment = id;

			// Set is movment to true
			o.isMovment = true;

			// Set start momvment variable
			o.moveStartClient = {
				x: event.clientX,
				y: event.clientY
			}

			// Set start momvment variable
			o.moveStartObj = {
				x: o.layer.offsetLeft,
				y: o.layer.offsetTop,
				w: o.layer.offsetWidth,
				h: o.layer.offsetHeight
			}
		}
	}


	/**
	 *	Move window movment
	 */
	function moveWindowMovment(event)
	{
		var id = program.isMovment;

		// Check if this on movment
		if(
			id &&
			program.list[id] &&
			program.list[id].isMovment
		)
		{
			var o 				= program.list[id],
				startMove 		= o.moveStart,
				moveDistanceX	= event.clientX - o.moveStartClient.x,
				moveDistanceY	= event.clientY - o.moveStartClient.y,
				moveStartX 		= o.moveStartObj.x,
				moveStartY 		= o.moveStartObj.y;

			var left 	= moveStartX + moveDistanceX,
				top 	= moveStartY + moveDistanceY,
				width 	= o.moveStartObj.w,
				height 	= o.moveStartObj.h;

			// Check is the window outside from the browser x
			if(left < 0)
			{
				setWindowPosition(0, null, o.layer);
			}
			else if(window.innerWidth < left + width)
			{
				setWindowPosition(window.innerWidth - width, null, o.layer);
			}
			else
			{
				setWindowPosition(o.moveStartObj.x + moveDistanceX, null, o.layer);
			}

			// Check is the window outside from the browser y
			if(top < 0)
			{
				setWindowPosition(null, 0, o.layer);
			}
			else if(window.innerHeight < top + height)
			{
				setWindowPosition(null, window.innerHeight - height, o.layer);
			}
			else
			{
				setWindowPosition(null, o.moveStartObj.y + moveDistanceY, o.layer);
			}
		}
	}


	/**
	 *	Stop window movment
	 */
	function stopWindowMovment(event)
	{
		var id = program.isMovment;

		// Check if this on movment
		if(
			id &&
			program.list[id] &&
			program.list[id].isMovment
		)
		{
			var o = program.list[id];

			// Reset object variable
			o.isMovment = false;

			// Reset globale variable
			program.isMovment = false;
		}
	}


	/**
	 *	Start the resize window
	 */
	function startWindowResize(event, id, type)
	{
		var o = program.list[id];

		// If the window not maximized
		if(
			!o.isResize &&
			!o.isMaximize
		)
		{
			// Set new selection
			program.setSelection(id);

			// Set global movment variable
			program.isResize = id;

			// Set is movment to true
			o.isResize = true;
			o.resizeType = type;

			// Set start momvment variable
			o.moveStart = {
				x: event.clientX,
				y: event.clientY,
				w: o.layer.offsetWidth,
				h: o.layer.offsetHeight
			}
		}
	}


	/**
	 *	Move resize window
	 */
	function moveWindowResize(event)
	{
		var id = program.isResize;

		if(
			id &&
			program.list[id] &&
			program.list[id].isResize
		)
		{
			var o = program.list[id],
				type = o.resizeType,
				moveDistanceX = event.clientX - o.moveStart.x,
				moveDistanceY = event.clientY - o.moveStart.y;

			var moveStartX = o.moveStart.x,
				moveStartY = o.moveStart.y,
				moveStartW = o.moveStart.w,
				moveStartH = o.moveStart.h,
				width = (moveStartX + moveDistanceX + moveStartW - moveDistanceX) - (moveStartX + moveDistanceX),
				height = (moveStartY + moveDistanceY + moveStartH - moveDistanceY) - (moveStartY + moveDistanceY);

			switch(type)
			{
				case 'top':
					setWindowPosition(null, moveStartY + moveDistanceY, o.layer);
					setWindowSize(null, moveStartH - moveDistanceY, o.layer);
					break;

				case 'rightTop':
					setWindowSize(moveStartW + moveDistanceX, null, o.layer);

					if(height > 100)
					{
						setWindowPosition(null, moveStartY + moveDistanceY, o.layer);
						setWindowSize(null, moveStartH - moveDistanceY, o.layer);
					}

					break;

				case 'left':
					setWindowPosition(moveStartX + moveDistanceX, null, o.layer);
					setWindowSize(moveStartW - moveDistanceX, null, o.layer);
					break;

				case 'rightBottom':
					setWindowSize(moveStartW + moveDistanceX, null, o.layer);

					if(height > 100)
					{
						setWindowSize(null, moveStartH + moveDistanceY, o.layer);
					}

					break;

				case 'right':
					setWindowSize(moveStartW + moveDistanceX, null, o.layer);
					break;

				case 'leftBottom':
					setWindowSize(null, moveStartH + moveDistanceY, o.layer);

					if(width > 180)
					{
						setWindowPosition(moveStartX + moveDistanceX, null, o.layer);
						setWindowSize(moveStartW - moveDistanceX, null, o.layer);
					}
					break;

				case 'bottom':
					setWindowSize(null, moveStartH + moveDistanceY, o.layer);
					break;

				case 'leftTop':
					if(width > 180)
					{
						setWindowPosition(moveStartX + moveDistanceX, null, o.layer);
						setWindowSize(moveStartW - moveDistanceX, null, o.layer);
					}

					if(height > 100)
					{
						setWindowPosition(null, moveStartY + moveDistanceY, o.layer);
						setWindowSize(null, moveStartH - moveDistanceY, o.layer);
					}

					break;
			}

			// Run all resize functions
			if(o.pushResizeArray)
			{
				for(var i = 0; i < o.pushResizeArray.length; i++)
				{
					o.pushResizeArray[i]();
				}
			}
		}
	}


	/**
	 *	End resize window
	 */
	function stopWindowResize(event)
	{
		var id = program.isResize;

		if(
			id &&
			program.list[id] &&
			program.list[id].isResize
		)
		{
			var o = program.list[id];

			// Set global movment variable
			program.isResize = false;

			// Set is movment to true
			o.isResize = false;
		}
	}


	/**
	 *	Set new window position
	 */
	function setWindowPosition(x, y, obj)
	{
		if(x !== null)
		{
			obj.style.left = x + 'px';
		}

		if(y !== null)
		{
			obj.style.top = y + 'px';
		}
	}


	/**
	 *	Set new window size
	 */
	function setWindowSize(x, y, obj)
	{
		if(
			x !== null &&
			x > 180
		)
		{
			obj.style.width = x + 'px';
		}

		if(
			y !== null &&
			y > 100
		)
		{
			obj.style.height = y + 'px';
		}
	}


}).call(this);

var program_terminal_exit = function(o, params)
{
	var windowId = o.progObj.id_counter;

	program.removeWindow(windowId);
};

var program_terminal = function(fullscreen)
{
	// Create global object
	var o = {
		AUTHOR: 'Philipp Heidrich',
		VERSION: 2,
		pressedKeys: []
	};

	// Create window
	o.progObj = program.startWindow('terminal', 'Terminal', fullscreen);

	// Create terminal object
	o.obj = {
		terminal: o.progObj.content,
		ownerArea: o.progObj.content.querySelector('.terminal__ownerArea'),
		inputArea: o.progObj.content.querySelector('.terminal__inputArea'),
		inputField: o.progObj.content.querySelector('.terminal__inputField'),
		input: o.progObj.content.querySelector('.terminal__input'),
		history: o.progObj.content.querySelector('.terminal__history'),
		user: o.progObj.content.querySelector('.terminal__user'),
		placeholder: o.progObj.content.querySelector('.terminal__placeholder')
	}

	// Add events
	addEvent();

	// Add terminal infos
	addTerminalInfo();

	// Add User
	addUserToInput();

	// Set focus
	setFocusToInput();






	/**
	 *
	 *	Private function
	 *
	 */


	/**
	 *	Add events from the program
	 */
	function addEvent()
	{
		// Click event to focus the input field
		o.progObj.content.addEventListener('click', function()
		{
			setFocusToInput();
		});

		// Keypress event
		o.obj.input.addEventListener('keydown', function(event)
		{
			keypressConsole(event);
		});

		// Keypress event
		o.obj.input.addEventListener('keyup', function(event)
		{
			keyupConsole(event);
		});

		// Push resize function
		program.pushResizeFunction(o.progObj.id_counter, function()
		{
			scrollToBottom();
		});

		// Push maximize function
		program.pushMaximizedFunction(o.progObj.id_counter, function()
		{
			scrollToBottom();
		});

		// Push reduce function
		program.pushReduceFunction(o.progObj.id_counter, function()
		{
			scrollToBottom();
		});
	}


	/**
	 *	Add user infos
	 */
	function addUserToInput()
	{
		o.obj.inputField.insertBefore(createOwnerBlock(), o.obj.inputArea);
	}


	/**
	 *	Add terminal info
	 */
	function addTerminalInfo()
	{
		var terminalNote = 'webOS terminal - v.' + o.VERSION + '<br>' +
							'using username "' + class_user.getCurrentUser() + '"<br>' +
							'<br>' +
							'This terminal program is an alpha version. All available commands can you see with "help"';

		printHistory(terminalNote);
	}


	/**
	 *	Set the focus to the input field
	 */
	function setFocusToInput()
	{
		var input = o.obj.input,
			text = getInput();

		input.focus();

		setInput(text);
	}


	/**
	 *	Keypress detection for console inputs
	 */
	function keypressConsole(event)
	{
		var keycode = event.keyCode;

		// Save keypress
		o.pressedKeys[keycode] = true;

		// Key: ENTER
		if(keycode == 13)
		{
			runCode();
			event.preventDefault();
		}

		// Key: CTRL + L
		if(
			o.pressedKeys[17] &&
			keycode == 76
		)
		{
			clearConsole();
			event.preventDefault();
		}

		// Key: CTRL + U
		if(
			o.pressedKeys[17] &&
			keycode == 85
		)
		{
			clearInput();
			event.preventDefault();
		}

		// Key: TAB
		if(keycode == 9)
		{
			tabFiles();
			event.preventDefault();
		}
	}


	/**
	 *	Keyup detection for console inputs
	 */
	function keyupConsole(event)
	{
		var keycode = event.keyCode;

		if(o.pressedKeys[keycode])
		{
			o.pressedKeys[keycode] = false;
		}
	}


	/**
	 *	Run code
	 */
	function runCode()
	{
		var input = o.obj.input,
			commandString = getInput(),
			command = splitCommand(commandString);

		// Print owner
		printOwnerToHisotry();

		// Print command in history
		printHistory(commandString, true);

		if(command.app)
		{
			// Search for a program
			var app = getCommand(command);
			if(app)
			{
				if(app.echo)
				{
					printHistory(app.echo);
				}
				else if(app.run)
				{
					var appReturn = new app.run(o, command.params);

					// Print
					if(appReturn.print)
					{
						printHistory(appReturn.print);
					}
				}
			}

			// No valid app found
			else
			{
				// Print command in history
				printHistory('No application &raquo;' + commandString + '&laquo; found');
			}
		}

		// Clear input field
		clearInput();

		// Scroll to bottom
		scrollToBottom();
	}


	/**
	 *	Print in the history
	 */
	function printHistory(text, printIcon)
	{
		if(
			text ||
			text !== ''
		)
		{
			var history = o.obj.history;

			// Replace placeholders
			text = switchFromPlaceholder(text);

			var li = document.createElement('li');
			li.className = 'terminal__historyLi';
			history.appendChild(li);

			if(printIcon)
			{
				var icon = document.createElement('div');
				icon.className = 'terminal__icon';
				icon.innerHTML = '$';
				li.appendChild(icon);

				var value = document.createElement('div');
				value.className = 'terminal__value';
				value.innerHTML = text;
				li.appendChild(value);
			}
			else
			{
				li.innerHTML = text;
			}
		}
	}


	/**
	 *	Print user to history
	 */
	function printOwnerToHisotry()
	{
		var history = o.obj.history;

		var li = document.createElement('li');
		li.className = 'terminal__historyLi terminal__historyLi--newblock';
		li.appendChild(createOwnerBlock());

		history.appendChild(li);
	}


	/**
	 *	Create owner block
	 */
	function createOwnerBlock()
	{
		var _user = class_user.getCurrentUser(),
			_pc = class_os.getPcName();

		var block = document.createElement('div');
		block.className = 'terminal__ownerArea';

		var user = document.createElement('div');
		user.className = 'terminal__user';
		user.innerHTML = _user + '@' + _pc;
		block.appendChild(user);

		var path = document.createElement('div');
		path.className = 'terminal__path';
		path.innerHTML = class_storage.getCurrentPath();
		block.appendChild(path);

		return block;
	}


	/**
	 *	Get terminal command
	 */
	function getCommand(commandObj)
	{
		var commands = {
			help: {
				echo: 'ls[BR]exit'
			},
			ls: {
				run: program_terminal_ls
			},
			exit: {
				run: program_terminal_exit
			}
		}

		if(commands[commandObj.app])
		{
			return commands[commandObj.app];
		}
		else
		{
			return false;
		}
	}


	/**
	 *	Split the command name
	 */
	function splitCommand(string)
	{
		var _split = string.split(/ /g);

		var command = {
			app: _split.shift()
		}

		for(var _item in _split)
		{
			// If this a param block
			if(_split[_item][0] == '-')
			{
				// Delete the first element
				_split[_item] = _split[_item].replace('-', '');

				// Split the params
				command.params = _split[_item].split('');
			}
		}

		return command;
	}


	/**
	 *	Scroll to bottom
	 */
	function scrollToBottom()
	{
		var _terminal = o.obj.terminal,
			scrollHeight = _terminal.scrollHeight;

		_terminal.scrollTop = scrollHeight;
	}


	/**
	 *	Clear console
	 */
	function clearConsole()
	{
		o.obj.history.innerHTML = '';
	}


	/**
	 *	Clear input
	 */
	function clearInput()
	{
		setInput("");
	}


	/**
	 *	Tab and search for files
	 */
	function tabFiles()
	{
		var currentPath = class_storage.showAll(),
			inputValue = getInput(),
			inputSplit = inputValue.split(/ /g),
			foundThis = [];

		if(
			inputSplit.length &&
			inputSplit[inputSplit.length - 1]
		)
		{
			var seachPattner = inputSplit.pop();

			for(var _name in currentPath)
			{
				var regex = new RegExp("^(" + seachPattner + ')', 'i');

				if(_name.match(regex))
				{
					foundThis.push(_name);
				}
			}

			// Print all found names
			if(foundThis.length)
			{
				// Have found more than one
				if(foundThis.length > 1)
				{
					var returnValue = false,
						matchValue = "",
						lengthMatch = 0;

					// Search for the same beinning content
					var matchCharLenght = 0;

					for(var i = 0; i < 500; i++)
					{
						var _loopChar = false,
							_loopMatchAll = true;

						for(var _string in foundThis)
						{
							if(!_loopChar)
							{
								_loopChar = foundThis[_string][i];
							}
							else
							{
								if(
									foundThis[_string][i] &&
									foundThis[_string][i] == _loopChar
								)
								{

								}
								else {
									_loopMatchAll = false;
									break;
								}
							}
						}

						if(_loopMatchAll)
						{
							matchValue += _loopChar;
							matchCharLenght++;
						}
						else
						{
							break;
						}
					}

					// All founds value have the same beginning content
					if(
						matchCharLenght &&
						matchCharLenght > seachPattner.length
					)
					{
						var regex = new RegExp(seachPattner + '$', 'i');
						setInput(inputValue.replace(regex, matchValue));
					}

					// No match value found
					else {
						// Print owner
						printOwnerToHisotry();

						for(var _item in foundThis)
						{
							if(_item == 0)
							{
								returnValue = foundThis[_item];
							}
							else
							{
								returnValue += ' ' + foundThis[_item];
							}
						}

						// Print to history
						printHistory(returnValue);
					}
				}

				// Have found only one
				else {
					var regex = new RegExp(seachPattner + '$', 'i');
					setInput(inputValue.replace(regex, foundThis[0] + ''));
				}

				scrollToBottom();
			}
		}
	}


	/**
	 *	Get terminal input
	 */
	function getInput()
	{
		return o.obj.input.value;
	}


	/**
	 *	Set terminal input
	 */
	function setInput(insert)
	{
		o.obj.input.value = insert;
	}


	/**
	 *	Switch to terminal placeholders
	 */
	function switchFromPlaceholder(text)
	{
		text = text.replace(/\[BR\]/g, '<br>');

		return text;
	}
};

var program_terminal_ls = function(o, params)
{
	var printDir = false,
		fsDir = class_storage.showAll();

	for(var _item in fsDir)
	{
		if(!printDir)
		{
			printDir = _item;
		}
		else {
			printDir += '[BR]' + _item;
		}
	}

	return {
		print: printDir
	}
};

(function()
{
	this.dynbox = {
		AUTHOR: 'Philipp Heidrich',
		VERSION: 2
	}


	/**
	 *	Initalscript
	 */
	dynbox.init = function(obj)
	{
		this.dynObj_obj = obj;

		// Erstelle Objeckte
		dynbox.createElm(this);

		// Event erstellen
		dynbox.addEvent(this);
	}



	/**
	 *	Objeckte erstellen
	 */
	dynbox.createElm = function(o)
	{
		o.dynObj_obj.setAttribute('spellcheck', 'false');
		o.dynObj_obj.setAttribute('autocomplete', 'off');
		o.dynObj_obj.setAttribute('autocorrect', 'off');
		o.dynObj_obj.setAttribute('autocapitalize', 'off');
		o.dynObj_obj.style.overflowY = 'hidden';

		// Erstelle Pointerbox
		o.dynObj_pointer = document.createElement('div');
		o.dynObj_pointer.className = "dynbox__pointer";
		o.dynObj_pointer.style.top = 0;
		o.dynObj_pointer.style.left = 0;
		o.dynObj_pointer.style.opacity = 0;
		o.dynObj_pointer.style.zIndex = 0;
		o.dynObj_pointer.style.position = 'absolute';
		o.dynObj_obj.parentNode.appendChild(o.dynObj_pointer);
	}


	/**
	 *	Auslesen der Länge der Textarea
	 */
	dynbox.checkBoxLength = function(o)
	{
		var _value = o.dynObj_obj.value;

		// Tausche Zeilenumbrüche aus
		_value = _value.replace(/\n/g, "<br>");

		// Übergebe Inhalt von der Textarea an das Poiter Element
		o.dynObj_pointer.innerHTML = _value;

		// Hole die aktuelle Größe des Elementes
		var _height = o.dynObj_pointer.offsetHeight

		// Speichere Sie auf das neue Element
		o.dynObj_obj.style.minHeight = (_height + 30) + 'px';
	}


	/**
	 *	Event erstellen
	 */
	dynbox.addEvent = function(obj)
	{
		obj.dynObj_obj.addEventListener('keyup', function()
		{
			dynbox.checkBoxLength(obj);
		});
	}

}).call(this);

(function()
{
	this.msg = {
		AUTHOR: 'Philipp Heidrich',
		VERSION: 2
	}


	/**
	 *	Variablen
	 **/
	var defaultOption = {
		content: {
			append: 'body'
		},
		button: [{
			title: 'OK'
		}]
	}

	msg.init = function(option)
	{
		// Merge Optionen it default Werten
		this.option = msg.mergeOptions(option, defaultOption);

		// Baue Gruntgerüst
		this.html = msg.buildLayer(this);

		// Platziere Inhalt
		msg.buildContent(this);

		// Platziere Buttons
		msg.buildButtons(this);

		// Ausgabe
		msg.printMsg(this);

		// Add Event
		addEvents();
	}






	/**
	 *
	 *	Helper Funktionen
	 *
	 **/

	/**
	 *	Merge default Optionen mit User Optionen
	 **/
	msg.mergeOptions = function(origin, defaultObj)
	{
		for(var i in defaultObj)
		{
			if(origin === undefined)
			{
				origin = defaultObj;
			}

			if(typeof defaultObj[i] == 'object')
			{
				origin[i] = msg.mergeOptions(origin[i], defaultObj[i]);
			}
			else if(
				typeof defaultObj[i] == 'string' ||
				typeof defaultObj[i] == 'number'
			)
			{
				if(!origin[i])
				{
					origin[i] = defaultObj[i];
				}
			}
		}

		return origin;
	}


	/**
	 *	Baut das Gruntgerüst
	 **/
	msg.buildLayer = function(msgObj)
	{
		var html = {},
			option = msgObj.option;

		// Prüfe ob es schon eine msg Box gibt
		if(!document.querySelectorAll('.msg').length)
		{
			// Main Layer
			html.layer = document.createElement('div');
			html.layer.className = 'msg';

			// Out Layer
			html.out = document.createElement('div');
			html.out.className = 'msg__out';
			if(option.abort)
			{
				html.out.onclick = option.abort;
			}
			else {
				html.out.onclick = function()
				{
					msg.close();
				}
			}
			html.layer.appendChild(html.out);
		}
		else {
			html.layer 	= document.querySelector('.msg');
			html.out	= html.layer.querySelector('.msg__out');
		}

		// Content
		html.content = document.createElement('div');
		if(option.content.type)
		{
			html.content.className = 'msg__content msg__content--' + option.content.type;
		}
		else {
			html.content.className = 'msg__content';
		}

		html.content.msg = msgObj;
		html.layer.appendChild(html.content);

		html.contentInner = document.createElement('div');
		html.contentInner.className = 'msg__innerContent';
		html.content.appendChild(html.contentInner);

		html.footer = document.createElement('div');
		html.footer.className = 'msg__footer';
		html.content.appendChild(html.footer);

		return html;
	}


	/**
	 *	Baut den Inhalt in das HTML ein
	 **/
	msg.buildContent = function(msgObj)
	{
		var content = msgObj.option.content,
			html = msgObj.html;

		if(content.img)
		{
			var img = document.createElement('img');
			img.className = 'msg__img';
			img.src = content.img;
			html.content.appendChild(img);

			html.contentInner.className += ' msg__innerContent--widthImg';
		}

		if(content.googleIcons)
		{
			var iconBlock = document.createElement('div');
			iconBlock.className = 'msg__googleIcon';
			html.content.appendChild(iconBlock);

			var googleIcon = document.createElement('i');
			googleIcon.className = 'material-icons';
			googleIcon.innerHTML = content.googleIcons;
			iconBlock.appendChild(googleIcon);

			html.contentInner.className += ' msg__innerContent--widthImg';
		}

		if(content.header)
		{
			var h3 = document.createElement('h3');
			h3.className = 'msg__heading';
			h3.innerHTML = content.header;
			html.contentInner.appendChild(h3);
		}

		if(content.txt)
		{
			var pTag = document.createElement('p');
			pTag.innerHTML = content.txt;
			html.contentInner.appendChild(pTag);
		}

		// Füge ein HTML Objeckt ein
		if(
			content.include &&
			document.querySelector(content.include)
		)
		{
			var copyHtml = document.querySelector(content.include).cloneNode(true);
			html.contentInner.appendChild(copyHtml);
		}
	}


	/**
	 *	Baut die gewünschten Buttons ein
	 **/
	msg.buildButtons = function(msgObj)
	{
		var button = msgObj.option.button,
			html = msgObj.html;

		if(
			button &&
			button.length
		)
		{
			for(var i = 0; i < button.length; i++)
			{
				var _option = button[i];

				var _btn = document.createElement('div');
				_btn.innerHTML = _option.title;
				_btn.className = 'msg__btn';


				if(_option.click)
				{
					_btn.onclick = _option.click;
				}
				else {
					_btn.onclick = function()
					{
						msg.close(msgObj);
					}
				}

				if(_option.float)
				{
					_btn.className += ' msg__btn--' + _option.float;
				}

				// type
				// none 				- inherit
				// msg__btn--noBtn
				if(_option.type)
				{
					_btn.className += ' msg__btn--' + _option.type;
				}



				html.footer.appendChild(_btn);
			}

			var clearEl = document.createElement('div');
			clearEl.className = 'clear';
			html.footer.appendChild(clearEl);
		}
	}



	/**
	 *	Schließt die Box
	 **/
	msg.close = function(msgObj, cb)
	{
		var html 			= (msgObj) ? msgObj.html : (document.querySelector('.msg .msg__content--focus')) ? document.querySelector('.msg .msg__content--focus').msg.html : false,
			allOpenmsg 	= document.querySelectorAll('.msg .msg__content--start');

		if(html)
		{
			if(allOpenmsg.length == 1)
			{
				html.out.className += ' msg__out--close';
			}

			html.content.className += ' msg__content--close';

			(function(_html)
			{
				var html = _html;

				setTimeout(function()
				{
					var allOpenmsg = document.querySelectorAll('.msg .msg__content--start');

					if(allOpenmsg.length == 1)
					{
						html.layer.parentNode.removeChild(html.layer);
					}
					// Es exestieren noch weitere msg Objeckte
					else {
						html.content.parentNode.removeChild(html.content);

						// Neuen Focus setzten
						if(allOpenmsg[allOpenmsg.length - 2])
							allOpenmsg[allOpenmsg.length - 2].className += ' msg__content--focus';
					}

					if(cb)
					{
						cb();
					}

				}, 500);
			}).call(this, html);
		}
	}



	/**
	 *	Ausgabe auf dem Dokument
	 **/
	msg.printMsg = function(msgObj)
	{
		var content = msgObj.option.content,
			html = msgObj.html;

		// Focus von bestehenden msg Objeckten nehmen
		var allmsg = document.querySelectorAll('.msg .msg__content');
		for(var i = 0; i < allmsg.length; i++)
		{
			if(allmsg[i].className.match('msg__content--focus'))
				allmsg[i].className = allmsg[i].className.replace(/ msg__content--focus/, '');
		}

		// Erstellt HTML
		document.querySelector(content.append).appendChild(html.layer);

		setTimeout(function()
		{
			if(!allmsg.length)
			{
				html.out.className += ' msg__out--start';
			}

			html.content.className += ' msg__content--start msg__content--focus';


			// Prüfen ob ein Callbacka ausgegeben werden soll
			if(msgObj.option.callback)
			{
				msgObj.option.callback(msgObj);
			}
		}, 100);
	}


	/**
	 *	Keypress close event
	 */
	function keypresCloseMsg(event)
 	{
 		// Press [Enter]
 		if(event.keyCode == 13)
 		{
 			// Close msg box
 			msg.close();

 			// Stoppe default event
 			event.preventDefault();

 			removeEvents();
 		}
 	}


	/**
	 *	Add events
	 */
	function addEvents()
	{
		window.addEventListener('keypress', keypresCloseMsg);
	}


	/**
	 *	Remove events
	 */
	function removeEvents()
	{
		// Remove event listener
		window.removeEventListener('keypress', keypresCloseMsg, false);
	}


})(this);






///// TESTS
window.addEventListener('load', function()
{
	// new msg.init({
	// 	content: {
	// 		// type: 'warning',
	// 		// class: 'small',
	// 		// include: '#hiddenFields #btcAddress',
	// 		// img: "https://www.wall-art.de/out/wallart-dm/img/logos/wall-art-logo-shop-id-1.svg",
	// 		// googleIcons: 'verified_user',
	// 		// txt: "Baum im Wind",
	// 		// header: "Überschrift"
	// 	},
	// 	abort: rateus.rateLater,
	// 	callback: function()
	// 	{
	// 		alert();
	// 	}
	// 	// button: false
	// 	button: [
	// 		{
	// 			title: 'Ok',
	// 			click: function()
	// 			{
	// 				alert();
	// 				msg.close();
	// 			}
	// 		}
	// 	]
	// });
});

(function()
{
	this.option = {
		AUTHOR: 'Philipp Heidrich'
	}

	option.globalParam = "wos";


	/**
	 *	Hole default Wert
	 */
	option.getDefault = function(lsItem)
	{
		var defaultItem = null;

		switch(lsItem)
		{
			// User
			case option.globalParam + '_account_status':
				defaultItem = 'pwd';
				break;

			// Users
			case option.globalParam + '_account_users':
				defaultItem = {};
				break

			// Filesystem
			case option.globalParam + '_storage_filesys':
				defaultItem = {
					"home": {
						"type": "dir",
						"dir": {
							"admin": {
								"type": "dir"
							}
						}
					},
					"var": {
						"type": "dir"
					}
				};
		}

		// Gebe default Wert zurück
		return defaultItem;
	}

	// Funktion für das laden von Optionen
	option.load = function(item)
	{
		var defaultItem = null,
			lsItem 		= option.globalParam + '_' + item;

		// Versuche Objeckt aus dem LS zu holen
		var returnValue = localStorage.getItem(lsItem);

		if(returnValue)
		{
			returnValue = JSON.parse(returnValue);
		}
		else
		{
			var defaultItem = option.getDefault(lsItem);

			// Speichere neuen Wert in den LS
			// wenn es einen Defaultwert gibt
			if(defaultItem !== null)
			{
				option.save(item, defaultItem);

				// Übernehme default Wert
				returnValue = defaultItem;
			}
		}

		return returnValue;
	}

	// Funktion für das Speichern von Optionen
	option.save = function(type, value)
	{
		try
		{
			var saveJSON = JSON.stringify(value);
		}
		catch(error)
		{
			var saveJSON = option.getDefault(type);
		}

		localStorage.setItem(option.globalParam + '_' + type, saveJSON);
	}

	/**
	 *	Füge Option mit ein
	 **/
	option.insert = function(_id, inputObj)
	{
		// Lade Option
		var _option = option.load(_id);

		// Prüfe was es für ein Element ist
		if(Array.isArray(_option))
		{
			if(Array.isArray(inputObj))
			{
				_option.concat(inputObj);
			}
			else {
				_option.push(inputObj);
			}
		}
		else if(typeof _option == 'object')
		{
			for(var _item in inputObj)
			{
				_option[_item] = inputObj[_item];
			}
		}
		else if(typeof _option == 'string')
		{
			_option = _option + inputObj;
		}

		// Speichern
		option.save(_id, _option);

		// Rückgabe vom Objeckt
		return _option;
	}



	// Exportiert Einstellungen
	option.export = function()
	{
		return JSON.stringify(localStorage);
	}

	// Importiert Einstellungen
	option.import = function(option)
	{
		var importObj = JSON.parse(option);

		for(var _obj in importObj)
		{
			// Prüfen ob es eine Calm Einstellung ist
			if(_obj.match(option.globalParam))
			{
				localStorage.setItem(_obj, importObj[_obj]);
			}
		}
	}

}).call(this);

//# sourceMappingURL=app.js.map