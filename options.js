const customFieldsContainer = document.getElementById("custom-fields-container");

function createCustomField(field = "", value = "") {
    const fieldId = `custom-${Date.now()}`;
    const div = document.createElement("div");
    div.className = "form-group custom-field";
    div.innerHTML = `
        <input type="text" placeholder="Field Name" value="${field}">
        <input type="text" placeholder="Value" value="${value}">
        <button class="remove-field">-</button>
    `;
    customFieldsContainer.appendChild(div);

    div.querySelector(".remove-field").addEventListener("click", () => {
        div.remove();
    });
}

document.getElementById("add-field").addEventListener("click", () => {
    createCustomField();
});

document.getElementById("save").addEventListener("click", () => {
    const customFields = [];
    document.querySelectorAll(".custom-field").forEach(field => {
        const inputs = field.querySelectorAll("input[type='text']");
        const fieldName = inputs[0].value.trim();
        const fieldValue = inputs[1].value.trim();
        if (fieldName && fieldValue) {
            customFields.push({ field: fieldName, value: fieldValue });
        }
    });

    const data = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        customFields: customFields
    };

    chrome.storage.sync.set(data, () => {
        document.getElementById("status").textContent = "✅ Saved!";
        setTimeout(() => document.getElementById("status").textContent = "", 2000);
    });
});

window.onload = () => {
    chrome.storage.sync.get(["name", "phone", "email", "address", "customFields"], (data) => {
        if (data.name) document.getElementById("name").value = data.name;
        if (data.phone) document.getElementById("phone").value = data.phone;
        if (data.email) document.getElementById("email").value = data.email;
        if (data.address) document.getElementById("address").value = data.address;
        if (data.customFields) {
            data.customFields.forEach(cf => createCustomField(cf.field, cf.value));
        }
    });
};
