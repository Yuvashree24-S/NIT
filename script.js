// DOM Elements
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const notificationBtn = document.getElementById('notificationBtn');
const notificationsPanel = document.getElementById('notificationsPanel');
const closeNotificationsBtn = document.getElementById('closeNotifications');
const uploadDocumentBtn = document.getElementById('uploadDocumentBtn');
const uploadModal = document.getElementById('uploadModal');
const closeUploadModal = document.getElementById('closeUploadModal');
const documentUpload = document.getElementById('documentUpload');
const workNameInput = document.getElementById('workName');
const submitDocumentBtn = document.getElementById('submitDocument');
const worksGrid = document.getElementById('worksGrid');
const documentsTableContainer = document.getElementById('documentsTableContainer');
const documentsTableBody = document.getElementById('documentsTableBody');
const backToWorksBtn = document.getElementById('backToWorksBtn');
const currentWorkName = document.getElementById('currentWorkName');
const uploadTenderBtn = document.getElementById('uploadTenderBtn');
const tenderUploadModal = document.getElementById('tenderUploadModal');
const closeTenderModal = document.getElementById('closeTenderModal');
const submitTenderBtn = document.getElementById('submitTender');
const tendersTableBody = document.getElementById('tendersTableBody');
const uploadLetterBtn = document.getElementById('uploadLetterBtn');
const uploadTemplateBtn = document.getElementById('uploadTemplateBtn');
const letterUploadModal = document.getElementById('letterUploadModal');
const closeLetterModal = document.getElementById('closeLetterModal');
const submitLetterBtn = document.getElementById('submitLetter');
const lettersTableBody = document.getElementById('lettersTableBody');

// Application State
const appState = {
    works: [
        {
            id: 1,
            name: "Bridge Construction",
            description: "Construction of a new bridge over the river",
            documents: 5,
            tenders: 2,
            letters: 3
        },
        {
            id: 2,
            name: "Road Widening",
            description: "Widening of Highway 101 from 2 to 4 lanes",
            documents: 3,
            tenders: 1,
            letters: 2
        },
        {
            id: 3,
            name: "Building Renovation",
            description: "Renovation of the municipal building",
            documents: 7,
            tenders: 3,
            letters: 4
        },
        {
            id: 4,
            name: "Park Development",
            description: "Development of a new public park",
            documents: 4,
            tenders: 2,
            letters: 1
        }
    ],
    documents: [
        { id: 1, workId: 1, subject: "Project Proposal", status: "Completed", fileName: "proposal.pdf" },
        { id: 2, workId: 1, subject: "Budget Estimate", status: "In Progress", fileName: "budget.xlsx" },
        { id: 3, workId: 1, subject: "Site Survey Report", status: "Initiated", fileName: "survey.pdf" },
        { id: 4, workId: 2, subject: "Traffic Analysis", status: "Completed", fileName: "traffic.pdf" },
        { id: 5, workId: 2, subject: "Environmental Impact", status: "Has to be initiated", fileName: "environment.pdf" }
    ],
    tenders: [
        { id: 1, workName: "Bridge Construction", fileName: "tender_bridge.pdf", uploadedDate: "2023-10-15", significantDate: "2023-12-01" },
        { id: 2, workName: "Road Widening", fileName: "tender_road.pdf", uploadedDate: "2023-10-10", significantDate: "2023-11-20" },
        { id: 3, workName: "Building Renovation", fileName: "tender_renovation.pdf", uploadedDate: "2023-10-05", significantDate: "2023-11-30" }
    ],
    letters: [
        { id: 1, workName: "Bridge Construction", subject: "Bank Guarantee", fileName: "bank_guarantee.pdf", uploadedDate: "2023-10-12", significantDate: "2023-10-30" },
        { id: 2, workName: "Road Widening", subject: "NOC", fileName: "noc.pdf", uploadedDate: "2023-10-08", significantDate: "2023-11-15" },
        { id: 3, workName: "Building Renovation", subject: "Approval Letter", fileName: "approval.pdf", uploadedDate: "2023-10-03", significantDate: "2023-10-25" }
    ],
    notifications: [
        { id: 1, title: "Deadline Approaching", message: "Tender for Bridge Construction is due in 3 days", time: "2 hours ago", read: false },
        { id: 2, title: "New Document Uploaded", message: "A new document has been uploaded for Road Widening", time: "1 day ago", read: false },
        { id: 3, title: "Letter Approval Required", message: "Bank Guarantee for Building Renovation needs approval", time: "2 days ago", read: true }
    ],
    currentWorkId: null
};

