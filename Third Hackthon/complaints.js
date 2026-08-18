

// "use strict";


const departmentsByFaculty = {
    "Faculty of Engineering": [
        "Biomedical Engineering",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Civil Engineering"
    ],

    "Faculty of Science": [
        "Computer Science",
        "Biological Sciences",
        "Chemistry",
        "Physics"
    ],

    "Faculty of Medicine": [
        "Medicine",
        "Nursing",
        "Medical Laboratory Science"
    ],

    "Faculty of Business": [
        "Accounting",
        "Finance",
        "Business Administration"
    ]
};



const coursesByDepartment = {
    "Biomedical Engineering": {
        "100": [
            "Introduction to Biomedical Engineering",
            "Engineering Mathematics I"
        ],
        "200": [
            "Biomedical Electronics",
            "Human Anatomy for Engineers"
        ],
        "300": [
            "Biomedical Instrumentation",
            "Medical Imaging Systems"
        ],
        "400": [
            "Clinical Engineering",
            "Biomedical Signal Processing"
        ],
        "500": [
            "Advanced Biomedical Systems",
            "Biomedical Engineering Project"
        ]
    },

    "Electrical Engineering": {
        "100": ["Circuit Theory I", "Engineering Mathematics I"],
        "200": ["Digital Electronics", "Electrical Machines"],
        "300": ["Control Systems", "Power Systems"],
        "400": ["Advanced Electronics", "Power System Protection"],
        "500": ["Electrical Engineering Project"]
    },

    "Mechanical Engineering": {
        "100": ["Engineering Drawing", "Engineering Mathematics I"],
        "200": ["Thermodynamics I", "Fluid Mechanics"],
        "300": ["Machine Design", "Heat Transfer"],
        "400": ["Industrial Engineering", "Mechanical Systems"],
        "500": ["Mechanical Engineering Project"]
    },

    "Civil Engineering": {
        "100": ["Engineering Drawing", "Engineering Mathematics I"],
        "200": ["Structural Analysis", "Fluid Mechanics"],
        "300": ["Geotechnical Engineering", "Concrete Design"],
        "400": ["Highway Engineering", "Structural Design"],
        "500": ["Civil Engineering Project"]
    },

    "Computer Science": {
        "100": ["Introduction to Computing", "Programming I"],
        "200": ["Data Structures", "Object-Oriented Programming"],
        "300": ["Database Systems", "Web Development"],
        "400": ["Software Engineering", "Artificial Intelligence"],
        "500": ["Computer Science Project"]
    },

    "Biological Sciences": {
        "100": ["General Biology", "Cell Biology"],
        "200": ["Genetics", "Microbiology"],
        "300": ["Molecular Biology", "Ecology"],
        "400": ["Advanced Genetics", "Biotechnology"],
        "500": ["Research Project"]
    }
};

// mis Dom elementos

const complaintForm = document.getElementById("complaintForm");

const facultySelect = document.getElementById("faculty");
const departmentSelect = document.getElementById("department");
const levelSelect = document.getElementById("level");
const courseSelect = document.getElementById("course");

const description = document.getElementById("description");
const descriptionCount = document.getElementById("descriptionCount");

const evidenceInput = document.getElementById("evidence");
const filePreview = document.getElementById("filePreview");

const submitBtn = document.getElementById("submitBtn");
const formMessage = document.getElementById("formMessage");

const generatedComplaintId = document.getElementById("generatedComplaintId");
const trackingIdInput = document.getElementById("trackingId");

const trackingForm = document.getElementById("trackingForm");
const trackingResult = document.getElementById("trackingResult");
const trackingMessage = document.getElementById("trackingMessage");


// inicializando DOM

document.addEventListener("DOMContentLoaded", () => {

    setupFacultyDepartment();
    setupDepartmentLevelCourse();
    setupDescriptionCounter();
    setupEvidenceUpload();
    setupComplaintSubmission();
    setupTracking();
    setupNavigation();
    setupMobileMenu();
    setupCopyButton();

   
    handleInitialView();
});


// pagina de navigacion

function showView(viewName, updateUrl = true) {

    const views = {
        submit: document.getElementById("submitView"),
        confirmation: document.getElementById("confirmationView"),
        track: document.getElementById("trackView")
    };

    Object.values(views).forEach(view => {
        if (view) {
            view.classList.remove("active-view");
        }
    });

    const selectedView = views[viewName] || views.submit;

    selectedView.classList.add("active-view");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (updateUrl) {
        history.replaceState(null, "", `#${viewName}`);
    }
}


function handleInitialView() {

    const hash = window.location.hash.replace("#", "");

    if (hash === "track") {
        showView("track", false);

       
        const lastComplaintId = localStorage.getItem("lastComplaintId");

        if (lastComplaintId) {
            trackingIdInput.value = lastComplaintId;
        }

    } else if (hash === "confirmation") {
        showView("confirmation", false);
    } else {
        showView("submit", false);
    }
}


function setupNavigation() {

    document.querySelectorAll("[data-view-link]").forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const target = link.getAttribute("data-view-link");

            showView(target);

            closeMobileMenu();
        });
    });
}


