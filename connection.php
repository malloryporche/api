<?php

$GLOBALS['dbReference'] = NULL;
$GLOBALS['debug'] = false;

//Connect to database
function DBConnect()
{
	//Login credentials for MySQL Server
	$dbhost = "animadigitalmarketing.com";
	$dbuser =  "upuonyrbgq3yz";
	$dbpass = ")45`@GvG1%1$";
	$db = "dbd8zlqtt8c3fg";

	//Create connection
	$connection = mysqli_connect($dbhost, $dbuser, $dbpass, $db);

	if($connection)
	{
		//Store connection as a global variable
		$GLOBALS['dbReference'] = $connection;
		echo '$connection';
	} else 
	{
		//Unset global variable if connection attempt fails
		echo "SQL Error: ".mysqli_connect_errno() . PHP_EOL;
		unset($GLOBALS['dbReference']);
	}

	//Return database connection
	return isset($GLOBALS['dbReference']);
}

//Close server
function DBClose()
{
	//If connected, close and unset global variable
	if(isset($GLOBALS['dbReference'])) {
		mysqli_close($connection);
		unset($GLOBALS['dbReference']);
	}
}

function DBConnected()
{
	//Return true if connected to the database
	return (isset($GLOBALS['dbReference']));
}

//Run MySQL query
function SQL($query) 
{
	//Ensure connection
	if (!DBConnected()) {
		DBConnect();
	}

	//Run a query and return the results
	if(DBConnected()) 
	{
		//Prevent SQL injection and run it
		

		//Escape string
		$query = mysqli_real_escape_string($GLOBALS['dbReference'], $query);

		//Execute query on server
		$result = mysqli_query($GLOBALS['dbReference'], $query);


		//Return result
		return ($result != NULL) ? $result: NULL;
	}
	
	//Close connection
	DBClose();
}


function SQLStoredProc($call) 
{
	if(!DBConnected()) 
	{
		DBConnect();
	}

	//Call a stored procedure and return the results
	if(DBConnected()) 
	{
		//Execute procedure and return the results
		$success = mysqli_multi_query($GLOBALS['dbReference'], "CALL $call(params)");

		if($success) 
		{
			$result_set = mysqli_store_result($GLOBALS['dbReference']);

			//Return results
			if (mysqli_num_rows($result_set) > 0) {
				return $result_set;
			}
		}
		else
		{
			// //Display errors in debug mode
			Debug;
			echo 'MySQL Error', mysqli_error($GLOBALS['dbReference']);
		}
		
		//Close connection
		DBClose();
	}
}
?>