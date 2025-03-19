
Чат с Gemini
Надо написать серверную часть приложения на Python Flask, которое принимает имейлы от веб формы, чтобы отправить на получение имейлы шаблон письма с использованием сервиса Brevo
Отлично! Вот пример серверной части приложения на Python Flask, которая принимает email из веб-формы и использует сервис Brevo (Sendinblue) для отправки письма.

Важно: Для использования этого кода вам нужно будет установить библиотеки Flask и requests, а также зарегистрироваться в сервисе Brevo и получить ключ API.

Python
from flask import Flask, request, render_template
import requests
import os

app = Flask(__name__)

# Замените на ваш ключ API от Brevo
BREVO_API_KEY = os.environ.get("BREVO_API_KEY")
if not BREVO_API_KEY:
    print("Ошибка: Не найден ключ API Brevo. Установите переменную окружения BREVO_API_KEY.")
    exit()

# Замените на ID вашего шаблона письма в Brevo
TEMPLATE_ID = 1  # Пример ID, измените на свой

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        email = request.form['email']
        send_email_brevo(email, TEMPLATE_ID)
        return "Письмо успешно отправлено!"
    return render_template('index.html')

def send_email_brevo(recipient_email, template_id):
    """Отправляет письмо через Brevo используя шаблон."""
    url = "https://api.brevo.com/v3/smtp/email"

    headers = {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": BREVO_API_KEY
    }

    payload = {
        "templateId": template_id,
        "to": [{"email": recipient_email}]
        # Дополнительные параметры шаблона можно передать здесь, например:
        # "params": {"name": "Имя пользователя"}
    }

    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 202:
        print(f"Письмо успешно отправлено на адрес: {recipient_email}")
    else:
        print(f"Ошибка при отправке письма: {response.status_code}, {response.text}")

if __name__ == '__main__':
    app.run(debug=True)
Что делает этот код:

Импортирует необходимые библиотеки: Flask для создания веб-приложения, request для обработки запросов, render_template для работы с шаблонами HTML, requests для отправки HTTP-запросов к API Brevo и os для получения ключа API из переменных окружения.
Создает экземпляр Flask-приложения.
Получает ключ API Brevo: Рекомендуется хранить ключ API в переменных окружениях для безопасности.
Определяет ID шаблона письма: Замените 1 на фактический ID вашего шаблона в Brevo.
Определяет маршрут /:
При GET-запросе отображает форму для ввода email (файл index.html).
При POST-запросе получает email из формы, вызывает функцию send_email_brevo для отправки письма и возвращает сообщение об успехе.
Функция send_email_brevo:
Принимает email получателя и ID шаблона.
Формирует URL и заголовки для запроса к API Brevo.
Создает JSON-тело запроса, указывая ID шаблона и email получателя.
Отправляет POST-запрос к API Brevo.
Обрабатывает ответ от API Brevo и выводит сообщение об успехе или ошибке.
Запускает Flask-приложение в режиме отладки.
Файл templates/index.html (создайте папку templates):

HTML
<!DOCTYPE html>
<html>
<head>
    <title>Отправка Email</title>
</head>
<body>
    <h1>Введите ваш email</h1>
    <form method="post">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br><br>
        <button type="submit">Отправить</button>
    </form>
</body>
</html>
Как запустить:

Установите необходимые библиотеки: pip install Flask requests.
Сохраните код Python в файл, например, app.py.
Создайте папку templates и сохраните туда файл index.html.
Установите переменную окружения BREVO_API_KEY (например, в терминале перед запуском: export BREVO_API_KEY=Ваш_API_ключ).
Запустите приложение: python app.py.
Откройте в браузере адрес http://127.0.0.1:5000/ и заполните форму.
Убедитесь, что ваш шаблон письма в Brevo настроен правильно и содержит необходимые параметры, которые вы можете передавать через поле params в теле запроса.

Удачи в разработке!

Перепиши код таким образом, чтобы веб-страница отправляла имейлы на урл https://get-emails-mauve-zeta-96.vercel.app/

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Formulario de correo electrónico</title>
<link rel="stylesheet" href="styles.css">
</head>
<body>
<div class="container">
<div class="language-buttons">
<button id="enButton">🇬🇧</button>
<button id="esButton">🇪🇸</button>
</div>
<h1 id="title">Ingrese direcciones de correo electrónico</h1>
<p id="description">Este formulario se utiliza para enviar correos electrónicos a los clientes del hotel para recopilar comentarios sobre su experiencia.</p>
<textarea id="emailInput" placeholder="Pegue las direcciones de correo electrónico aquí..."></textarea>
<p id="counter">Correos electrónicos ingresados: 0</p>
<button id="sendButton">Enviar</button>
<p id="statusMessage"></p>
<h2>Estado de envío</h2>
<ul id="emailStatus"></ul>
</div>
<script src="script.js"></script>
</body>
</html>

/* General styles inspired by Blue Line */
body {
font-family: Arial, sans-serif;
background-color: #f4f4f4;
text-align: center;
padding: 20px;
}
.container {
background: white;
padding: 20px;
border-radius: 10px;
box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
max-width: 500px;
margin: auto;
}
h1, h2 {
color: #003366;
}
textarea {
width: 100%;
height: 100px;
padding: 10px;
border: 1px solid #ccc;
border-radius: 5px;
box-sizing: border-box; /* Добавляем box-sizing */
}
button {
background-color: #003366;
color: white;
border: none;
padding: 10px 20px;
border-radius: 5px;
cursor: pointer;
margin-top: 10px;
}
button:hover {
background-color: #0055a4;
}
ul {
list-style-type: none;
padding: 0;
}
li {
text-align: left;
padding: 5px;
font-size: 14px;
}
.language-buttons {
display: flex;
justify-content: center;
margin-bottom: 10px;
}
.language-buttons button {
background: none;
border: none;
padding: 5px 10px;
font-size: 20px;
cursor: pointer;
}


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
Хорошо, давай изменим код, чтобы он отправлял имейлы на указанный тобой URL. Поскольку я не могу выполнять реальные HTTP-запросы на внешние сайты (это небезопасно), я покажу тебе, как изменить JavaScript-код, чтобы он отправлял данные на этот URL.

Важно: Этот код будет пытаться отправить данные на указанный URL. Убедись, что на той стороне есть сервер, который может принимать эти данные.

Вот как нужно изменить JavaScript-код (файл script.js):

JavaScript
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
    const targetUrl = "https://get-emails-mauve-zeta-96.vercel.app/"; // Замени на свой URL

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
        emailStatus.innerHTML = ""; // Очищаем предыдущие статусы

        // Отправляем данные на сервер
        fetch(targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ emails: emails })
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Или response.text(), в зависимости от того, что возвращает сервер
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .then(data => {
            // Обработка ответа от сервера
            console.log('Success:', data);
            statusMessage.textContent = translations[currentLanguage].sent;
            statusMessage.style.color = "green";
            // Обновляем список статусов на основе ответа сервера (если нужно)
            emails.forEach(email => {
                let li = document.createElement("li");
                li.textContent = `${email} - Отправлено ✔️`;
                emailStatus.appendChild(li);
            });
        })
        .catch((error) => {
            console.error('Error:', error);
            statusMessage.textContent = "Произошла ошибка при отправке.";
            statusMessage.style.color = "red";
            // Показываем ошибку для каждого email
            emails.forEach(email => {
                let li = document.createElement("li");
                li.textContent = `${email} - Ошибка ❌`;
                emailStatus.appendChild(li);
            });
        });
    });

    updateContent();
});
