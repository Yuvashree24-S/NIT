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
const workDetailsContainer = document.getElementById('workDetailsContainer');
const documentsTableBody = document.getElementById('documentsTableBody');
const backToWorksBtn = document.getElementById('backToWorksBtn');
const currentWorkName = document.getElementById('currentWorkName');
const uploadLetterBtn = document.getElementById('uploadLetterBtn');
const letterUploadModal = document.getElementById('letterUploadModal');
const closeLetterModal = document.getElementById('closeLetterModal');
const submitLetterBtn = document.getElementById('submitLetter');
const workInfoBody = document.getElementById('workInfoBody');
const workTabButtons = document.querySelectorAll('.work-tab-btn');
const workTabContents = document.querySelectorAll('.work-tab-content');
const addAttributeBtn = document.getElementById('addAttributeBtn');
const addAttributeModal = document.getElementById('addAttributeModal');
const closeAttributeModal = document.getElementById('closeAttributeModal');
const attributeNameInput = document.getElementById('attributeName');
const attributeValueInput = document.getElementById('attributeValue');
const submitAttributeBtn = document.getElementById('submitAttribute');

// Application State
const appState = {
    works: [
        {
            id: 1,
            name: "Bridge Construction",
            description: "Construction of a new bridge over the river",
            documents: 5,
            letters: 3,
            info: {
                biddingType: "Open Tender",
                biddingSystem: "e-Procurement",
                tenderClosingDateTime: "2023-12-01T15:00:00",
                dateTimeOfUploadingTender: "2023-10-15T10:30:00",
                preBidConferenceRequired: "Yes",
                preBidConferenceDateTime: "2023-11-10T14:00:00",
                advertisedValue: "₹ 50,00,00,000",
                tenderingSection: "Civil Works",
                earnestMoney: "₹ 50,00,000",
                validityOfOffer: 120,
                contractType: "Lump Sum",
                periodOfCompletion: "24 months",
                contractCategory: "A",
                biddingStartDate: "2023-10-20"
            },
            customAttributes: [
                { name: "Location", value: "River Ganga, Varanasi" },
                { name: "Project Code", value: "BC-2023-001" }
            ]
        },
        {
            id: 2,
            name: "Road Widening",
            description: "Widening of Highway 101 from 2 to 4 lanes",
            documents: 3,
            letters: 2,
            info: {
                biddingType: "Limited Tender",
                biddingSystem: "Traditional",
                tenderClosingDateTime: "2023-11-20T14:00:00",
                dateTimeOfUploadingTender: "2023-10-10T09:15:00",
                preBidConferenceRequired: "No",
                preBidConferenceDateTime: "N/A",
                advertisedValue: "₹ 25,00,00,000",
                tenderingSection: "Road Construction",
                earnestMoney: "₹ 25,00,000",
                validityOfOffer: 90,
                contractType: "Item Rate",
                periodOfCompletion: "18 months",
                contractCategory: "B",
                biddingStartDate: "2023-10-15"
            },
            customAttributes: [
                { name: "Location", value: "Highway 101, Km 25-50" },
                { name: "Project Code", value: "RW-2023-002" }
            ]
        },
        {
            id: 3,
            name: "Building Renovation",
            description: "Renovation of the municipal building",
            documents: 7,
            letters: 4,
            info: {
                biddingType: "Single Tender",
                biddingSystem: "e-Procurement",
                tenderClosingDateTime: "2023-11-30T17:00:00",
                dateTimeOfUploadingTender: "2023-10-05T11:45:00",
                preBidConferenceRequired: "Yes",
                preBidConferenceDateTime: "2023-11-05T10:00:00",
                advertisedValue: "₹ 15,00,00,000",
                tenderingSection: "Building Works",
                earnestMoney: "₹ 15,00,000",
                validityOfOffer: 60,
                contractType: "Percentage Rate",
                periodOfCompletion: "12 months",
                contractCategory: "C",
                biddingStartDate: "2023-10-12"
            },
            customAttributes: [
                { name: "Location", value: "City Center, Municipal Building" },
                { name: "Project Code", value: "BR-2023-003" }
            ]
        }
    ],
    documents: [
        { id: 1, workId: 1, subject: "Project Proposal", type: "Document", uploadedDate: "2023-10-12", deadline: "2023-11-12", fileName: "proposal.pdf" },
        { id: 2, workId: 1, subject: "Budget Estimate", type: "Document", uploadedDate: "2023-10-13", deadline: "2023-11-13", fileName: "budget.xlsx" },
        { id: 3, workId: 1, subject: "Bank Guarantee", type: "Letter", uploadedDate: "2023-10-14", deadline: "2023-10-30", fileName: "bank_guarantee.pdf" },
        { id: 4, workId: 1, subject: "Site Survey Report", type: "Document", uploadedDate: "2023-10-15", deadline: "N/A", fileName: "survey.pdf" },
        { id: 5, workId: 1, subject: "Approval Letter", type: "Letter", uploadedDate: "2023-10-16", deadline: "2023-11-01", fileName: "approval.pdf" },
        { id: 6, workId: 2, subject: "Traffic Analysis", type: "Document", uploadedDate: "2023-10-08", deadline: "2023-11-08", fileName: "traffic.pdf" },
        { id: 7, workId: 2, subject: "NOC Letter", type: "Letter", uploadedDate: "2023-10-09", deadline: "2023-11-15", fileName: "noc.pdf" },
        { id: 8, workId: 2, subject: "Environmental Impact", type: "Document", uploadedDate: "2023-10-10", deadline: "N/A", fileName: "environment.pdf" },
        { id: 9, workId: 3, subject: "Structural Analysis", type: "Document", uploadedDate: "2023-10-03", deadline: "2023-11-03", fileName: "structural.pdf" },
        { id: 10, workId: 3, subject: "Safety Compliance", type: "Document", uploadedDate: "2023-10-04", deadline: "N/A", fileName: "safety.pdf" }
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

    // Work Detail Tab Switching
    workTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchWorkTab(tabId);
        });
    });

    // Notification Panel
    notificationBtn.addEventListener('click', () => {
        notificationsPanel.classList.add('active');
    });

    closeNotificationsBtn.addEventListener('click', () => {
        notificationsPanel.classList.remove('active');
    });

    // Document Upload Modal (Create Work)
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
        workDetailsContainer.style.display = 'none';
        worksGrid.style.display = 'grid';
        appState.currentWorkId = null;
    });

    // Letter Upload Modal
    uploadLetterBtn.addEventListener('click', () => {
        letterUploadModal.style.display = 'flex';
    });

    closeLetterModal.addEventListener('click', () => {
        letterUploadModal.style.display = 'none';
        resetLetterForm();
    });

    submitLetterBtn.addEventListener('click', handleLetterSubmit);

    // Add Attribute Modal
    addAttributeBtn.addEventListener('click', () => {
        addAttributeModal.style.display = 'flex';
    });

    closeAttributeModal.addEventListener('click', () => {
        addAttributeModal.style.display = 'none';
        resetAttributeForm();
    });

    submitAttributeBtn.addEventListener('click', handleAttributeSubmit);

    // Close modals when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === uploadModal) {
            uploadModal.style.display = 'none';
            resetUploadForm();
        }
        if (event.target === letterUploadModal) {
            letterUploadModal.style.display = 'none';
            resetLetterForm();
        }
        if (event.target === addAttributeModal) {
            addAttributeModal.style.display = 'none';
            resetAttributeForm();
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
        workDetailsContainer.style.display = 'none';
        worksGrid.style.display = 'grid';
    }
}

