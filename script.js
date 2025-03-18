document.addEventListener("DOMContentLoaded", () => {
    const emailInput = document.getElementById("emailInput");
    const counter = document.getElementById("counter");
    const sendButton = document.getElementById("sendButton");
    const statusMessage = document.getElementById("statusMessage");
    const emailStatus = document.getElementById("emailStatus");
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const enButton = document.getElementById("enButton");
    const esButton = document.getElementById("esButton");
    let currentLanguage = "es"; // Устанавливаем испанский язык по умолчанию

    const translations = {
        en: {
            title: "Enter email addresses",
            description: "This form is used to send emails to hotel customers to collect feedback about their experience.",
            placeholder: "Paste email addresses here...",
            counter: "Emails entered: ",
            send: "Send",
            statusTitle: "Sending status",
            sending: "Sending...",
            sent: "Emails sent successfully.",
            error: "Please enter at least one email address."
        },
        es: {
            title: "Ingrese direcciones de correo electrónico",
            description: "Este formulario se utiliza para enviar correos electrónicos a los clientes del hotel para recopilar comentarios sobre su experiencia.",
            placeholder: "Pegue las direcciones de correo electrónico aquí...",
            counter: "Correos electrónicos ingresados: ",
            send: "Enviar",
            statusTitle: "Estado de envío",
            sending: "Enviando...",
            sent: "Correos electrónicos enviados con éxito.",
            error: "Por favor, ingrese al menos una dirección de correo electrónico."
        }
    };

    function updateContent() {
        title.textContent = translations[currentLanguage].title;
        description.textContent = translations[currentLanguage].description;
        emailInput.placeholder = translations[currentLanguage].placeholder;
        counter.textContent = translations[currentLanguage].counter + parseEmails(emailInput.value).length;
        sendButton.textContent = translations[currentLanguage].send;
        document.querySelector("h2").textContent = translations[currentLanguage].statusTitle;
    }

    enButton.addEventListener("click", () => {
        currentLanguage = "en";
        updateContent();
    });

    esButton.addEventListener("click", () => {
        currentLanguage = "es";
        updateContent();
    });

    function parseEmails(input) {
        return input.split(/[\s,;\n]+/).filter(email => email.includes("@"));
    }

    emailInput.addEventListener("input", () => {
        const emails = parseEmails(emailInput.value);
        counter.textContent = translations[currentLanguage].counter + emails.length;
    });

    sendButton.addEventListener("click", () => {
        const emails = parseEmails(emailInput.value);
        if (emails.length === 0) {
            statusMessage.textContent = translations[currentLanguage].error;
            statusMessage.style.color = "red";
            return;
        }

        statusMessage.textContent = translations[currentLanguage].sending;
        statusMessage.style.color = "black";

        setTimeout(() => {
            emailStatus.innerHTML = "";
            emails.forEach(email => {
                let li = document.createElement("li");
                li.textContent = `${email} - Enviado ✔️`;
                emailStatus.appendChild(li);
            });
            statusMessage.textContent = translations[currentLanguage].sent;
            statusMessage.style.color = "green";
        }, 1500);
    });

    updateContent();
});