// Initialize the application
function initApp() {
    renderWorksGrid();
    renderTendersTable();
    renderLettersTable();
    renderNotifications();
    setupEventListeners();
    checkForUpcomingDeadlines();
}

// Setup Event Listeners
function setupEventListeners() {
    // Tab Switching
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Notification Panel
    notificationBtn.addEventListener('click', () => {
        notificationsPanel.classList.add('active');
    });

    closeNotificationsBtn.addEventListener('click', () => {
        notificationsPanel.classList.remove('active');
    });

    // Document Upload Modal
    uploadDocumentBtn.addEventListener('click', () => {
        uploadModal.style.display = 'flex';
    });

    closeUploadModal.addEventListener('click', () => {
        uploadModal.style.display = 'none';
        resetUploadForm();
    });

    documentUpload.addEventListener('change', handleFileUpload);

    submitDocumentBtn.addEventListener('click', handleDocumentSubmit);

    // Back to Works button
    backToWorksBtn.addEventListener('click', () => {
        documentsTableContainer.style.display = 'none';
        worksGrid.style.display = 'grid';
        appState.currentWorkId = null;
    });

    // Tender Upload Modal
    uploadTenderBtn.addEventListener('click', () => {
        tenderUploadModal.style.display = 'flex';
    });

    closeTenderModal.addEventListener('click', () => {
        tenderUploadModal.style.display = 'none';
    });

    submitTenderBtn.addEventListener('click', handleTenderSubmit);

    // Letter Upload Modal
    uploadLetterBtn.addEventListener('click', () => {
        letterUploadModal.style.display = 'flex';
    });

    closeLetterModal.addEventListener('click', () => {
        letterUploadModal.style.display = 'none';
    });

    submitLetterBtn.addEventListener('click', handleLetterSubmit);

    // Upload Template Button
    uploadTemplateBtn.addEventListener('click', () => {
        alert('Template upload functionality would be implemented with backend integration.');
    });

    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === uploadModal) {
            uploadModal.style.display = 'none';
            resetUploadForm();
        }
        if (event.target === tenderUploadModal) {
            tenderUploadModal.style.display = 'none';
        }
        if (event.target === letterUploadModal) {
            letterUploadModal.style.display = 'none';
        }
    });
}

// Tab Switching Function
function switchTab(tabId) {
    // Update active tab button
    tabButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-tab') === tabId) {
            button.classList.add('active');
        }
    });

    // Show active tab content
    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `${tabId}-tab`) {
            content.classList.add('active');
        }
    });

    // If switching to home tab, show works grid
    if (tabId === 'home' && !appState.currentWorkId) {
        documentsTableContainer.style.display = 'none';
        worksGrid.style.display = 'grid';
    }
}

// Handle File Upload
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        // Extract work name from filename (simulated extraction)
        const fileName = file.name;
        const extractedWorkName = extractWorkName(fileName);
        workNameInput.value = extractedWorkName;
    }
}

// Simulate work name extraction from filename
function extractWorkName(fileName) {
    // This is a simplified simulation
    const name = fileName.replace(/\.[^/.]+$/, ""); // Remove extension
    const words = name.split(/[\s_\-]+/);
    
    // Capitalize first letter of each word and join
    return words.map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
}

// Handle Document Submission
function handleDocumentSubmit() {
    const fileInput = documentUpload.files[0];
    const workName = workNameInput.value;

    if (!fileInput) {
        alert('Please select a file to upload.');
        return;
    }

    if (!workName) {
        alert('Work name could not be extracted. Please enter a work name manually.');
        return;
    }

    // Create a new work entry
    const newWorkId = appState.works.length + 1;
    const newWork = {
        id: newWorkId,
        name: workName,
        description: `Project details for ${workName}`,
        documents: 1,
        tenders: 0,
        letters: 0
    };

    // Create a new document entry
    const newDocument = {
        id: appState.documents.length + 1,
        workId: newWorkId,
        subject: fileInput.name.replace(/\.[^/.]+$/, ""),
        status: "Has to be initiated",
        fileName: fileInput.name
    };

    // Update state
    appState.works.push(newWork);
    appState.documents.push(newDocument);

    // Update UI
    renderWorksGrid();

    // Close modal and reset form
    uploadModal.style.display = 'none';
    resetUploadForm();

    // Show success message
    alert('Document uploaded successfully!');
    
    // Add notification
    addNotification('New Document Uploaded', `A new document has been uploaded for ${workName}`);
}

