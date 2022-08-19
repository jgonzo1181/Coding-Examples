"use scrict";

// input variables
startingAge     = 0;
retirementAge   = 0;
startingSalary  = 0;
annualSavings   = 0;
annualRaise     = 0;
interestRate    = 0;

// summary variable
yearsToInvest   = 0;

// function to clear tables so that table does not add more at
// bottom when the make me rich button is pressed multiple times
function clearResultsTable(table) {
	for (var i = table.rows.length; i > 1; i--) {
		table.deleteRow(i-1);
	}
}

// function to get tables 
function initialize() {
	// alert("In initialize(): Web App Loaded!");
	detailedTable   = document.getElementById('detailedTable');
	summaryTable    = document.getElementsByClassName('nums'); 

	console.log(sparkyResultsTable);
}

// function to clear input fields
function clearInputs(form) {
    var formElements = form.elements;
    for (var i=0; i < formElements.length; i++){
        formElements[i].value = "";
    }
}

// function to load defaults
function loadDefaults(form) {
    form.reset();
}

// function to get values from input field
function getNumValue(id) {
	return Number(document.getElementById(id).value);
}

// function to MAKE ME RICH!
function makeMeRich(form) {
    if (!form.checkValidity()) {
        // letting user know they need to fix errors in the input fields
        alert("There are input Errors. Fix and run again!")
    } else {
        // setting input variables
        startingAge     = getNumValue("startingAge");
        retirementAge   = getNumValue("retirementAge");
        startingSalary  = getNumValue("startingSalary");
        annualSavings   = getNumValue("annualSavings");
        annualRaise     = getNumValue("annualRaise");
        interestRate    = getNumValue("interestRate");

        // printing out input variables to the console
        console.log("Values Entered");
        console.log(" Starting Age      :", startingAge);
        console.log(" Retirement Age    :", retirementAge);
        console.log(" Starting Salary   :", startingSalary);
        console.log(" Annual Savings    :", annualSavings);
        console.log(" Annual Raise      :", annualRaise);
        console.log(" Interest Rate     :", interestRate);

        // calculating years to invest and setting current age
        yearsToInvest = retirementAge - startingAge;

        // declaring current variables for the detailed table
        currentAge          = 0;
        currentSalary       = 0;
        currentSavings      = 0;
        currentInterest     = 0;
        currentRetirement   = 0;

        // summary output variables
        retirementFund  = 0;
        lifetimeSalary  = 0;
        totalSaved      = 0;
        earnedInterest  = 0;

        console.log("Age  Salary  Savings  Interest  Retirement");
        
        var tableRowNumber = 1;

        // calling function to clear table so that if the user presses the
        // make me rich button again, the table will not add more at the bottom
        clearResultsTable(detailedTable);

        for (let year = startingAge; year <= retirementAge; year++) {

            // doing caluclations for current values
            currentSalary = startingSalary += (currentSalary * annualRaise/100);

            currentSavings = currentSalary * (annualSavings/100);

            currentInterest = currentInterest + (currentSavings * (interestRate/100)) + (currentInterest * (interestRate/100));

            currentRetirement = currentSavings + currentInterest + currentRetirement;
            
            currentAge = year;
        
            // adding values and creating totals for each variable 
            retirementFund += currentSavings + currentInterest;
            lifetimeSalary += currentSalary;
            totalSaved += currentSavings;
            earnedInterest	+= currentInterest;
            
            // printing table in log just in case I need to debug
            console.log(
				leftPadString(currentAge.toString(), ' ', 2)
				+ leftPadString(formatNumberWithCommas(currentSalary),  ' ', 8)
				+ leftPadString(formatNumberWithCommas(currentSavings),' ',10)
				+ leftPadString(formatNumberWithCommas(currentInterest), ' ',11)
                + leftPadString(formatNumberWithCommas(currentRetirement), ' ',11)
			);

            // adding rows to the detailed table 
            var row = detailedTable.insertRow(tableRowNumber);
            var cell0 = row.insertCell(0);
			var cell1 = row.insertCell(1);
			var cell2 = row.insertCell(2);
            var cell3 = row.insertCell(3);
            var cell4 = row.insertCell(4);

            // providing the current variables to be displayed in the detailed table
            cell0.innerHTML = formatNumberWithCommas(currentAge);
            cell1.innerHTML = formatNumberWithCommas(currentSalary);
            cell2.innerHTML = formatNumberWithCommas(currentSavings);
            cell3.innerHTML = formatNumberWithCommas(currentInterest);
            cell4.innerHTML = formatNumberWithCommas(currentRetirement);

            // increasing table row number as loop continues
            tableRowNumber++;
        }

        // changing the values in the summary table rows to the calculated values
        summaryTable.rows[0].cells[0].innerHTML = formatNumberWithCommas(yearsToInvest);
        summaryTable.rows[1].cells[0].innerHTML = formatNumberWithCommas(retirementFund);
        summaryTable.rows[2].cells[0].innerHTML = formatNumberWithCommas(lifetimeSalary);
        summaryTable.rows[3].cells[0].innerHTML = formatNumberWithCommas(totalSaved);
        summaryTable.rows[4].cells[0].innerHTML = formatNumberWithCommas(earnedInterest);
    }
}

