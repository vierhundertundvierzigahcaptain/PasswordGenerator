function generatePassword() {
    let charset = "";
    let password = "";
    let passwordLength = document.getElementById("passwordLength").value;
    let addLowercase = document.getElementById("addLowercase");
    let addUppercase = document.getElementById("addUppercase");
    let addNumbers = document.getElementById("addNumbers");
    let addSymbols = document.getElementById("addSymbols");
    let paragraph = document.getElementById("passwordResult");

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

    for (let i = 0; i < passwordLength; i++) {
        let randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }

    paragraph.textContent = password;

    timeToCrack(charset, passwordLength);
}

function timeToCrack(charset, passwordLength) {
    let charsetLength = charset.length;
    let paragraph = document.getElementById("timeToCrack");
    let unit = "sec";

    // ryzen 5 5600x - like a most popular CPU
    let cpuCombinationsPerSec = 15750000;

    // time in seconds
    let time = (charsetLength ** passwordLength) / cpuCombinationsPerSec;

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
        paragraph.textContent = "inf";
        return;
    }

    time = time.toFixed(2);

    paragraph.textContent = time + " " + unit;
}

function copyToClipboard() {
    let password = document.getElementById("passwordResult").innerText;
    navigator.clipboard.writeText(password);
}