// Reset Upload Form
function resetUploadForm() {
    documentUpload.value = '';
    workNameInput.value = '';
}

// Render Works Grid
function renderWorksGrid() {
    worksGrid.innerHTML = '';
    
    appState.works.forEach(work => {
        const workCard = document.createElement('div');
        workCard.className = 'work-card';
        workCard.setAttribute('data-work-id', work.id);
        
        workCard.innerHTML = `
            <h3>${work.name}</h3>
            <p>${work.description}</p>
            <div class="work-stats">
                <div class="stat">
                    <div class="count">${work.documents}</div>
                    <div class="label">Documents</div>
                </div>
                <div class="stat">
                    <div class="count">${work.tenders}</div>
                    <div class="label">Tenders</div>
                </div>
                <div class="stat">
                    <div class="count">${work.letters}</div>
                    <div class="label">Letters</div>
                </div>
            </div>
        `;
        
        workCard.addEventListener('click', () => {
            showDocumentsForWork(work.id, work.name);
        });
        
        worksGrid.appendChild(workCard);
    });
}

// Show Documents for Selected Work
function showDocumentsForWork(workId, workName) {
    appState.currentWorkId = workId;
    currentWorkName.textContent = workName;
    
    // Filter documents for the selected work
    const workDocuments = appState.documents.filter(doc => doc.workId === workId);
    
    // Update documents table
    documentsTableBody.innerHTML = '';
    
    workDocuments.forEach((doc, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${doc.subject}</td>
            <td><span class="status-badge status-${doc.status.toLowerCase().replace(/\s+/g, '-')}">${doc.status}</span></td>
            <td>${doc.fileName}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn preview-btn" data-file="${doc.fileName}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn download-btn" data-file="${doc.fileName}">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="action-btn delete-btn" data-doc-id="${doc.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        documentsTableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('.preview-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const fileName = e.currentTarget.getAttribute('data-file');
            alert(`Preview functionality for ${fileName} would open in a new window.`);
        });
    });
    
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const fileName = e.currentTarget.getAttribute('data-file');
            alert(`Downloading ${fileName}...`);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const docId = parseInt(e.currentTarget.getAttribute('data-doc-id'));
            if (confirm('Are you sure you want to delete this document?')) {
                deleteDocument(docId);
            }
        });
    });
    
    // Show documents table and hide works grid
    worksGrid.style.display = 'none';
    documentsTableContainer.style.display = 'block';
}

// Delete Document
function deleteDocument(docId) {
    // Remove from state
    const docIndex = appState.documents.findIndex(doc => doc.id === docId);
    if (docIndex !== -1) {
        appState.documents.splice(docIndex, 1);
        
        // Update work document count
        const workId = appState.currentWorkId;
        const work = appState.works.find(w => w.id === workId);
        if (work) {
            work.documents = Math.max(0, work.documents - 1);
        }
        
        // Update UI
        showDocumentsForWork(workId, currentWorkName.textContent);
        renderWorksGrid();
        
        alert('Document deleted successfully.');
    }
}

