from pathlib import Path

from flask import Flask, jsonify, render_template, request, url_for


from database import initialize_database, get_connection
app = Flask(__name__)
initialize_database()


@app.route("/")
def home():
    connection = get_connection()
    projects = connection.execute("SELECT * FROM projects").fetchall()
    connection.close()

    return render_template("index.html", projects=projects)


@app.route("/api/projects")
def get_projects():
    with get_connection() as connection:
        projects = connection.execute(
            """
            SELECT id, title, description, project_url
            FROM projects
            """
        ).fetchall()

    return jsonify([dict(project) for project in projects])


@app.route("/api/certificates")
def get_certificates():

    folder = Path(app.static_folder)

    if not folder.exists():
        return jsonify([])

    title_order = [
        "C Programming",
        "Data Structures",
        "Database Management",
        "HTML",
        "Java",
        "Linux",
        "Microprocessor",
        "Operating System",
        "Python",
        "Software Engineering",
    ]

    def display_title(file_path):
        name = file_path.stem.lower().replace("_", " ").replace(".", " ")

        if name.strip() == "c":
            return "C Programming"
        if "data" in name and "structure" in name:
            return "Data Structures"
        if "database" in name:
            return "Database Management"
        if "html" in name:
            return "HTML"
        if "java" in name:
            return "Java"
        if "linux" in name:
            return "Linux"
        if "microprocessor" in name:
            return "Microprocessor"
        if "operating" in name and "system" in name:
            return "Operating System"
        if "python" in name:
            return "Python"
        if "software" in name and "engineering" in name:
            return "Software Engineering"

        return file_path.stem.replace("_", " ").replace(".", " ").title()

    pdf_files = [
        file
        for file in folder.iterdir()
        if file.is_file() and file.suffix.lower() == ".pdf"
    ]

    certificates = [
        {
            "title": display_title(file_path),
            "url": url_for(
                "static",
                filename=file_path.name,
            ),
        }
        for file_path in pdf_files
    ]

    certificates.sort(
        key=lambda certificate: (
            title_order.index(certificate["title"])
            if certificate["title"] in title_order
            else len(title_order)
        )
    )

    return jsonify(certificates)


@app.route("/api/contact", methods=["POST"])
def save_message():
    data = request.get_json() or {}

    name = data.get("name", "").strip()
    email = data.get("email", "").strip()
    message = data.get("message", "").strip()

    if not name or not email or not message:
        return jsonify({"error": "Please fill in all fields."}), 400

    with get_connection() as connection:
        connection.execute(
            """
            INSERT INTO messages (name, email, message)
            VALUES (?, ?, ?)
            """,
            (name, email, message),
        )

    return jsonify({"message": "Thanks! Your message has been saved."})


if __name__ == "__main__":
    app.run(debug=True)