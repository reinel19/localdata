
var db = Titanium.Database.open("users");
db.execute("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, user TEXT)");

 var data = getRowData();
 
  var tableView = Ti.UI.createTableView({
	data:data,
	editable: false,
	top: 10
});
var win1 = Titanium.UI.createWindow({  
    title:'New Profile',
    backgroundColor: "#434A7F",
    layout: "vertical"
});
var tab1 = Titanium.UI.createTab({  
    title:'New Profile',
    window:win1
});

var win2 = Titanium.UI.createWindow({  
    title:'Data',
    backgroundColor:'#434A7F'
});
var tab2 = Titanium.UI.createTab({  
    title:'Data',
    window:win2
});







//Text Fields
var name = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  color: '#336699',
  top: 35, 
  left: 35,
  width: 250, 
  height: 40,
  hintText: "Name (Required)"
});

var address = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  color: '#336699',
  top: 20, 
  left: 35,
  width: 250, 
  height: 40,
  hintText: "Address (Required)"
});

var phone = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  color: '#336699',
  top: 20, 
  left: 35,
  width: 250, 
  height: 40,
  hintText: "Phone (Required)"
});
//End of Text fields

//button
var aButton = Ti.UI.createView({
	backgroundColor: "#fff",
	top: 20,
	left: 110,
	width: 100,
	height: 25,
	borderRadius: 7
	
});

var text1 = Ti.UI.createLabel({
	text: "SUBMIT",
	font: {fontSize: 12, fontFamily:"helvetica",fontWeight:"bold",},
	textAlign: "center"
});

aButton.add(text1);
//End of button
aButton.addEventListener('click', function(e) {
	if(name.value == "" && address.value == ""){
		alert("required field missing");
	} else if( phone.value == "" && name.value == ""){
		alert("required field missing");
	}else if (name.value == ""){
		alert("required field missing");
	}else if (address.value == "" && phone.value == ""){
		alert("required field missing");
	}else if (address.value == ""){
		alert("required field missing");
	}else if (phone.value == ""){
		alert("require field missing");
	}else{
		var userInput = {};
			userInput.name = name.value;
			userInput.address = address.value;
			userInput.phone = phone.value;
		
		var saveData = escape(JSON.stringify(userInput));
		
		db.execute("INSERT INTO users (user) VALUES(?)", saveData);
		// clear input
		name.value = "";
		address.value = "";
		phone.value = "";
		// drop keyboard
		name.blur();
		address.blur();
		phone.blur();
		
		data = getRowData();
		tableView.setData(data);
		
		alert(saveData + " has been saved!");
		
	}
});
//end of abutton

// edit 
var editWindow = Ti.UI.createWindow({
	title: "this is a test",
	backgroudColor: "#fff",
	layout: "vertical"
});

var editname = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  color: '#336699',
  top: 20, 
  left: 35,
  width: 250, 
  height: 40,
  hintText: "Name (Required)"
});

var editaddress = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  color: '#336699',
  top: 20, 
  left: 35,
  width: 250, 
  height: 40,
  hintText: "Address (Required)"
});

var editphone = Ti.UI.createTextField({
  borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
  color: '#336699',
  top: 20, 
  left: 35,
  width: 250, 
  height: 40,
  hintText: "Phone (Required)"
});

var saveButton = Ti.UI.createButton({
	title: "Save",
	height: 100,
	width: 25
});

var cancelButton = Ti.UI.createButton({
	title: "Cancel",
	height: 100,
	width: 25
});

editWindow.add(editname);
editWindow.add(editaddress);
editWindow.add(editphone);
editWindow.add(saveButton);
editWindow.add(cancelButton);

var opts = {
	cancel: 2,
	options: ["Edit", "Delete", "Cancel"],
	selectedIndex: 2,
	destrcutive: 1,
	title: "Edit or Delete row?"
};

tableView.addEventListener("click", function(e){
	var id = e.rowData.id;
	var name = e.rowData.name;
	var address = e.rowData.address;
	var phone = e.rowData.phone;
	
	var dialog = Ti.UI.createOptionDialog(opts);
	
	dialog.addEventListener("click", function(e){
		if(e.index === 0) {
			
			editname.value = name;
			editaddress.value = address;
			editphone.value = phone;
			
			editWindow.open();
			
			var saveMagic = function(){
				if(name.value == "" && address.value == ""){
			alert("required field missing");
				} else if( phone.value == "" && name.value == ""){
			alert("required field missing");
				}else if (name.value == ""){
			alert("required field missing");
				}else if (address.value == "" && phone.value == ""){
			alert("required field missing");
				}else if (address.value == ""){
			alert("required field missing");
				}else if (phone.value == ""){
			alert("require field missing");
				}else{
					
		var userInput = {};
			userInput.name = name.value;
			userInput.address = address.value;
			userInput.phone = phone.value;
		
		var saveData = escape(JSON.stringify(userInput));
		
		db.execute("INSERT INTO users (user) VALUES(?)", saveData);
		// clear input
		name.value = "";
		address.value = "";
		phone.value = "";
		// drop keyboard
		name.blur();
		address.blur();
		phone.blur();
		
		data = getRowData();
		tableView.setData(data);
		
		saveButton.removeEventListener("click", saveMagic);
		editWindow.close();
		alert("Row Updated");
		}
	};
	saveButton.addEventListener("click", saveMagic);
	

	var cancelMagic = function(){
		cancelButton.removeEventListener("click", canelMagic);
		editWindow.close();
	};
	cancelButton.addEventListener("click", cancelMagic);
	
	editWindow.open();
}else if(e.index === 1){
	db.execute("DELETE FROM users WHERE id=?", id);
	
	data = getRowData();
	tableView.setData(data);
	
	alert("Row Deleted!");
}
	});
	dialog.show();
});

function getRowData(){
	var newData = [];
	var rows = db.execute("SELECT * FROM users");
	while (rows.isValidRow()){
		var parsedData = unescape(rows.fieldByName("user"));
		var displayData = JSON.parse(parsedData);
		
		newData.push({
			title: displayData.name + " " + displayData.address + " " + displayData.phone,
			name: displayData.name,
			address: displayData.address,
			phone: displayData.phone,
			id: rows.fieldByName("id")
		});
		rows.next();
	}
	
	return newData;
};
tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  
win1.add(name);
win1.add(address);
win1.add(phone);
win1.add(aButton);
win2.add(tableView);
//exports.tableView = tableView;


