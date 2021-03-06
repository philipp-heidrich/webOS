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
