var dbName = "todo";
var storeName = "tasks";
var db = null;

function openDB() {
	console.log("\n[Open DB]");
	
	var request = indexedDB.open(dbName);
	
	request.onerror = function(e) {
		console.log("Error opening " + dbName);
		console.dir(e);
	};
	
	request.onsuccess = function(e) {
		db = request.result;
		console.log(dbName + " database was successfully created.");
		console.dir(e);
	};
	
	request.onupgradeneeded = function(e) {
		event.target.result.createObjectStore(storeName, {autoIncrement: true});
		console.log(storeName + " was added as an object store.");
	};
}



function deleteDB() {
	console.log("\n[Delete DB]");
	
	if (db) db.close();
	indexedDB.deleteDatabase(dbName);
	
	console.log(dbName + " was deleted.");
}



function insertDB(task) {
	console.log("\n[Insert into DB]");
	openDB();
	cnosole.dir(db);
	
	if (db) {
		
		var taskInput = {
			"task": task.task,
			"complete": task.complete,
			"timestamp": new Date().getTime()
		};
		
		var transaction = db.transaction([dbName], "readwrite");
		var store = transaction.objectStore(storeName);
		var request = store.add(taskInput);
		
		transaction.oncomplete = function(e) {
			console.log("The following was added to " + storeName);
			console.dir(taskInput);
		};
		
		request.onerror = function(e) {
			console.log("Insert Failed:");
			console.dir(e);
		};
		
		db.close();
	}
	else {
		console.log("Error: Open the DB first.");
	}
}



function queryDB() {
	console.log("\n[Query DB]");
	
	if (db) {
		
		var transaction = db.transaction(["flavors"], "readonly");
		var store = transaction.objectStore("flavors");
		var queryInput = document.getElementById("queryInput").value;
		var request = store.get(Number(queryInput));
		
		request.onsuccess = function(e) {
			console.log("Searching for " + queryInput);
			console.dir(e.target.result);
		};
		
		request.onerror = function(e) {
			console.log("Query error:");
			console.dir(e);
		};
	}
	else {
		console.log("Error: Open the DB first.");
	}
}



function getAll(item) {
	console.log("\n[Get All]");
	
	if (db) {
		
		var transaction = db.transaction([storeName], "readonly");
		var store = transaction.objectStore(storeName);
		var cursor = store.openCursor();
		
		cursor.onsuccess = function(e) {
			var results = e.target.result;
			if (results) {
				item.push(results);
				console.log("Key: " + results.key);
				console.dir(results.value);
				results.continue();
			}
		};
	}
	else {
		console.log("Error: Open the DB first.");
	}
}



function deleteFromDB() {
	console.log("\n[Delete from DB]");
	
	if (db) {
		
		var transaction = db.transaction(["flavors"], "readwrite");
		var store = transaction.objectStore("flavors");
		var deleteInput = document.getElementById("deleteInput").value;
		var request = store.delete(Number(deleteInput));
		
		request.onsuccess = function() {
			document.getElementById("deleteInput").value = null;
			console.log(deleteInput + " was deleted.");
		}
	}
	else {
		console.log("Error: Open the DB first.");
	}
}