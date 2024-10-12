document.getElementById('registration-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = new Date(document.getElementById('dob').value);
    const termsAccepted = document.getElementById('terms').checked;

    // Age validation
    const age = new Date().getFullYear() - dob.getFullYear();
    if (age < 18 || age > 55) {
        alert('You must be between 18 and 55 years old.');
        return;
    }

    // Save to local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ name, email, password, dob: dob.toISOString(), termsAccepted });
    localStorage.setItem('users', JSON.stringify(users));

    // Update the table
    updateTable();
});

function updateTable() {
    const userTable = document.getElementById('user-table');
    userTable.innerHTML = ''; // Clear existing rows

    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${new Date(user.dob).toLocaleDateString()}</td>
            <td>${user.termsAccepted}</td>
        `;
        userTable.appendChild(row);
    });
}

// Load existing users on page load
window.onload = updateTable;