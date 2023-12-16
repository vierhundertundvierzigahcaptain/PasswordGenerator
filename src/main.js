function generatePassword() {
    var charset = "";
    var password = "";
    var passwordLength = document.getElementById("passwordLength").value;
    var addLowercase = document.getElementById("addLowercase");
    var addUppercase = document.getElementById("addUppercase");
    var addNumbers = document.getElementById("addNumbers");
    var addSymbols = document.getElementById("addSymbols");
    var paragraph = document.getElementById("passwordResult");

    if (addLowercase.checked) {
        charset += "abcdefghijklmnopqrstuvwxyz";
    }

    if (addUppercase.checked) {
        charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }

    if (addNumbers.checked) {
        charset += "1234567890";
    }

    if (addSymbols.checked) {
        charset += "!@#$%^&*()_+{}|:<>?~";
    }

    if (charset == "") {
        paragraph.textContent = "Select at least one checkbox!";
        return;
    }

    for (var i = 0; i < passwordLength; i++) {
        var randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }

    paragraph.textContent = password;

    timeToCrack(charset, passwordLength)
}

function timeToCrack(charset, passwordLength) {
    var charsetLength = charset.length;
    var paragraph = document.getElementById("timeToCrack");
    var unit = "sec"

    // ryzen 5 5600x - like a most popular CPU
    var cpuCombinationsPerSec = 15750000

    // time in seconds
    var time = (charsetLength ** passwordLength) / cpuCombinationsPerSec

    if (time > 60) {
        const conversions = [
            [60, 'min'],
            [60, 'hours'],
            [24, 'days'],
            [30, 'months'],
            [12, 'years'],
            [1000000, 'million years'],
            [1000, 'billion years']
        ];

        for (let i = 0; i < conversions.length; i++) {
            if (time >= conversions[i][0]) {
                time /= conversions[i][0];
                unit = conversions[i][1];
            } else {
                break;
            }
        }
    }

    if (time >= 1000 && unit == "billion years") {
        paragraph.textContent = "inf"
        return
    }

    time = time.toFixed(2)

    paragraph.textContent = time + " " + unit;
}

function copyToClipboard() {
    var password = document.getElementById("passwordResult").innerText;
    navigator.clipboard.writeText(password);
}
