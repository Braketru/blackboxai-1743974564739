// Patient data storage
let patients = JSON.parse(localStorage.getItem('patients')) || [];

// DOM Elements
const patientForm = document.getElementById('patientForm');
const vitalsForm = document.getElementById('vitalsForm');
const diagnosisForm = document.getElementById('diagnosisForm');
const labForm = document.getElementById('labForm');

// Register new patient
patientForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(patientForm);
    const patient = {
        id: Date.now(),
        name: formData.get('name'),
        age: formData.get('age'),
        gender: formData.get('gender'),
        vitals: [],
        diagnoses: [],
        labTests: []
    };
    patients.push(patient);
    savePatients();
    alert('Patient registered successfully!');
    patientForm.reset();
});

// Record vitals
vitalsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(vitalsForm);
    const vitals = {
        date: new Date().toISOString(),
        temperature: formData.get('temperature'),
        bloodPressure: formData.get('bloodPressure'),
        pulse: formData.get('pulse')
    };
    // In a real app, we would associate vitals with specific patient
    alert('Vitals recorded successfully!');
    vitalsForm.reset();
});

// Save patients to localStorage
function savePatients() {
    localStorage.setItem('patients', JSON.stringify(patients));
}

// Generate report
function generateReport(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (!patient) return;
    
    let report = `PATIENT REPORT\n\n`;
    report += `Name: ${patient.name}\n`;
    report += `Age: ${patient.age}\n`;
    report += `Gender: ${patient.gender}\n\n`;
    
    report += `VITALS HISTORY:\n`;
    patient.vitals.forEach(v => {
        report += `- ${new Date(v.date).toLocaleString()}: Temp ${v.temperature}°C, BP ${v.bloodPressure}, Pulse ${v.pulse}\n`;
    });
    
    report += `\nDIAGNOSES:\n`;
    patient.diagnoses.forEach(d => {
        report += `- ${new Date(d.date).toLocaleString()}: ${d.diagnosis}\n`;
    });
    
    report += `\nLAB TESTS:\n`;
    patient.labTests.forEach(t => {
        report += `- ${t.test}: ${t.result}\n`;
    });
    
    return report;
}