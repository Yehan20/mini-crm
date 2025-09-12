# Mini-CRM

## Project Description


You can use the following test user to log in:

- **Email:** `admin@crm.com`
- **Password:** `password`

## Features
- User Authentication
- Employee Crud
- Email Notification
- Company Crud
- Pagination


## Technology Stack
- Backend: Laravel (12)
- Frontend: React Js with TypeScript
- State management: Context Api
- Database: MySQL 
- UI Framework: Flowbite + Tailwind CSS

## Testing
- PHP Unit Tests (Feature tests)

## Setup Instructions

### Prerequisites

Make sure you have the following installed:

- [PHP](https://www.php.net/) >= 8.2
- [Composer](https://getcomposer.org/)
- [Node.js](https://nodejs.org/) & [npm](https://www.npmjs.com/) — **Latest version required**
- [MySQL](https://www.mysql.com/) or compatible database; other options include [XAMPP](https://www.apachefriends.org/)


### First Steps

Open a terminal and clone this repo:

```bash
# Clone this repository
git clone 

# Go into the repository
cd mini-crm

# Remove current origin repository
git remote remove origin

# If you want, you can add a new remote repository
git remote add origin https://github.com/<your-github-username>/<your-repo-name>.git
```

### Backend Setup

1. Navigate to backend folder:

   ```bash
   cd backend
   ```

2. Copy environment config:

   ```bash
   cp .env.example .env
   ```

3. Update `.env` with your database credentials:

   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_db_name
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

4. Install dependencies:

   ```bash
   composer install
   ```

5. Generate app key and create the storage link. Run the following commands one after another:

   ```bash
   php artisan key:generate
   php artisan storage:link
 
   ```

6. Run migrations and seeders to generate mock data to get the application ready:

   ```bash
   php artisan migrate --seed
   ```


7. Start Laravel development server:

   ```bash
   php artisan serve --host localhost --port 8000
   ```

   The API will be available at `http://localhost:8000`.
   
>  **Note:**  
> If you use different domian in front end for auth make sure to add it in the statefull domains  in your Laravel `config/sanctum.php` file:  

#### Email Server Configuration and queue configuration

1.In order to send emails in test server register for an account in mailtrap:
- [MailTrap](https://mailtrap.io/)


2. Once you register get the secret keys and paste then in the env file `.env` 

   ```env
   MAIL_MAILER= REPLACE WITH YOUR KEY
   MAIL_HOST= REPLACE WITH YOUR KEY
   MAIL_PORT= REPLACE WITH YOUR KEY
   MAIL_USERNAME= REPLACE WITH YOUR KEY
   MAIL_PASSWORD= REPLACE WITH YOUR KEY

   ```
3. Once All is configured you can run your queue worker to begin the waiting for any dispatched jobs 
   ```bash
   php artisan queue:work 

   ```

#### Generating Admin user

1. If you want to create an admin user you can use command and enter the options
   ```bash
   php artisan admin:generate {name} {email} {password} 
   ```
2. Then you can login with that user

### Frontend Setup

1. Navigate to frontend folder:

   ```bash
   cd frontend
   ```

2. Copy environment config:

   ```bash
   cp .env.example .env
   ```

3. Update `.env` with the backend API URL:

   ```env
   VITE_API_BASE_URL=http://localhost:8000/
   ```

4. Install dependencies:

   ```bash
   npm install
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173`.
   If you change the development url make sure to update the cors.php file in laravel as other wise it wont allow

6. While it's possible to manually set the API URL directly in the code, it's **highly recommended** to    use environment variables instead for flexibility and cleaner configuration.

   **File:** `frontend/src/utils/axios.ts`

      ```js
      const axiosInstance = axios.create({
      baseURL: 'http://yourendpoint.com', 
      });
      ```

      ```bash
      npm run dev
      ```

   The frontend will be available at `http://localhost:5173` by default.

### Testing

#### Backend: PHP Unit

To run feature tests for the Laravel backend:

>  Make sure you're in the project root before navigating to `backend`

```bash
cd backend
php artisan test
```

>  **Note:**  
> If you change the test runner's origin (e.g., running the frontend on a different port), be sure to update the `allowed_origins` setting in your Laravel `config/cors.php` file:


## Main API Endpoints

| Method | Endpoint                 | Description                   |
|--------|--------------------------|-------------------------------|
| POST   | `/login`                 | User login                    |
| POST   | `/sanctum/csrf`          | Csrf Route                    |
| POST   | `/logout`                | User logout                   |
| GET    | `/api/user`              | Get authenticated user info   |
| GET    | `/api/companies`         | List all companies Paginated  |
| GET    | `/api/companies/{id}`    | Get a specific company        |
| PUT    | `/api/companies/{id}`    | Update a  company             |
| DELETE | `/api/companies/{id}`    | Delete a company              |
| POST   | `/api/companies`         | Create a new company          |
| GET    | `/api/employees`         | List all employees Paginated  |
| PUT    | `/api/employees/{id}`    | Update an employee            |
| DELETE | `/api/employees/{id}`    | Delete an employee            |
| POST   | `/api/employees`         | Create an employee            |



>  **Important:** Ensure that CORS is properly configured in your Laravel backend (`config/cors.php`) to allow requests from your required origin


## Future Improvement Ideas

- **PWA (Progressive Web App) Integration**  




