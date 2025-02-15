# CREATE-Athena

## Project Overview
**CREATE-Athena** is a full-stack application composed of three main components:

### 1. **AthenaAPI** (API Project - .NET 9)
   - This is the backend API built with .NET 9. It handles data processing, business logic, and serves endpoints for the Athena Angular application.  
   - Location: `./AthenaAPI`

### 2. **AthenaFrontend** (Frontend Project - Angular)
   - This is the frontend application built with Angular. It provides the user interface for interacting with the Athena platform.  
   - Location: `./AthenaFrontend`

### 3. **AthenaDatabase** (MSSQL Project)
   - This contains the database schema, structure, and backup files required for the Athena application.  
   - Location: `./AthenaDatabase`

---

## Setting Up the Project

### 1. Choose and Set Up an IDE
1. Download and install an IDE (e.g., Visual Studio Community Edition).
2. Open the project in your IDE by loading the solution file.

---

### 2. Install SQL Server Management Studio (SSMS)
1. Download and install **SQL Server Management Studio (SSMS)**.
2. Launch SSMS and connect to the local development server:
   - **Server Name**: `(LocalDb)\MSSQLLocalDB`
   - **Authentication**: Windows Authentication
3. If the local development server fails to connect:
   - Ensure the **MSSQL LocalDB server** is installed and running.

---

### 3. Restoring the Backup Database
The API requires a SQL Server database for local development. Follow these steps to restore the database:

1. Open **SQL Server Management Studio** (SSMS) and connect to the local instance.
2. In **Object Explorer**, right-click on the **Databases** folder and select **Restore Database...**.
3. In the **Restore Database** dialog:
   - Select the **Device** radio button.
   - Click the **...** button, then click **Add**.
   - Navigate to the database backup file located at:  
     `./AthenaDatabase/backup/dev/athena.bak`
4. Click **OK** to confirm and begin the restore process.
5. Once restored:
   - Expand the **Databases** folder in SSMS. You should see the **Athena** database.
   - Expand the **Tables** folder to view the database tables.
6. Verify the database restoration:
   - Right-click any table and select **Select Top 1000 Rows**.
   - This should query the table and return sample data.

---

## Notes
- Ensure that all dependencies for .NET 9 and Angular are installed.
- For Angular, use `npm install` in the `AthenaFrontend` directory to set up the required dependencies.
- For the API, use the `.NET CLI` or Visual Studio to restore dependencies and run the project.

---