// Work Detail Tab Switching
function switchWorkTab(tabId) {
    // Update active work tab button
    workTabButtons.forEach(button => {
        button.classList.remove('active');
        if (button.getAttribute('data-tab') === tabId) {
            button.classList.add('active');
        }
    });

    // Show active work tab content
    workTabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === `work-${tabId}-tab`) {
            content.classList.add('active');
        }
    });
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

// Handle Document Submission (Create Work)
function handleDocumentSubmit() {
    const fileInput = documentUpload.files[0];
    const workName = workNameInput.value;

    if (!fileInput) {
        alert('Please select a tender file to create work.');
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
        letters: 0,
        info: {
            biddingType: "To be filled",
            biddingSystem: "To be filled",
            tenderClosingDateTime: "To be filled",
            dateTimeOfUploadingTender: new Date().toISOString(),
            preBidConferenceRequired: "To be filled",
            preBidConferenceDateTime: "To be filled",
            advertisedValue: "To be filled",
            tenderingSection: "To be filled",
            earnestMoney: "To be filled",
            validityOfOffer: 0,
            contractType: "To be filled",
            periodOfCompletion: "To be filled",
            contractCategory: "To be filled",
            biddingStartDate: "To be filled"
        },
        customAttributes: []
    };

    // Create a new document entry
    const newDocument = {
        id: appState.documents.length + 1,
        workId: newWorkId,
        subject: fileInput.name.replace(/\.[^/.]+$/, ""),
        type: "Document",
        uploadedDate: new Date().toISOString().split('T')[0],
        deadline: "N/A",
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
    alert('Work created successfully!');
    
    // Add notification
    addNotification('New Work Created', `A new work "${workName}" has been created`);
}

// Reset Upload Form
function resetUploadForm() {
    documentUpload.value = '';
    workNameInput.value = '';
}

// Reset Letter Form
function resetLetterForm() {
    document.getElementById('letterTemplate').value = '';
    document.getElementById('letterUpload').value = '';
    document.getElementById('letterSubject').value = '';
    document.getElementById('letterSignificantDate').value = '';
}

// Handle Attribute Submission
function handleAttributeSubmit() {
    const attributeName = attributeNameInput.value.trim();
    const attributeValue = attributeValueInput.value.trim();

    if (!attributeName) {
        alert('Please enter attribute name.');
        return;
    }

    if (!attributeValue) {
        alert('Please enter attribute value.');
        return;
    }

    // Get current work
    const work = appState.works.find(w => w.id === appState.currentWorkId);
    if (!work) return;

    // Add custom attribute
    work.customAttributes.push({
        name: attributeName,
        value: attributeValue
    });

    // Update UI
    renderWorkInfo(appState.currentWorkId);

    // Close modal and reset form
    addAttributeModal.style.display = 'none';
    resetAttributeForm();

    alert('Attribute added successfully!');
}

// Reset attribute form
function resetAttributeForm() {
    attributeNameInput.value = '';
    attributeValueInput.value = '';
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
                    <div class="count">${work.letters}</div>
                    <div class="label">Letters</div>
                </div>
            </div>
        `;
        
        workCard.addEventListener('click', () => {
            showWorkDetails(work.id, work.name);
        });
        
        worksGrid.appendChild(workCard);
    });
}

// Show Work Details
function showWorkDetails(workId, workName) {
    appState.currentWorkId = workId;
    currentWorkName.textContent = workName;
    
    // Show work details container
    workDetailsContainer.style.display = 'block';
    worksGrid.style.display = 'none';
    
    // Load work info
    renderWorkInfo(workId);
    
    // Load documents
    renderDocumentsTable(workId);
    
    // Switch to info tab by default
    switchWorkTab('info');
}

// Render Work Information
function renderWorkInfo(workId) {
    const work = appState.works.find(w => w.id === workId);
    if (!work) return;
    
    workInfoBody.innerHTML = '';
    
    // Standard info fields
    const infoFields = [
        { label: 'Name of Work', value: work.name },
        { label: 'Bidding Type', value: work.info.biddingType },
        { label: 'Bidding System', value: work.info.biddingSystem },
        { label: 'Tender Closing Date Time', value: formatDateTime(work.info.tenderClosingDateTime) },
        { label: 'Date Time Of Uploading Tender', value: formatDateTime(work.info.dateTimeOfUploadingTender) },
        { label: 'Pre-Bid Conference Required', value: work.info.preBidConferenceRequired },
        { label: 'Pre-Bid Conference Date Time', value: formatDateTime(work.info.preBidConferenceDateTime) },
        { label: 'Advertised Value', value: work.info.advertisedValue },
        { label: 'Tendering Section', value: work.info.tenderingSection },
        { label: 'Earnest Money (Rs.)', value: work.info.earnestMoney },
        { label: 'Validity of Offer (Days)', value: work.info.validityOfOffer },
        { label: 'Contract Type', value: work.info.contractType },
        { label: 'Period of Completion', value: work.info.periodOfCompletion },
        { label: 'Contract Category', value: work.info.contractCategory },
        { label: 'Bidding Start Date', value: work.info.biddingStartDate }
    ];
    
    // Add standard fields
    infoFields.forEach(field => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="info-label">${field.label}</td>
            <td class="info-value">${field.value}</td>
        `;
        workInfoBody.appendChild(row);
    });
    
    // Add custom attributes
    work.customAttributes.forEach(attr => {
        const row = document.createElement('tr');
        row.className = 'custom-attribute';
        row.innerHTML = `
            <td class="info-label">${attr.name}</td>
            <td class="info-value">
                <div class="custom-attribute-content">
                    ${attr.value}
                    <button class="remove-attribute-btn" data-attribute-name="${attr.name}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </td>
        `;
        workInfoBody.appendChild(row);
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-attribute-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const attributeName = e.currentTarget.getAttribute('data-attribute-name');
            if (confirm(`Remove attribute "${attributeName}"?`)) {
                removeCustomAttribute(attributeName);
            }
        });
    });
}

