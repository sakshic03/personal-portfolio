import sqlite3

DATABASE = "portfolio.db"


def get_connection():
    connection = sqlite3.connect(DATABASE)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database():
    with get_connection() as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS projects (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                project_url TEXT
            )
        """)

        connection.execute("""
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        columns = connection.execute(
            "PRAGMA table_info(projects)"
        ).fetchall()
        column_names = [column["name"] for column in columns]

        if "project_url" not in column_names:
            connection.execute(
                "ALTER TABLE projects ADD COLUMN project_url TEXT"
            )

        projects = [
            (
                "Taste-e-Magic",
                "An independently developed online food ordering website. Customers can explore the menu and send order details through WhatsApp.",
                "https://sakshic03.github.io/taste-e-magic/"
            ),
            (
                "Smart Study Planner",
                "An AI-based study planning web application that helps students organize study schedules and tasks, with an AI chat feature.",
                "https://smart-study-planner-1-s051.onrender.com"
            ),
            (
                "Pup Paradise",
                "A responsive pet shop website showcasing pets and pet-related products in an attractive, organized way, with a clean interface and smooth browsing experience.",
                "https://sakshic03.github.io/petshop/"
            )
        ]

        for title, description, project_url in projects:
            existing_project = connection.execute(
                "SELECT id FROM projects WHERE title = ?",
                (title,)
            ).fetchone()

            if existing_project:
                connection.execute(
                    """
                    UPDATE projects
                    SET description = ?, project_url = ?
                    WHERE title = ?
                    """,
                    (description, project_url, title)
                )
            else:
                connection.execute(
                    """
                    INSERT INTO projects (title, description, project_url)
                    VALUES (?, ?, ?)
                    """,
                    (title, description, project_url)
                )