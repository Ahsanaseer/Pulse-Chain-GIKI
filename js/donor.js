// Donor Management Module
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, where } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { db } from './firebase-config.js';

/**
 * Add a new donor
 */
export async function addDonor(donorData) {
    try {
        const docRef = await addDoc(collection(db, 'allDonors'), {
            fullName: donorData.fullName,
            age: donorData.age,
            gender: donorData.gender,
            bloodGroup: donorData.bloodGroup,
            contact: donorData.contact,
            department: donorData.department,
            availability: donorData.availability,
            medicalNote: donorData.medicalNote || '',
            timestamp: new Date().toISOString()
        });
        return { success: true, id: docRef.id };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Get all donors
 */
export async function getAllDonors() {
    try {
        const querySnapshot = await getDocs(collection(db, 'allDonors'));
        const donors = [];
        querySnapshot.forEach((doc) => {
            donors.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, donors: donors };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Get donors filtered by blood group and availability
 */
export async function getFilteredDonors(bloodGroup, availability = 'Yes') {
    try {
        const q = query(
            collection(db, 'allDonors'),
            where('bloodGroup', '==', bloodGroup),
            where('availability', '==', availability)
        );
        const querySnapshot = await getDocs(q);
        const donors = [];
        querySnapshot.forEach((doc) => {
            donors.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, donors: donors };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Delete a donor
 */
export async function deleteDonor(donorId) {
    try {
        await deleteDoc(doc(db, 'allDonors', donorId));
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Update donor availability
 */
export async function updateDonorAvailability(donorId, availability) {
    try {
        await updateDoc(doc(db, 'allDonors', donorId), {
            availability: availability
        });
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

