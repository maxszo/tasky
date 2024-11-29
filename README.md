# Tasky

**Tasky** is a fullstack task management application developed by **Max Szostkiewicz**. It allows users to efficiently organize, prioritize, and track tasks. Tasky combines a robust backend with an intuitive frontend for a seamless task management experience.

## Features

- **Task Management**: Create, update, and delete tasks.
- **User Management**: Add, edit, and manage users.
- **Priority Tracking**: Set and monitor task priorities.
- **Responsive UI**: Built with Angular for a smooth and modern user experience.
- **Secure Backend**: Powered by Java Spring Boot with PostgreSQL database.
- **Future Enhancements**: Password encryption, CI/CD, and more.

---

## Technologies Used

- **Frontend**: Angular (v19)
- **Backend**: Java Spring Boot
- **Database**: PostgreSQL
- **Version Control**: Git
- **Development Environment**: Visual Studio Code (Windows 10)

---

## Installation and Setup

### Prerequisites

1. **Frontend**: Ensure Node.js and Angular CLI are installed.
2. **Backend**: Install Java (JDK 17+), Maven, and PostgreSQL.
3. **Database**: Set up a PostgreSQL database.

### Backend Setup

1. Clone the repository (GitHub link coming soon).
2. Navigate to the backend folder:

```bash
cd tasky-backend
```

3. Configure the application.properties file to connect to your PostgreSQL database:
   properties

```bash
spring.datasource.url=jdbc:postgresql://localhost:5432/tasky
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

4. Run the backend application:

```bash
  ./gradlew bootRun
```

### Frontend Setup

1. Clone the repository (GitHub link coming soon).
2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
ng serve
```

4. Access the application at http://localhost:4200.

## Database data population

Use the following SQL script to populate your database with sample data:

```sql
-- Insérer des utilisateurs
INSERT INTO users (id, firstname, lastname, mail, password, job) VALUES
(100, 'Max', 'Szostkiewicz', 'maxszo@mail.com', 'password', 'Développeur'),
(101, 'Alice', 'Durand', 'alice.durand@example.com', 'password123', 'Développeur'),
(102, 'Bob', 'Lemoine', 'bob.lemoine@example.com', 'securepass456', 'Chercheur'),
(103, 'Claire', 'Dupuis', 'claire.dupuis@example.com', 'qwerty789', 'Designer'),
(104, 'David', 'Morel', 'david.morel@example.com', 'mypassword111', 'Manager'),
(105, 'Emma', 'Bertrand', 'emma.bertrand@example.com', 'pass4321', 'Data Scientist'),
(106, 'Felix', 'Leroux', 'felix.leroux@example.com', 'abc123456', 'Développeur');

-- Insérer des tâches
INSERT INTO task (id, user_story_number, name, description, state, priority, users_id) VALUES
(201, 'US001', 'Setup database', 'Configure PostgreSQL for the project', 'DONE', 'HIGH', 101),
(202, 'US002', 'Build API', 'Develop CRUD endpoints in Spring Boot', 'IN_PROGRESS', 'HIGH', 101),
(203, 'US003', 'Initialize frontend', 'Set up Angular project for the UI', 'TO_DO', 'MEDIUM', 101),
(204, 'US004', 'Write documentation', 'Document API endpoints and features', 'TO_DO', 'LOW', 101),
(205, 'US005', 'Optimize queries', 'Improve database query performance', 'IN_PROGRESS', 'HIGH', 101),
(206, 'US006', 'Write research paper', 'Prepare physics research article', 'DONE', 'HIGH', 102),
(207, 'US007', 'Analyze data', 'Study experimental results', 'IN_PROGRESS', 'MEDIUM', 102),
(208, 'US008', 'Prepare presentation', 'Create slides for conference', 'TO_DO', 'LOW', 102),
(209, 'US009', 'Perform experiments', 'Test new theories in the lab', 'DONE', 'MEDIUM', 102),
(210, 'US010', 'Design logo', 'Create branding logo for Tasky', 'TO_DO', 'HIGH', 103),
(211, 'US011', 'Create dashboard', 'Design wireframe for the dashboard', 'IN_PROGRESS', 'MEDIUM', 103),
(212, 'US012', 'User testing', 'Gather feedback on UI design', 'TO_DO', 'LOW', 103),
(213, 'US013', 'Prototype enhancements', 'Improve prototype based on feedback', 'DONE', 'HIGH', 103),
(214, 'US014', 'Prepare budget report', 'Compile project expense details', 'TO_DO', 'LOW', 104),
(215, 'US015', 'Plan sprint', 'Organize tasks for next sprint', 'IN_PROGRESS', 'MEDIUM', 104),
(216, 'US016', 'Client meeting', 'Discuss project progress with client', 'DONE', 'HIGH', 104),
(217, 'US017', 'Data cleaning', 'Prepare data for machine learning', 'TO_DO', 'MEDIUM', 105),
(218, 'US018', 'Train model', 'Develop predictive model', 'IN_PROGRESS', 'HIGH', 105),
(219, 'US019', 'Evaluate results', 'Test model accuracy', 'TO_DO', 'LOW', 105),
(220, 'US020', 'Report insights', 'Create report on findings', 'DONE', 'HIGH', 105),
(221, 'US021', 'Backend fixes', 'Resolve API errors', 'TO_DO', 'HIGH', 106),
(222, 'US022', 'Code review', 'Review code for best practices', 'IN_PROGRESS', 'MEDIUM', 106),
(223, 'US023', 'Write tests', 'Add unit tests for API', 'TO_DO', 'LOW', 106),
(224, 'US024', 'Deploy to production', 'Launch the stable release', 'DONE', 'HIGH', 106),
(225, 'US025', 'Create CI/CD pipeline', 'Automate deployment process', 'TO_DO', 'MEDIUM', 106),
(226, 'US026', 'Update dependencies', 'Ensure libraries are up-to-date', 'DONE', 'MEDIUM', 101),
(227, 'US027', 'Fix frontend bugs', 'Resolve styling and logic issues', 'TO_DO', 'HIGH', 103),
(228, 'US028', 'Optimize assets', 'Reduce image and script sizes', 'IN_PROGRESS', 'LOW', 104),
(229, 'US029', 'Improve SEO', 'Enhance site discoverability', 'TO_DO', 'MEDIUM', 105),
(230, 'US030', 'Write blog post', 'Publish update on project progress', 'DONE', 'LOW', 102);
```