// Handle Tender Submission
function handleTenderSubmit() {
    const workSelect = document.getElementById('workSelect');
    const fileInput = document.getElementById('tenderUpload');
    const significantDate = document.getElementById('significantDate');
    
    const workName = workSelect.value;
    const file = fileInput.files[0];
    const sigDate = significantDate.value;
    
    if (!workName) {
        alert('Please select a work.');
        return;
    }
    
    if (!file) {
        alert('Please select a file to upload.');
        return;
    }
    
    if (!sigDate) {
        alert('Please select a significant date.');
        return;
    }
    
    // Create new tender
    const newTender = {
        id: appState.tenders.length + 1,
        workName: workName,
        fileName: file.name,
        uploadedDate: new Date().toISOString().split('T')[0], // Today's date
        significantDate: sigDate
    };
    
    // Update state
    appState.tenders.push(newTender);
    
    // Update work tender count
    const work = appState.works.find(w => w.name === workName);
    if (work) {
        work.tenders++;
    }
    
    // Update UI
    renderTendersTable();
    renderWorksGrid();
    
    // Close modal
    tenderUploadModal.style.display = 'none';
    
    // Reset form
    workSelect.value = '';
    fileInput.value = '';
    significantDate.value = '';
    
    // Show success message
    alert('Tender uploaded successfully!');
    
    // Add notification
    addNotification('New Tender Uploaded', `A new tender has been uploaded for ${workName}`);
}

// Render Tenders Table
function renderTendersTable() {
    tendersTableBody.innerHTML = '';
    
    appState.tenders.forEach((tender, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${tender.workName}</td>
            <td>${tender.fileName}</td>
            <td>${tender.uploadedDate}</td>
            <td>${tender.significantDate}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn preview-btn" data-file="${tender.fileName}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn download-btn" data-file="${tender.fileName}">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="action-btn delete-btn" data-tender-id="${tender.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tendersTableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('#tendersTableBody .preview-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const fileName = e.currentTarget.getAttribute('data-file');
            alert(`Preview functionality for ${fileName} would open in a new window.`);
        });
    });
    
    document.querySelectorAll('#tendersTableBody .download-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const fileName = e.currentTarget.getAttribute('data-file');
            alert(`Downloading ${fileName}...`);
        });
    });
    
    document.querySelectorAll('#tendersTableBody .delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tenderId = parseInt(e.currentTarget.getAttribute('data-tender-id'));
            if (confirm('Are you sure you want to delete this tender?')) {
                deleteTender(tenderId);
            }
        });
    });
}

// Delete Tender
function deleteTender(tenderId) {
    const tenderIndex = appState.tenders.findIndex(t => t.id === tenderId);
    if (tenderIndex !== -1) {
        const tender = appState.tenders[tenderIndex];
        
        // Update work tender count
        const work = appState.works.find(w => w.name === tender.workName);
        if (work) {
            work.tenders = Math.max(0, work.tenders - 1);
        }
        
        // Remove from state
        appState.tenders.splice(tenderIndex, 1);
        
        // Update UI
        renderTendersTable();
        renderWorksGrid();
        
        alert('Tender deleted successfully.');
    }
}

// Handle Letter Submission
function handleLetterSubmit() {
    const workSelect = document.getElementById('letterWorkSelect');
    const templateSelect = document.getElementById('letterTemplate');
    const fileInput = document.getElementById('letterUpload');
    const subjectInput = document.getElementById('letterSubject');
    const significantDate = document.getElementById('letterSignificantDate');
    
    const workName = workSelect.value;
    const template = templateSelect.value;
    const file = fileInput.files[0];
    const subject = subjectInput.value || template;
    const sigDate = significantDate.value;
    
    if (!workName) {
        alert('Please select a work.');
        return;
    }
    
    if (!template) {
        alert('Please select a letter template.');
        return;
    }
    
    if (!file) {
        alert('Please select a file to upload.');
        return;
    }
    
    if (!sigDate) {
        alert('Please select a significant date.');
        return;
    }
    
    // Create new letter
    const newLetter = {
        id: appState.letters.length + 1,
        workName: workName,
        subject: subject,
        fileName: file.name,
        uploadedDate: new Date().toISOString().split('T')[0], // Today's date
        significantDate: sigDate
    };
    
    // Update state
    appState.letters.push(newLetter);
    
    // Update work letter count
    const work = appState.works.find(w => w.name === workName);
    if (work) {
        work.letters++;
    }
    
    // Update UI
    renderLettersTable();
    renderWorksGrid();
    
    // Close modal
    letterUploadModal.style.display = 'none';
    
    // Reset form
    workSelect.value = '';
    templateSelect.value = '';
    fileInput.value = '';
    subjectInput.value = '';
    significantDate.value = '';
    
    // Show success message
    alert('Letter uploaded successfully!');
    
    // Add notification
    addNotification('New Letter Uploaded', `A new ${subject} letter has been uploaded for ${workName}`);
}

