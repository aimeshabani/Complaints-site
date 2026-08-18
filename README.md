# 🎓 Student Results Complaint System

![Status](https://img.shields.io/badge/status-hackathon%20prototype-blue)
![Frontend](https://img.shields.io/badge/frontend-HTML%20%7C%20CSS%20%7C%20JS-2E86DE)
![Backend](https://img.shields.io/badge/backend-not%20started-lightgrey)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

## ❗ The Problem

When a student find a problem with their academic results — a missing mark, a wrong grade, a course that never appears on their transcript — the process to get it fixed is slow and frustrating:

- Students have to move **physically from office to office** to find whoever is responsible.
- There is **no way to track** where a complaint currently stands.
- Communication is informal, easy to lose, and rarely documented.
- Departments and HODs have **no central place** to see, prioritize, or manage the complaints they're responsible for.

The result: complaints get lost, students chase updates in person, and staff have no system to manage the backlog.

---

## ✅ The Solution

**Student Results Complaint System** replaces that entire process with a simple web platform:

```
Student → Submit complaint → Department/HOD reviews → Status updated → Student notified → Complaint resolved
```

- A student **submits a complaint online** in a structured, guided form and instantly receives a unique **Complaint ID** (e.g. `BME-2026-00452`).
- They can **track that ID at any time** to see a live status and a visual timeline — no login required, and without exposing personal details publicly.
- The **HOD gets a centralized dashboard** to review every complaint, change its status, and schedule a meeting with the student directly from the same screen.

> Submit. Trak. Resolve.

---

## ✨ Features

- **Cascading academic selectors** — Faculty → Department → Level → Course
- **Structured complaint form** split into logical sections (Academic Info, Student Info, Complaint Details) with a progress indicator
- **Evidence upload** — result slips, screenshots, exam documents
- **Unique Complaint ID generation** on submission, with a "keep this safe" notice
- **Public tracking page** — enter a Complaint ID to see status and a visual timeline, without exposing personal/sensitive data
- **HOD Dashboard**
  - Overview stats: Total, New, Under Review, Resolved
  - Searchable, filterable complaints table with a per-row progress rail
  - Detail view: student & academic info, complaint description, evidence, full status timeline
  - Status management: Under Review → Requires HOD Meeting / Requires Department Action → Resolved / Rejected
  - **Appointment scheduling** — selecting "Requires HOD Meeting" opens available slots for the student to book
- **Privacy by design** — the public traking page never reveals phone, email, or uploaded evidence

---

## 🗺️ Pages

| # | Page | File | Description |
|---|------|------|-------------|
| 0 | Login / Signup / Welcome | `login.html` | Student or Administrator/HOD entry point, and a welcome hub linking to Submit, Track, and View Profile |
| 1 | Landing Page | `index.html` | Submit / Track entry points |
| 2 | Submit Complaint | `complaints.html` (`#submit`) | 3-section complaint form |
| 3 | Confirmation | `complaints.html` | Generated Complaint ID + next steps |
| 4 | Track Complaint | `complaints.html` (`#track`) | Public status + timeline lookup |
| 5 | HOD Dashboard | `hod-dashboard.html` | Review, manage, resolve, schedule |

Pages 2–4 share one view-switching page (`complaints.html`) driven by `complaints.js`. Page 5 (`hod-dashboard.html`) is a self-contained HTML/CSS/JS file that shares the same header/footer navigation and color system.

---

## 🎨 Design

- **Palette:** deep blue (`#0F3E73`) for headings and primary text, action blue (`#2E86DE`) for interactive elements, light blue wash (`#EAF3FC`) for backgrounds/hover states
- **Status colors:**

  | Status | Color |
  |---|---|
  | Under Review | 🔵 Blue |
  | Requires HOD Meeting | 🟣 Indigo |
  | Requires Department Action | 🟢 Teal |
  | Resolved | ✅ Green |
  | Rejected | 🔴 Red |

- Each complaint shows a **stage rail** (`Submitted → Under Review → Awaiting HOD → Resolved`) so status is visible at a glance, not just as a label.

---

## 🛠️ Tech Stack

**Frontend (current)**
- HTML5 / CSS3
- Vanilla JavaScript (no framework, no build step)

**Backend**
- Not started. The project currently runs entirely on mock, in-memory demo data in the browser so every page can be reviewed and demoed without a server.
- A Python (Flask + SQLAlchemy) backend is planned for after the hackathon — see [Data Model](#-data-model-planned) below for the intended shape.

---

## 📁 Project Structure

```
Complaints-site/
├── login.html              # Page 0 — Login / Signup / Welcome hub
├── index.html               # Page 1 — Landing page
├── complaints.html          # Pages 2–4 — Submit / Confirmation / Track
├── complaints.css           # Styles for complaints.html
├── complaints.js            # View switching, form logic, tracking lookup
├── hod-dashboard.html       # Page 5 — HOD Dashboard (self-contained)
└── README.md
```

---

## 🗄️ Data Model (planned)

Not implemented yet — this is the intended shape for the future Flask backend.

```
User
├── id
├── name
├── email
├── password_hash
├── role            # student | hod | admin
├── student_id
└── department

Complaint
├── id
├── complaint_id    # e.g. BME-2026-00452
├── student_id
├── faculty
├── department
├── level
├── course
├── complaint_type
├── description
├── evidence
├── status
├── created_at
└── updated_at

ComplaintStatusHistory
├── id
├── complaint_id
├── status
├── comment
├── updated_by
└── created_at

Appointment
├── id
├── complaint_id
├── student_id
├── hod_id
├── appointment_date
├── appointment_time
├── location
└── status
```

`ComplaintStatusHistory` is what will power the timeline shown on both the student tracking page and the HOD dashboard once a real backend is in place.

---

## 🚀 Geting Started

No build step or backend required — every page is static HTML/CSS/JS.

```bash
git clone https://github.com/aimeshabani/Complaints-site.git
cd Complaints-site

# open directly
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows

# or serve locally
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

---

## 🧭 Roadmap

**Hackathon MVP**
- [x] Login / Signup / Welcome hub
- [x] Submit complaint
- [x] Generate Complaint ID
- [x] Track complaint (status + timeline)
- [x] HOD dashboard — view complaints, change status
- [x] Request HOD meeting / pick appointment slot
- [ ] View profile page

**After the hackathon**
- [ ] Flask + SQLAlchemy backend
- [ ] Persist complaints, users, and appointments in a real database
- [ ] Automatic email notifications on status change
- [ ] Student login & complaint history
- [ ] Admin/user management
- [ ] Analytics
- [ ] SMS/WhatsApp notifications

---

## 🔐 Privacy Notes

- The public tracking page (Page 4) only ever shows: Complaint ID, Faculty, Department, Course, Complaint Type, Status, and Timeline.
- Student contact details, full personal information, and uploaded evidence are never exposed via the Complaint ID alone — those require an authenticated session.

---

## 🤝 Contributing

Issues and pull requests are welcoe. For larger changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a pull request

---

## 📄 License

Distributed under the MIT License. 
---

## 👥 Teamm

**Supervisor:** Sana Abbas

**Developers:**

| Developer | Contribution |
|---|---|
| Aime Shabani | HOD Dashboard |
| Ngwinui Linda | Login, Signup, and Welcome page (Submit Complaint, Track Complaint, View Profile) |
| Moise Shabani | Submit Complaint form, Track Complaint form |
