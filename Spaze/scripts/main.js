function addItem() {
    const tableBody = document.getElementById('invoiceItems');
    const newRow = document.createElement('tr');
    const length = tableBody.rows.length + 1;
    newRow.innerHTML = `
        <td class="tableCell"><label></label>${length}</td>
        <td class="tableCell"><input type="text" placeholder="Item description"></td>
        <td class="tableCell"><input type="text" placeholder="HSN/SAC" value="998328"></td>
        <td class="tableCell">
            <select name="GSTRate">
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="12">12%</option>
                <option value="18" selected>18%</option>
                <option value="28">28%</option>
                <option value="28">40%</option>
            </select>
        
        </td>
        <td class="tableCell"><input type="number" name="Quantity" placeholder="Quantity"></td>
        <td class="tableCell"><input type="number" name="UnitPrice" placeholder="Unit Price"></td>
        <td class="tableCell"><input type="number" name="Taxable" placeholder="Taxable" readonly></td>
        <td class="tableCell"><input type="number" name="CGST" placeholder="CGST" readonly></td>
        <td class="tableCell"><input type="number" name="SGST" placeholder="SGST" readonly></td>
        <td class="tableCell"><input type="number" name="IGST" placeholder="IGST" readonly></td>
        <td class="tableCell"><input type="number" name="Total" placeholder="Total" readonly></td>
        <td><button onclick="removeItem(this.parentNode.parentNode)">-</button></td>
    `;
    tableBody.appendChild(newRow);
}

function calculateTotals() {
    const tableBody = document.getElementById('invoiceItems');
    let grandTotal = 0;
    let totalTaxable = 0;
    let totalCGST = 0;
    let totalSGST = 0;
    let totalIGST = 0;
    Array.from(tableBody.rows).forEach(row => {
        const typeoFsupply = document.getElementById('typeOfSupply').value;
        const quantity = parseFloat(row.querySelector('input[name="Quantity"]').value) || 0;
        const price = parseFloat(row.querySelector('input[name="UnitPrice"]').value) || 0;
        const GST = parseFloat(row.querySelector('select[name="GSTRate"]').value) || 0;
        const cgst = (GST / 2) || 0;
        const sgst = (GST / 2) || 0;
        const igst = GST || 0;
        const total = quantity * price;
        if (typeoFsupply === 'inter-state') {
            row.querySelector('input[name="CGST"]').value = '0.00';
            row.querySelector('input[name="SGST"]').value = '0.00';
            row.querySelector('input[name="IGST"]').value = ((total * igst) / 100).toFixed(2);
        }
        else {
            row.querySelector('input[name="IGST"]').value = '0.00';
            row.querySelector('input[name="CGST"]').value = ((total * cgst) / 100).toFixed(2);
            row.querySelector('input[name="SGST"]').value = ((total * sgst) / 100).toFixed(2);
        }
        row.querySelector('input[name="Taxable"]').value = total.toFixed(2);
        row.querySelector('input[name="Total"]').value = (total + (total * GST) / 100).toFixed(2);
        grandTotal += total * (1 + GST / 100).toFixed(2);
        totalTaxable += total;
        totalCGST += parseFloat(row.querySelector('input[name="CGST"]').value) || 0;
        totalSGST += parseFloat(row.querySelector('input[name="SGST"]').value) || 0;
        totalIGST += parseFloat(row.querySelector('input[name="IGST"]').value) || 0;
    });
    document.getElementById('grandTotal').value = grandTotal.toFixed(2);
    document.getElementById('totalTaxable').value = totalTaxable.toFixed(2);
    document.getElementById('totalCGST').value = totalCGST.toFixed(2);
    document.getElementById('totalSGST').value = totalSGST.toFixed(2);
    document.getElementById('totalIGST').value = totalIGST.toFixed(2);
    document.getElementById('amountInWords').innerText = Wordify(Math.round(grandTotal));
    HSNSummary();
}

