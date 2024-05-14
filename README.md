<h1  align="center"  id="title">Paytm</h1>

<p  align="center"><img  src="https://socialify.git.ci/chiragyadav2003/Paytm/image?language=1&amp;owner=1&amp;name=1&amp;stargazers=1&amp;theme=Light"  alt="project-image"></p>

<p  id="description">In this project I have meticulously crafted a web application that mimics the functionality of leading digital payment platforms. By leveraging cutting-edge technologies and best practices I have created a seamless user experience for managing transactions and interactions within the app.</p>

<p  align="center"><img  src="https://img.shields.io/badge/Paytm-blue"  alt="shields"></p>

<h2>🧐 Features</h2>

Here're some of the project's best features:

- Users can create accounts transfer funds to their app wallet and send money to other users. The system ensures transaction integrity through database transactions mirroring the reliability of bank transactions. Successful transfers credit the recipient and debit the sender while any errors result in a rollback to maintain data consistency.

- By combining these technologies and functionalities my project aims to deliver a robust scalable and secure digital payment solution that provides a seamless experience for users.

<h2>📷 Project ScreenShot</h2>

<br>

<h2>📒 Project Description</h2>

### Paytm Web App

Welcome to my solo project, a dynamic web application inspired by popular digital payment platforms. This project showcases my expertise in building a comprehensive payment system using a carefully selected tech stack.

### Introduction

In this project, I have meticulously crafted a web application that mimics the functionality of leading digital payment platforms. By leveraging cutting-edge technologies and best practices, I have created a seamless user experience for managing transactions and interactions within the app.

### Functionality

Users can create accounts, transfer funds to their app wallet, and send money to other users. The system ensures transaction integrity through database transactions, mirroring the reliability of bank transactions. Successful transfers credit the recipient and debit the sender, while any errors result in a rollback to maintain data consistency. By combining these technologies and functionalities, my project aims to deliver a robust, scalable, and secure digital payment solution that provides a seamless experience for users.

<h2>💻 Built with</h2>

Technologies used in the project:

- **Node.js**: Powers the backend API and handles server-side logic
- **Docker**: Containerizes the application for easy deployment and scaling
- **AWS**: Provides cloud infrastructure for hosting the application and managing resources
- **TypeScript**: Enhances code quality and maintainability with static typing
- **Next.js**: Utilized for building the user and merchant apps, offering server-side rendering and static site generation
- **Webhooks**: Enables real-time communication between the application and external services
- **PostgreSQL**: A robust relational database management system for storing and managing user and transaction data
- **bcrypt**: Ensures secure password hashing
- **Prisma**: Simplifies database interactions and migrations with an ORM tool
- **Tailwind CSS**: Styles the user interface with a utility-first CSS framework
- **CI/CD pipeline**: Automates the build, test, and deployment process for consistent releases
- **Recoil**: Manages application state in the user and merchant apps
- **GitHub Workflow**: Enables continuous integration and deployment using GitHub Actions
- **NextAuth**: Provides a secure and user-friendly authentication system for Next.js
- **Turborepo**: Optimizes the development workflow with high-performance build capabilities, caching, and parallel task execution

<h2>🛠️ Installation Steps:</h2>

<p>1. Clone the repo</p>

```
git clone https://github.com/chiragyadav2003/Paytm
```

<p>2. npm install</p>

```
npm i
```

<p>3. Run postgres either locally or on the cloud (neon.tech)</p>

```
docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
```

<p>4. Copy over all .env.example files to .env</p>

<p>5. Update .env files everywhere with the right db url</p>

<p>6. Go to packages/db</p>

```
npx prisma migrate dev
```

```
npx prisma db seed
```

<p>8. Go to apps/user-app run</p>

```
npm run dev
```

<p>9. Try logging in using phone - 1111111111 password - alice (See seed.ts)</p>
