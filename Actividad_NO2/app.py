from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    preguntas_por_nivel = [
        {
            "nivel": 1,
            "titulo": "Nivel 1: Reglas Generales",
            "preguntas": [
                {
                    "id": "p1",
                    "texto": "¿Cual es la calificacion si se detecta plagio?",
                    "opciones": ["0", "5", "7"],
                    "correcta": "0"
                },
                {
                    "id": "p2",
                    "texto": "¿Cuantas faltas se permiten para no ir a examen final?",
                    "opciones": ["2", "3", "5"],
                    "correcta": "2"
                }
            ]
        },
        {
            "nivel": 2,
            "titulo": "Nivel 2: Entregas",
            "preguntas": [
                {
                    "id": "p3",
                    "texto": "¿Cual es el codigo de Classroom?",
                    "opciones": ["yi4rljj6", "isc123", "movil9"],
                    "correcta": "yi4rljj6"
                },
                {
                    "id": "p4",
                    "texto": "¿Calificacion maxima por entrega con retraso?",
                    "opciones": ["5", "6", "8"],
                    "correcta": "5"
                }
            ]
        },
        {
            "nivel": 3,
            "titulo": "Nivel 3: Materia",
            "preguntas": [
                {
                    "id": "p5",
                    "texto": "¿Que framework se usara para programar?",
                    "opciones": ["React Native", "Flutter", "Angular"],
                    "correcta": "React Native"
                },
                {
                    "id": "p6",
                    "texto": "¿En que formato se entregan las tareas?",
                    "opciones": ["PDF", "Word", "Excel"],
                    "correcta": "PDF"
                }
            ]
        }
    ]
    return render_template('index.html', niveles=preguntas_por_nivel)

if __name__ == '__main__':
    app.run(debug=True)