function HSNSummary() {
    const tableBody = document.getElementById('invoiceItems');
    const hsnMap = {};
    Array.from(tableBody.rows).forEach(row => {
        const hsn = row.querySelector('input[placeholder="HSN/SAC"]').value || 'Unknown';
        const taxable = parseFloat(row.querySelector('input[name="Taxable"]').value) || 0;
        const cgst = parseFloat(row.querySelector('input[name="CGST"]').value) || 0;
        const sgst = parseFloat(row.querySelector('input[name="SGST"]').value) || 0;
        const igst = parseFloat(row.querySelector('input[name="IGST"]').value) || 0;
        if (!hsnMap[hsn]) {
            hsnMap[hsn] = { taxable: 0, cgst: 0, sgst: 0, igst: 0 };
        }
        hsnMap[hsn].taxable += taxable;
        hsnMap[hsn].cgst += cgst;
        hsnMap[hsn].sgst += sgst;
        hsnMap[hsn].igst += igst;
    });
    const hsnTable = document.getElementById('hsnSummaryBody');
    hsnTable.innerHTML = '';
    for (const hsn in hsnMap) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="tableCell">${hsn}</td>
            <td class="tableCell">${hsnMap[hsn].taxable.toFixed(2)}</td>
            <td class="tableCell">${hsnMap[hsn].cgst.toFixed(2)}</td>
            <td class="tableCell">${hsnMap[hsn].sgst.toFixed(2)}</td>
            <td class="tableCell">${hsnMap[hsn].igst.toFixed(2)}</td>
        `;
        hsnTable.appendChild(row);
    }
}

function removeItem(row) {
    row.parentNode.removeChild(row);
    calculateTotals();
}

function Wordify(amount) {
    const words = [
        "Zero",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "Ten",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen",
        "Twenty",
        "Twenty One",
        "Twenty Two",
        "Twenty Three",
        "Twenty Four",
        "Twenty Five",
        "Twenty Six",
        "Twenty Seven",
        "Twenty Eight",
        "Twenty Nine",
        "Thirty",
        "Thirty One",
        "Thirty Two",
        "Thirty Three",
        "Thirty Four",
        "Thirty Five",
        "Thirty Six",
        "Thirty Seven",
        "Thirty Eight",
        "Thirty Nine",
        "Forty",
        "Forty One",
        "Forty Two",
        "Forty Three",
        "Forty Four",
        "Forty Five",
        "Forty Six",
        "Forty Seven",
        "Forty Eight",
        "Forty Nine",
        "Fifty",
        "Fifty One",
        "Fifty Two",
        "Fifty Three",
        "Fifty Four",
        "Fifty Five",
        "Fifty Six",
        "Fifty Seven",
        "Fifty Eight",
        "Fifty Nine",
        "Sixty",
        "Sixty One",
        "Sixty Two",
        "Sixty Three",
        "Sixty Four",
        "Sixty Five",
        "Sixty Six",
        "Sixty Seven",
        "Sixty Eight",
        "Sixty Nine",
        "Seventy",
        "Seventy One",
        "Seventy Two",
        "Seventy Three",
        "Seventy Four",
        "Seventy Five",
        "Seventy Six",
        "Seventy Seven",
        "Seventy Eight",
        "Seventy Nine",
        "Eighty",
        "Eighty One",
        "Eighty Two",
        "Eighty Three",
        "Eighty Four",
        "Eighty Five",
        "Eighty Six",
        "Eighty Seven",
        "Eighty Eight",
        "Eighty Nine",
        "Ninety",
        "Ninety One",
        "Ninety Two",
        "Ninety Three",
        "Ninety Four",
        "Ninety Five",
        "Ninety Six",
        "Ninety Seven",
        "Ninety Eight",
        "Ninety Nine"
    ]

    const ones = amount % 100;
    const hundreds = Math.floor((amount % 1000) / 100);
    const thousands = Math.floor((amount % 100000) / 1000);
    const lakhs = Math.floor((amount % 10000000) / 100000);
    const crores = Math.floor(amount / 10000000);

    if (amount<99)  {
        return words[amount] + " Only";
    } else if (amount<=999) {
        return words[hundreds] + " Hundred " + (ones>0 ? words[ones]:"") + " Only";
    } else if (amount<=99999) {
        return words[thousands] + " Thousand " + (hundreds>0? (words[hundreds] + " Hundred "):"") + (ones>0 ? words[ones]:"") + " Only";
    } else if (amount<=9999999) {
        return words[lakhs] + " Lakh " + (thousands>0? (words[thousands] + " Thousand "):"") + (hundreds>0? (words[hundreds] + " Hundred "):"") + (ones>0 ? words[ones]:"") + " Only";
    } else if (amount<=999999999) {
        return words[crores] + " Crore " + (lakhs>0? (words[lakhs] + " Lakh "):"") + (thousands>0? (words[thousands] + " Thousand "):"") + (hundreds>0? (words[hundreds] + " Hundred "):"") + (ones>0 ? words[ones]:"") + " Only";
    } else {
        return Wordify(crores).replace(' Only','') + " Crore " + (lakhs>0? (words[lakhs] + " Lakh "):"") + (thousands>0? (words[thousands] + " Thousand "):"") + (hundreds>0? (words[hundreds] + " Hundred "):"") + (ones>0 ? words[ones]:"") + " Only";
    }
}
