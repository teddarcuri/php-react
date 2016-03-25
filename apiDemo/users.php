<?php

	/* 
		Forgive me, for I am no PHP developer and am sure there's a better way to do this.
		But hey, it's just a demo...
	*/

	// User: (name, email)
	class User
	{
		var $name;
		var $email;
		var $description;

		function __construct($name, $email, $description) {
       		$this->name = $name;
       		$this->email = $email;
       		$this->description = $description;
   		} 
	
	}

	// Generate JSON response: (users)
	class UserService
	{
		var $users;
		
		function getValue($arr)
		{
			$users = $arr;
			return json_encode($users);
		}
	}

	// Make sum userz! Woohoo!
	$tedd = new User("Tedd",  "tedd.arcuri@gmail.com", "He is a guy with a face!");
	$gabe = new User("Gabe",  "gabe.hesse@gmail.com", "CTO at Havenly");
	$john = new User("Chris",  "chris@css-tricks.com", "Founder of Codepen.io");
	$travis = new User("Travis", "boatyMcBoatFace@gmail.com", "A dude, with a computer");
	$usersArr = array($tedd, $gabe, $john, $travis);
	
	// JSON Response
	$services = new UserService();
	$val = $services->getValue($usersArr); 
 	echo $val;