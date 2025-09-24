// security-test.js
import axios from "axios";

const BASE_URL = "http://localhost:8080"; // Change selon ton backend
const TEST_ENDPOINTS = [
    "/agent",      // endpoint sensible
    "/admin",      // endpoint admin
    "/auth/login",      // endpoint login
];

// Test injection SQL / NoSQL
async function testInjection() {
    console.log("[+] Test Injection SQL / NoSQL");
    try {
        const res = await axios.post(`${BASE_URL}/auth/login`, {
            username: `" OR "1"="1"`,
            password: "anything"
        });
        console.log("⚠️ Injection possible !", res.data);
    } catch (err) {
        console.log("✅ Injection bloquée :", err.response?.status);
    }
}

// Test accès sans auth
async function testAccess() {
    console.log("[+] Test accès sans authentification");
    for (let endpoint of TEST_ENDPOINTS) {
        try {
            const res = await axios.get(`${BASE_URL}${endpoint}`);
            console.log(`⚠️ Accès possible sur ${endpoint} :`, res.data);
        } catch (err) {
            console.log(`✅ Accès bloqué sur ${endpoint} :`, err.response?.status);
        }
    }
}

// Test XSS
async function testXSS() {
    console.log("[+] Test XSS");
    try {
        const res = await axios.post(`${BASE_URL}/api/comments`, {
            comment: `<script>alert("XSS")</script>`
        });
        console.log("⚠️ Potentiel XSS :", res.data);
    } catch (err) {
        console.log("✅ XSS bloqué :", err.response?.status);
    }
}

// Lancer tous les tests
async function runTests() {
    await testInjection();
    await testAccess();
    await testXSS();
}

runTests();
