# Care.xyz 🏥👶👵  
### Baby Sitting & Elderly Care Service Platform

🔗 **Live Site:** https://care-xyz-five.vercel.app  
📦 **GitHub Repository:** https://github.com/mdfardous98/care-xyz  

---

## 📌 Project Overview

**Care.xyz** is a web-based caregiving platform designed to provide **reliable, secure, and trusted care services** for children, elderly people, and sick family members.  
Users can easily find, book, and manage caregiving services such as **Baby Care**, **Elderly Care**, and **Sick People Care** based on their preferred **time duration and location**.

The main goal of this project is to make **caregiving easy, safe, and accessible for everyone**.

---

## 🎯 Project Purpose

- Help families book trusted caregivers
- Provide a smooth and secure booking experience
- Offer transparent cost calculation
- Enable users to track their bookings and statuses

---

## 🚀 Key Features

### ✅ General Features
- Fully **Responsive Design** (Mobile, Tablet & Desktop)
- Clean and user-friendly UI
- Error handling with a custom **404 page**

### 🔐 Authentication
- Email & Password Login
- Google Social Login
- Secure private routes
- Password validation (min 6 characters, uppercase & lowercase)
- Logged-in users stay authenticated on page reload

### 🧑‍⚕️ Services
- Baby Care Service
- Elderly Care Service
- Sick People Care Service
- Individual service detail pages

### 📅 Booking System
- Dynamic booking based on:
  - Duration (Hours / Days)
  - Location (Division, District, City, Area, Address)
- Automatic **Total Cost Calculation**
- Booking status management:
  - Pending
  - Confirmed
  - Completed
  - Cancelled
- Bookings are saved securely for logged-in users

### 📄 My Bookings Page
- View all booked services
- See service name, duration, location, cost & status
- Cancel booking option
- View booking details

---

## 🧭 Pages & Routes

| Page | Route | Access |
|-----|------|--------|
| Home | `/` | Public |
| Service Details | `/service/[id]` | Public |
| Booking Page | `/booking/[id]` | Private |
| Login | `/login` | Public |
| Register | `/register` | Public |
| My Bookings | `/my-bookings` | Private |
| Error Page | `*` | Public |

---

## 🛠️ Technologies Used

### Frontend
- **Next.js**
- **React**
- **Tailwind CSS**
- **JavaScript (ES6+)**

### Authentication
- Firebase Authentication
  - Email & Password
  - Google Login

### Deployment
- **Vercel**

---

## 🔐 Environment Variables

All sensitive configuration keys are stored securely using environment variables.

Example:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
⚙️ Installation & Setup (Local)
bash
Copy code
# Clone the repository
git clone https://github.com/mdfardous98/care-xyz.git

# Navigate to project directory
cd care-xyz

# Install dependencies
npm install

# Run development server
npm run dev
App will run on:

arduino
Copy code
http://localhost:3000
🧩 Challenges Implemented
Metadata implementation on:

Home page

Service detail pages

Secure private route handling

Dynamic booking and cost calculation

Booking persistence per user

🔮 Optional Features (Future Scope)
Stripe Payment Integration

Email invoice after successful booking

Admin Dashboard

Payment history tracking

📤 Submission Information
GitHub Repo: https://github.com/mdfardous98/care-xyz

Live Site: https://care-xyz-five.vercel.app

👨‍💻 Author
Md. Fardous
Frontend Developer | Next.js & React