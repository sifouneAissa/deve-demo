# Laravel Inertia React Antd

Use this command :

Install npm packages:
```sh
npm install
```

## Run the project
Run the server:
```sh
php artisan serve
```

Run the frontend bundler:
```
npm run dev
```

run database : 
```
php artisan db:seed
```

api endpoints : 
```
/api/login (for login api (email,password) you will get a token in return )
you must login before using this routes (use the token as Bearer in headers)

/api/susers?keyword=... (Create an API endpoint to retrieve the list of users with keyword filtering.)

/api/pusers (Create an API endpoint that takes a number as a parameter and returns a list of user pairs whose ages sum up to that number.)

/api/dusers (Create an API endpoint to search and return the age distribution of users. The age distribution represents the number of users grouped by age ranges.
             (Example of age ranges : 15-30, 31-45 etc))
```

