// Blood Request Management Module
import { collection, addDoc, getDocs, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { db } from './firebase-config.js';

/**
 * Create a new blood request
 */
export async function createRequest(requestData) {
    try {
        const docRef = await addDoc(collection(db, 'requests'), {
            requesterName: requestData.requesterName,
            bloodGroup: requestData.bloodGroup,
            contact: requestData.contact,
            department: requestData.department,
            reason: requestData.reason || '',
            timestamp: new Date().toISOString()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Get all blood requests
 */
export async function getAllRequests() {
    try {
        const querySnapshot = await getDocs(collection(db, 'requests'));
        const requests = [];
        querySnapshot.forEach((doc) => {
            requests.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, requests: requests };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Delete a blood request
 */
export async function deleteRequest(requestId) {
    try {
        await deleteDoc(doc(db, 'requests', requestId));
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

