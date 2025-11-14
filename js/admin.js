// Admin Module
import { getAllDonors, deleteDonor, updateDonorAvailability } from './donor.js';
import { getAllRequests, deleteRequest } from './request.js';

/**
 * Get all data for admin dashboard
 */
export async function getAdminData() {
    try {
        const donorsResult = await getAllDonors();
        const requestsResult = await getAllRequests();
        
        return {
            success: true,
            donors: donorsResult.success ? donorsResult.donors : [],
            requests: requestsResult.success ? requestsResult.requests : []
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Delete donor (admin function)
 */
export async function adminDeleteDonor(donorId) {
    return await deleteDonor(donorId);
}

/**
 * Delete request (admin function)
 */
export async function adminDeleteRequest(requestId) {
    return await deleteRequest(requestId);
}

/**
 * Update donor availability (admin function)
 */
export async function adminUpdateDonorAvailability(donorId, availability) {
    return await updateDonorAvailability(donorId, availability);
}