// Format date time
function formatDateTime(dateTimeStr) {
    if (!dateTimeStr || dateTimeStr === 'To be filled' || dateTimeStr === 'N/A') {
        return dateTimeStr;
    }
    
    try {
        const date = new Date(dateTimeStr);
        return date.toLocaleString();
    } catch {
        return dateTimeStr;
    }
}

// Function to remove custom attribute
function removeCustomAttribute(attributeName) {
    const work = appState.works.find(w => w.id === appState.currentWorkId);
    if (!work) return;
    
    const index = work.customAttributes.findIndex(attr => attr.name === attributeName);
    if (index !== -1) {
        work.customAttributes.splice(index, 1);
        renderWorkInfo(appState.currentWorkId);
        alert('Attribute removed successfully!');
    }
}

// Render Documents Table
function renderDocumentsTable(workId) {
    const workDocuments = appState.documents.filter(doc => doc.workId === workId);
    
    documentsTableBody.innerHTML = '';
    
    workDocuments.forEach((doc, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${doc.subject}</td>
            <td><span class="doc-type ${doc.type.toLowerCase()}">${doc.type}</span></td>
            <td>${doc.uploadedDate}</td>
            <td>${doc.deadline}</td>
            <td>${doc.fileName}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn preview-btn" data-file="${doc.fileName}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn download-btn" data-file="${doc.fileName}">
                        <i class="fas fa-download"></i>
                    </button>
                    <button class="action-btn share-btn" data-file="${doc.fileName}" data-doc-id="${doc.id}">
                        <i class="fas fa-share-alt"></i>
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
    
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const fileName = e.currentTarget.getAttribute('data-file');
            const docId = e.currentTarget.getAttribute('data-doc-id');
            shareDocument(fileName, docId);
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
}

// Delete Document
function deleteDocument(docId) {
    const docIndex = appState.documents.findIndex(doc => doc.id === docId);
    if (docIndex !== -1) {
        const document = appState.documents[docIndex];
        appState.documents.splice(docIndex, 1);
        
        // Update work document/letter count
        const work = appState.works.find(w => w.id === appState.currentWorkId);
        if (work) {
            if (document.type === 'Document') {
                work.documents = Math.max(0, work.documents - 1);
            } else if (document.type === 'Letter') {
                work.letters = Math.max(0, work.letters - 1);
            }
        }
        
        // Update UI
        renderDocumentsTable(appState.currentWorkId);
        renderWorksGrid();
        
        alert('Document deleted successfully.');
    }
}

// Handle Letter Submission
function handleLetterSubmit() {
    const templateSelect = document.getElementById('letterTemplate');
    const fileInput = document.getElementById('letterUpload');
    const subjectInput = document.getElementById('letterSubject');
    const significantDate = document.getElementById('letterSignificantDate');
    
    const template = templateSelect.value;
    const file = fileInput.files[0];
    const subject = subjectInput.value || template;
    const sigDate = significantDate.value;
    
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
        id: appState.documents.length + 1,
        workId: appState.currentWorkId,
        subject: subject,
        type: "Letter",
        uploadedDate: new Date().toISOString().split('T')[0],
        deadline: sigDate,
        fileName: file.name
    };
    
    // Update state
    appState.documents.push(newLetter);
    
    // Update work letter count
    const work = appState.works.find(w => w.id === appState.currentWorkId);
    if (work) {
        work.letters++;
    }
    
    // Update UI
    renderDocumentsTable(appState.currentWorkId);
    renderWorksGrid();
    
    // Close modal
    letterUploadModal.style.display = 'none';
    
    // Reset form
    resetLetterForm();
    
    // Show success message
    alert('Letter uploaded successfully!');
    
    // Add notification
    addNotification('New Letter Uploaded', `A new ${subject} letter has been uploaded for ${work.name}`);
}

// Function to handle document sharing
function shareDocument(fileName, docId) {
    // Get the document
    const doc = appState.documents.find(d => d.id === parseInt(docId));
    if (!doc) return;
    
    // Create a share modal
    const shareModal = document.createElement('div');
    shareModal.className = 'modal';
    shareModal.id = 'shareModal';
    shareModal.style.display = 'flex';
    
    shareModal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Share Document</h3>
                <button class="close-btn" id="closeShareModal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label for="shareEmail">Share via Email</label>
                    <input type="email" id="shareEmail" placeholder="Enter email address">
                </div>
                <div class="form-group">
                    <label for="shareMessage">Message (Optional)</label>
                    <textarea id="shareMessage" placeholder="Add a message..." rows="3"></textarea>
                </div>
                <div class="form-group">
                    <label>Share Link</label>
                    <div class="share-link-container">
                        <input type="text" id="shareLink" value="https://work-management.app/share/${docId}" readonly>
                        <button class="copy-link-btn" id="copyLinkBtn">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                    </div>
                </div>
                <div class="share-options">
                    <p>Share via:</p>
                    <div class="share-buttons">
                        <button class="share-option-btn email-btn">
                            <i class="fas fa-envelope"></i> Email
                        </button>
                        <button class="share-option-btn whatsapp-btn">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </button>
                        <button class="share-option-btn slack-btn">
                            <i class="fab fa-slack"></i> Slack
                        </button>
                    </div>
                </div>
                <button class="submit-btn" id="sendShareBtn">Send Share</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(shareModal);
    
    // Add event listeners for the share modal
    const closeShareModal = document.getElementById('closeShareModal');
    const copyLinkBtn = document.getElementById('copyLinkBtn');
    const shareLink = document.getElementById('shareLink');
    const sendShareBtn = document.getElementById('sendShareBtn');
    const emailInput = document.getElementById('shareEmail');
    
    closeShareModal.addEventListener('click', () => {
        document.body.removeChild(shareModal);
    });
    
    copyLinkBtn.addEventListener('click', () => {
        shareLink.select();
        document.execCommand('copy');
        alert('Link copied to clipboard!');
    });
    
    sendShareBtn.addEventListener('click', () => {
        const email = emailInput.value.trim();
        if (!email) {
            alert('Please enter an email address.');
            return;
        }
        
        // Simulate sending share
        alert(`Document "${fileName}" has been shared with ${email}`);
        document.body.removeChild(shareModal);
        
        // Add notification
        addNotification('Document Shared', `You shared "${fileName}" with ${email}`);
    });
    
    // Share option buttons
    document.querySelectorAll('.share-option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const platform = e.currentTarget.classList[1].replace('-btn', '');
            alert(`Sharing "${fileName}" via ${platform}...`);
        });
    });
    
    // Close modal when clicking outside
    shareModal.addEventListener('click', (e) => {
        if (e.target === shareModal) {
            document.body.removeChild(shareModal);
        }
    });
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
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    
    // Check documents for deadlines
    appState.documents.forEach(doc => {
        if (doc.deadline && doc.deadline !== 'N/A') {
            const deadline = new Date(doc.deadline);
            if (deadline > today && deadline <= nextWeek) {
                const work = appState.works.find(w => w.id === doc.workId);
                const daysUntilDeadline = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
                addNotification(
                    'Deadline Approaching', 
                    `${doc.subject} for ${work.name} is due in ${daysUntilDeadline} day(s)`
                );
            }
        }
    });
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);