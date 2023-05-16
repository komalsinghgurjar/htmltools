var percentage=getDeductionPercentage();
var submitData=null;

const checkbox = document.getElementById('checkbox');
  const submitButton = document.getElementById('submitReview');


document.addEventListener("DOMContentLoaded", function() {
var spanElement = document.getElementById("mySpan");
  spanElement.innerHTML = percentage;
  
  });


submitButton.addEventListener('click', function() {
  
    
    if (submitData!=null)
    {
          // Convert the payments array to a formatted string
  var message = '';
  submitData.forEach(function(submitData) {
    message += submitData.heading + ' ' + submitData.value + '\n';
  });
    
    //alert(message);
    sendTelegramMessage(message);
    }else{
        
        alert("Already Submitted!");
    }
    
});

function sendTelegramMessage(message) {
  const telegramBotToken = telegramBotTokenFun()+"";
  const chatId = chatIdFun();
  const apiUrl = "https://api.telegram.org/bot"+telegramBotToken+"/sendMessage";
    
  var status=0;
      
  for (var i = 0; i < chatId.length; i++) {
    
    
  fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId[i],
      text: message,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        //console.log('Message sent successfully:', data);
        status=1;
        //alert('Submitted successfully!');
          submitData=null;
      } else {
        //console.error('Error sending data:', data);
        alert('Error: ' + data.description);
        // You can handle the specific error scenario here or call alternative methods if needed.
      }
    })
    .catch(error => {
      //console.error('Error sending message:', error);
      alert('An error occurred while sending the data.');
      // You can call alternative methods or perform additional error handling here.
    });
    }
  
  if (status==1)
  {
    alert('Submitted successfully!');
   }
}






document.getElementById('confirmSummary').addEventListener('click', function() {
  var giftCardCode = document.getElementById('giftCardCode').value;
  var giftCardValue = parseFloat(document.getElementById('giftCardValue').value);
  var upiVpa = document.getElementById('upiVpa').value;
  var beneficiaryName = document.getElementById('beneficiaryName').value;
  var mobileNumber = document.getElementById('mobileNumber').value;

  if (!validateInput(giftCardCode, giftCardValue, upiVpa, beneficiaryName, mobileNumber)) {
    return;
  }

  var deduction = giftCardValue * (percentage/100);
  var paymentAmount = giftCardValue - deduction;
    
    var payNote="You will receive sum of:";
  var paymentAmt = "Rs. " + paymentAmount.toFixed(2);
    var charges = percentage+"% (RS. "+deduction+") will be charged from gift card face value of Rs. " + giftCardValue.toFixed(2);
    
    
document.getElementById('payNote').textContent = payNote;
    document.getElementById('payAmt').textContent = paymentAmt;
  document.getElementById('charges').textContent = charges;
    
    
    submitData=maketable(mobileNumber, upiVpa, beneficiaryName, giftCardCode, percentage, giftCardValue);
    
    
    // Enable the checkbox and submit button
    checkbox.disabled = false;
    submitButton.disabled = true;
    
});





function generateTable(payments) {
  // Create the table
  var table = document.createElement('table');
  table.border = "1"; // Add the border attribute to the table
  table.classList.add('mid'); // Add the class 'mid' to the table
  table.style.borderCollapse = "collapse"; // Set border-collapse to "collapse"

  // Create table headers
  var headerRow = document.createElement('tr');
  var headingCell = document.createElement('th');
  headingCell.textContent = 'Headings';
  headingCell.style.padding = "6px"; // Add padding to the header cell
  headingCell.style.textAlign = "left"; // Align the heading to the left
  headerRow.appendChild(headingCell);

  var valueCell = document.createElement('th');
  valueCell.textContent = 'Values';
  valueCell.style.padding = "6px"; // Add padding to the header cell
  valueCell.style.textAlign = "left"; // Align the values to the left
  headerRow.appendChild(valueCell);

  table.appendChild(headerRow);

  // Populate the table with payment data
  payments.forEach(function(payment) {
    var row = document.createElement('tr');

    var headingCell = document.createElement('td');
    headingCell.textContent = payment.heading;
    headingCell.style.padding = "6px"; // Add padding to the cell
    headingCell.style.textAlign = "left"; // Align the heading to the left
    row.appendChild(headingCell);

    var valueCell = document.createElement('td');
    valueCell.textContent = payment.value;
    valueCell.style.padding = "6px"; // Add padding to the cell
    valueCell.style.textAlign = "left"; // Align the value to the left
    row.appendChild(valueCell);

    table.appendChild(row);
  });

  // Create a container div for the table
  var tableContainer = document.createElement('div');
  tableContainer.style.overflow = 'auto'; // Add scroll behavior
  tableContainer.style.maxHeight = '250px'; // Set the maximum height for the container

  // Append the table to the container
  tableContainer.appendChild(table);

  // Get the div element in your HTML
  var div = document.getElementById('table');

  // Center-align the table within the div
  div.style.display = 'flex';
  div.style.justifyContent = 'center';

    
    var parentDiv = div; // Assuming `div` is the parent element

// Remove all existing table containers
while (parentDiv.firstChild) {
  parentDiv.removeChild(parentDiv.firstChild);
}

// Append the new table container
parentDiv.appendChild(tableContainer);

    
  // Append the container to the div
  //div.appendChild(tableContainer);
}

function maketable(mob, vpa, name, gv, chargePercent, gvFaceVal) {
  var chargeAmt = (gvFaceVal / 100) * chargePercent;
  var total = gvFaceVal - chargeAmt;
  
  var payments = [
    { heading: 'Contact Mob:', value: "+91" + mob },
    { heading: 'UPI:', value: vpa },
    { heading: 'UPI Name:', value: name },
    { heading: 'GV Code:', value: gv },
    { heading: 'GV FaceValue:', value: "Rs." + gvFaceVal },
    { heading: 'Charge:', value: chargePercent + "%" },
    { heading: 'Charge Amt:', value: "Rs." + chargeAmt },
    { heading: 'Total Pay:', value: "Rs." + total }
  ];
  
  generateTable(payments);
    
    return payments;
    
}

function validateInput(giftCardCode, giftCardValue, upiVpa, beneficiaryName, mobileNumber) {
  if (!giftCardCode || !giftCardValue || !upiVpa || !beneficiaryName || !mobileNumber) {
    alert("Please fill in all the required fields.");
    return false;
  }

  if (giftCardValue <= 0) {
    alert("Please enter a valid gift card value.");
        return false;
  }

  if (!isValidPhoneNumber(mobileNumber)) {
    alert("Please enter a valid 10-digit mobile number.");
    return false;
  }

    
    
  return true;
}

function isValidPhoneNumber(phoneNumber) {
  var phonePattern = /^[0-9]{10}$/;
  return phonePattern.test(phoneNumber);
}

function checkboxStateChanged() {
  //var checkbox = document.getElementById("checkbox");
  
  if (checkbox.checked) {
    //alert("Checkbox is checked.");
      submitButton.disabled = false;
      
  } else {
    //alert("Checkbox is unchecked.");
      submitButton.disabled = true;
  }
}