// departamento de facultad
function setupFacultyDepartment() {

    facultySelect.addEventListener("change", () => {

        const faculty = facultySelect.value;

        // Reset dependent fields.
        departmentSelect.innerHTML =
            '<option value="">Select department</option>';

        levelSelect.value = "";
        courseSelect.innerHTML =
            '<option value="">Select course</option>';

        levelSelect.disabled = true;
        courseSelect.disabled = true;

        if (!faculty || !departmentsByFaculty[faculty]) {
            departmentSelect.disabled = true;
            return;
        }

        // addind departms
        departmentsByFaculty[faculty].forEach(department => {

            const option = document.createElement("option");

            option.value = department;
            option.textContent = department;

            departmentSelect.appendChild(option);
        });

        departmentSelect.disabled = false;
    });
}


// cursos de departamento
function setupDepartmentLevelCourse() {

    departmentSelect.addEventListener("change", () => {

        levelSelect.value = "";
        courseSelect.innerHTML =
            '<option value="">Select course</option>';

        courseSelect.disabled = true;

        if (departmentSelect.value) {
            levelSelect.disabled = false;
        } else {
            levelSelect.disabled = true;
        }
    });


    levelSelect.addEventListener("change", () => {

        const department = departmentSelect.value;
        const level = levelSelect.value;

        courseSelect.innerHTML =
            '<option value="">Select course</option>';

        if (
            !department ||
            !level ||
            !coursesByDepartment[department] ||
            !coursesByDepartment[department][level]
        ) {
            courseSelect.disabled = true;
            return;
        }

        coursesByDepartment[department][level].forEach(course => {

            const option = document.createElement("option");

            option.value = course;
            option.textContent = course;

            courseSelect.appendChild(option);
        });

        courseSelect.disabled = false;
    });
}




function setupDescriptionCounter() {

    description.addEventListener("input", () => {

        descriptionCount.textContent = description.value.length;

        if (description.value.length >= 950) {
            descriptionCount.style.color = "#c0392b";
        } else {
            descriptionCount.style.color = "";
        }
    });
}


// uploading evidences

function setupEvidenceUpload() {

    evidenceInput.addEventListener("change", () => {

        const file = evidenceInput.files[0];

        if (!file) {
            filePreview.classList.add("hidden");
            filePreview.innerHTML = "";
            return;
        }

        const maxSize = 5 * 1024 * 1024;

        if (file.size > maxSize) {

            evidenceInput.value = "";

            showMessage(
                formMessage,
                "The evidence file is too large. Please choose a file below 5MB.",
                "error"
            );

            filePreview.classList.add("hidden");
            return;
        }

        filePreview.classList.remove("hidden");

        filePreview.innerHTML = `
            <span>
                📎 <strong>${escapeHtml(file.name)}</strong>
                (${formatFileSize(file.size)})
            </span>

            <button type="button" class="remove-file" id="removeFile">
                Remove
            </button>
        `;

        document.getElementById("removeFile").addEventListener("click", () => {
            evidenceInput.value = "";
            filePreview.classList.add("hidden");
            filePreview.innerHTML = "";
        });
    });
}


// submiting complaints

function setupComplaintSubmission() {

    complaintForm.addEventListener("submit", async event => {

        event.preventDefault();

        clearMessage(formMessage);

        if (!complaintForm.checkValidity()) {

            complaintForm.reportValidity();

            showMessage(
                formMessage,
                "Please complete all required fields before submitting.",
                "error"
            );

            return;
        }

        submitBtn.disabled = true;

        submitBtn.innerHTML = `
            <span>Submitting...</span>
            <span>⏳</span>
        `;

        const complaintData = {
            studentName: document.getElementById("studentName").value.trim(),
            studentId: document.getElementById("studentId").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),

            faculty: facultySelect.value,
            department: departmentSelect.value,
            level: levelSelect.value,
            course: courseSelect.value,

            complaintType:
                document.getElementById("complaintType").value,

            description: description.value.trim(),

            status: "Submitted",

            createdAt: new Date().toISOString()
        };


       
        const complaintId = generateComplaintId();

        complaintData.complaintId = complaintId;

        saveComplaint(complaintData);


        localStorage.setItem("lastComplaintId", complaintId);

// mostrar pagina 3
        generatedComplaintId.textContent = complaintId;

        showView("confirmation");


        submitBtn.disabled = false;

        submitBtn.innerHTML = `
            <span>Submit Complaint</span>
            <span>→</span>
        `;
    });
}


// generar id

function generateComplaintId() {

  

    const year = new Date().getFullYear();

    const randomNumber =
        Math.floor(10000 + Math.random() * 90000);

    return `BME-${year}-${randomNumber}`;
}


// generar queja

function saveComplaint(complaint) {

    const complaints =
        JSON.parse(localStorage.getItem("complaints") || "{}");

    complaints[complaint.complaintId] = complaint;

    localStorage.setItem(
        "complaints",
        JSON.stringify(complaints)
    );
}


// pagina 4_huella

