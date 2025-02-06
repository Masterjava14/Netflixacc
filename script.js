<script>

document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the input values
    const productName = document.getElementById('productName').value;
    const expiryDate = document.getElementById('expiryDate').value;

    // Add the product to the table
    addProductToTable(productName, expiryDate);

    // Clear the form fields
    document.getElementById('productName').value = '';
    document.getElementById('expiryDate').value = '';
});

// Add product to the table
function addProductToTable(name, expiry) {
    const table = document.getElementById('productTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    // Insert cells
    const nameCell = newRow.insertCell(0);
    const expiryCell = newRow.insertCell(1);
    const statusCell = newRow.insertCell(2);

    // Set cell values
    nameCell.textContent = name;
    expiryCell.textContent = expiry;
    statusCell.textContent = getStatus(expiry);
}

// Determine the expiration status
function getStatus(expiryDate) {
    const today = new Date();
    const expiry = new Date(expiryDate);
    if (expiry < today) {
        return "Expired";
    } else if (expiry - today <= 7 * 24 * 60 * 60 * 1000) {
        return "Expiring soon";
    } else {
        return "Valid";
    }
}

// Export table to Excel
document.getElementById('exportBtn').addEventListener('click', function() {
    const table = document.getElementById('productTable');
    const workbook = XLSX.utils.table_to_book(table, {sheet: 'Products'});
    XLSX.writeFile(workbook, 'products_expiration.xlsx');
});

</script>
