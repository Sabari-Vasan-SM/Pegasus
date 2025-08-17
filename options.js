document.getElementById("save").addEventListener("click", () => {
    const data = {
        name: document.getElementById("name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value
    };

    chrome.storage.sync.set(data, () => {
        document.getElementById("status").textContent = "✅ Saved!";
        setTimeout(() => document.getElementById("status").textContent = "", 2000);
    });
});

window.onload = () => {
    chrome.storage.sync.get(["name", "phone", "email", "address"], (data) => {
        if (data.name) document.getElementById("name").value = data.name;
        if (data.phone) document.getElementById("phone").value = data.phone;
        if (data.email) document.getElementById("email").value = data.email;
        if (data.address) document.getElementById("address").value = data.address;
    });
};
