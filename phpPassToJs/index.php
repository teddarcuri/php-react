<?php
	include("users.php");
 ?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>PHP + React</title>

	<!-- This is janky and weird, but it works fine. :) -->
	<script>
		/*
			As long as we normalize our data structures, the handoff is totally possible.
			Again, this is a quick demo. I am sure with proper brain power thrown at it,
			we could find a really elegant solution to data handoff if an API is not yet an option.

			So far it appears as if json_encode is the best (only?) option for handing off larger data structures.
			http://php.net/manual/en/function.json-encode.php

		*/
		const usersArr = <?php echo json_encode($usersArr); ?>;
		const appTitle = "<?php echo $appTitle; ?>";
	</script>

	<link rel="stylesheet" type="text/css" href="../reset.css">
</head>
<body>

	<!-- Where to Render the React App -->
	<div id="app"></div>

	<script src="js/bundle.js"></script>
</body>
</html>