// Render Letters Table
function renderLettersTable() {
    lettersTableBody.innerHTML = '';
    
    appState.letters.forEach((letter, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${letter.workName}</td>
            <td>${letter.subject}</td>
            <td>${letter.fileName}</td>
            <td>${letter.uploadedDate}</td>
            <td>${letter.significantDate}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn preview-btn" data-file="${letter.fileName}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn download-btn" data-file="${letter.fileName}">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="action-btn delete-btn" data-letter-id="${letter.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        lettersTableBody.appendChild(row);
    });
    
    // Add event listeners to action buttons
    document.querySelectorAll('#lettersTableBody .preview-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const fileName = e.currentTarget.getAttribute('data-file');
            alert(`Preview functionality for ${fileName} would open in a new window.`);
        });
    });
    
    document.querySelectorAll('#lettersTableBody .download-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const fileName = e.currentTarget.getAttribute('data-file');
            alert(`Downloading ${fileName}...`);
        });
    });
    
    document.querySelectorAll('#lettersTableBody .delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const letterId = parseInt(e.currentTarget.getAttribute('data-letter-id'));
            if (confirm('Are you sure you want to delete this letter?')) {
                deleteLetter(letterId);
            }
        });
    });
}

// Delete Letter
function deleteLetter(letterId) {
    const letterIndex = appState.letters.findIndex(l => l.id === letterId);
    if (letterIndex !== -1) {
        const letter = appState.letters[letterIndex];
        
        // Update work letter count
        const work = appState.works.find(w => w.name === letter.workName);
        if (work) {
            work.letters = Math.max(0, work.letters - 1);
        }
        
        // Remove from state
        appState.letters.splice(letterIndex, 1);
        
        // Update UI
        renderLettersTable();
        renderWorksGrid();
        
        alert('Letter deleted successfully.');
    }
}

// Render Notifications
function renderNotifications() {
    const notificationsList = document.getElementById('notificationsList');
    notificationsList.innerHTML = '';
    
    appState.notifications.forEach(notification => {
        const notificationItem = document.createElement('div');
        notificationItem.className = `notification-item ${notification.read ? '' : 'unread'}`;
        
        notificationItem.innerHTML = `
            <div class="notification-title">${notification.title}</div>
            <div class="notification-message">${notification.message}</div>
            <div class="notification-time">${notification.time}</div>
        `;
        
        notificationItem.addEventListener('click', () => {
            // Mark as read
            notification.read = true;
            renderNotifications();
            
            // Update notification count
            updateNotificationCount();
        });
        
        notificationsList.appendChild(notificationItem);
    });
    
    updateNotificationCount();
}

// Update Notification Count
function updateNotificationCount() {
    const unreadCount = appState.notifications.filter(n => !n.read).length;
    const notificationCount = document.querySelector('.notification-count');
    
    if (unreadCount > 0) {
        notificationCount.textContent = unreadCount;
        notificationCount.style.display = 'flex';
    } else {
        notificationCount.style.display = 'none';
    }
}

// Add Notification
function addNotification(title, message) {
    const newNotification = {
        id: appState.notifications.length + 1,
        title: title,
        message: message,
        time: 'Just now',
        read: false
    };
    
    appState.notifications.unshift(newNotification);
    renderNotifications();
}

// Check for Upcoming Deadlines (Notification Simulation)
function checkForUpcomingDeadlines() {
    // This function would check for upcoming deadlines in a real application
    // For now, we'll simulate by checking if there are any deadlines in the next 7 days
    
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    // Check tenders
    appState.tenders.forEach(tender => {
        const deadline = new Date(tender.significantDate);
        if (deadline > today && deadline <= nextWeek) {
            const daysUntilDeadline = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
            addNotification(
                'Deadline Approaching', 
                `Tender for ${tender.workName} is due in ${daysUntilDeadline} day(s)`
            );
        }
    });
    
    // Check letters
    appState.letters.forEach(letter => {
        const deadline = new Date(letter.significantDate);
        if (deadline > today && deadline <= nextWeek) {
            const daysUntilDeadline = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
            addNotification(
                'Letter Deadline Approaching', 
                `${letter.subject} for ${letter.workName} is due in ${daysUntilDeadline} day(s)`
            );
        }
    });
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);