function setupTracking() {

    trackingForm.addEventListener("submit", event => {

        event.preventDefault();

        clearMessage(trackingMessage);

        const complaintId =
            trackingIdInput.value.trim().toUpperCase();

        if (!complaintId) {

            showMessage(
                trackingMessage,
                "Please enter your Complaint ID.",
                "error"
            );

            trackingResult.classList.add("hidden");
            return;
        }

       
        const complaint = findComplaint(complaintId);

        if (!complaint) {

            showMessage(
                trackingMessage,
                "Complaint not found. Please check the Complaint ID and try again.",
                "error"
            );

            trackingResult.classList.add("hidden");
            return;
        }

        displayTrackingResult(complaint);
    });
}


// encontrar Queja

function findComplaint(complaintId) {

    const complaints =
        JSON.parse(localStorage.getItem("complaints") || "{}");

   
    const key = Object.keys(complaints).find(
        id => id.toUpperCase() === complaintId.toUpperCase()
    );

    return key ? complaints[key] : null;
}


// mostrar el resultado de huello

function displayTrackingResult(complaint) {

    trackingResult.classList.remove("hidden");

    document.getElementById("resultComplaintId")
        .textContent = complaint.complaintId;

    document.getElementById("resultCourse")
        .textContent = complaint.course || "—";

    document.getElementById("resultDepartment")
        .textContent = complaint.department || "—";

    document.getElementById("resultFaculty")
        .textContent = complaint.faculty || "—";

    document.getElementById("resultComplaintType")
        .textContent = complaint.complaintType || "—";


    const status =
        complaint.status || "Submitted";

    updateStatusDisplay(status);


    document.getElementById("resultUpdatedAt")
        .textContent =
        `Last updated: ${formatDate(complaint.updatedAt || complaint.createdAt)}`;


    document.getElementById("timelineSubmitted")
        .textContent =
        `Submitted on ${formatDate(complaint.createdAt)}.`;
}


// mostrar el estado
function updateStatusDisplay(status) {

    const resultStatus =
        document.getElementById("resultStatus");

    const badge =
        document.getElementById("resultStatusBadge");

    resultStatus.textContent =
        `${status} ${getStatusEmoji(status)}`;

    badge.textContent = status;

    badge.className = "status-badge";

    const normalized = status.toLowerCase();

    if (normalized.includes("resolved")) {
        badge.classList.add("resolved");
    } else if (normalized.includes("review")) {
        badge.classList.add("under-review");
    } else if (normalized.includes("meeting")) {
        badge.classList.add("meeting");
    } else {
        badge.classList.add("submitted");
    }
}


function getStatusEmoji(status) {

    const normalized = status.toLowerCase();

    if (normalized.includes("resolved")) {
        return "🟢";
    }

    if (normalized.includes("review")) {
        return "🟠";
    }

    if (normalized.includes("meeting")) {
        return "🔵";
    }

    return "⚪";
}


// el copia de id de queja

function setupCopyButton() {

    const copyButton =
        document.getElementById("copyComplaintId");

    copyButton.addEventListener("click", async () => {

        const id = generatedComplaintId.textContent;

        try {

            await navigator.clipboard.writeText(id);

            copyButton.textContent = "Copied!";

            setTimeout(() => {
                copyButton.textContent = "Copy ID";
            }, 1500);

        } catch (error) {

          
            window.prompt("Copy your Complaint ID:", id);
        }
    });
}


// por el telefono

function setupMobileMenu() {

    const button =
        document.getElementById("mobileMenuBtn");

    const nav =
        document.getElementById("mobileNav");

    button.addEventListener("click", () => {

        const isOpen =
            nav.classList.toggle("open");

        button.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });
}


function closeMobileMenu() {

    const nav =
        document.getElementById("mobileNav");

    const button =
        document.getElementById("mobileMenuBtn");

    nav.classList.remove("open");

    button.setAttribute(
        "aria-expanded",
        "false"
    );
}


// mensaje de ayuda

function showMessage(element, message, type) {

    element.textContent = message;

    element.className =
        `form-message ${type}`;

    element.classList.remove("hidden");
}


function clearMessage(element) {

    element.textContent = "";

    element.className =
        "form-message hidden";
}


// FORMATTING HELPERS

function formatFileSize(bytes) {

    if (bytes < 1024) {
        return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(1)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}


function formatDate(dateString) {

    if (!dateString) {
        return "Not available";
    }

    const date = new Date(dateString);

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return date.toLocaleString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}



function escapeHtml(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}



function createDemoComplaintIfNeeded() {

    const complaints =
        JSON.parse(localStorage.getItem("complaints") || "{}");

    if (Object.keys(complaints).length > 0) {
        return;
    }

    const demo = {
        complaintId: "BME-2026-00452",
        studentName: "Demo Student",
        studentId: "BME/2023/00452",
        email: "demo@example.com",
        phone: "",
        faculty: "Faculty of Engineering",
        department: "Biomedical Engineering",
        level: "300",
        course: "Biomedical Instrumentation",
        complaintType: "Wrong Mark",
        description: "Demo complaint for the hackathon presentation.",
        status: "Under Review",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    saveComplaint(demo);
}



    // createDemoComplaintIfNeeded();
