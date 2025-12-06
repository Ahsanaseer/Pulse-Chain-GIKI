
import { getAllDonors, deleteDonor, updateDonorAvailability, getFilteredDonors } from './donor.js';
import { getAllRequests, deleteRequest, updateRequestStatus } from './request.js';


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


export async function adminDeleteDonor(donorId) {
    return await deleteDonor(donorId);
}


export async function adminDeleteRequest(requestId) {
    return await deleteRequest(requestId);
}


export async function adminUpdateDonorAvailability(donorId, availability) {
    return await updateDonorAvailability(donorId, availability);
}


export async function approveRequest(requestId, bloodGroup, requestedDonorId = null) {
    try {
        let donor;

        // If a specific donor was requested, use that donor
        if (requestedDonorId) {
            // Get all donors to find the specific one
            const allDonorsResult = await getAllDonors();
            if (allDonorsResult.success) {
                donor = allDonorsResult.donors.find(d => d.id === requestedDonorId);

                if (!donor) {
                    return {
                        success: false,
                        error: 'Requested donor not found'
                    };
                }

                // Check if the requested donor is still available
                if (donor.availability !== 'Yes') {
                    return {
                        success: false,
                        error: `Requested donor ${donor.fullName} is no longer available`
                    };
                }

                // Verify blood group matches
                if (donor.bloodGroup !== bloodGroup) {
                    return {
                        success: false,
                        error: 'Requested donor blood group does not match'
                    };
                }
            } else {
                return {
                    success: false,
                    error: 'Failed to fetch donors'
                };
            }
        } else {
            const donorsResult = await getFilteredDonors(bloodGroup, 'Yes');

            if (!donorsResult.success || donorsResult.donors.length === 0) {
                return {
                    success: false,
                    error: 'No available donors found with blood group ' + bloodGroup
                };
            }


            donor = donorsResult.donors[0];
        }


        const updateResult = await updateDonorAvailability(donor.id, 'No');
        if (!updateResult.success) {
            return {
                success: false,
                error: 'Failed to update donor availability'
            };
        }


        const statusResult = await updateRequestStatus(requestId, 'completed');
        if (!statusResult.success) {

            await updateDonorAvailability(donor.id, 'Yes');
            return {
                success: false,
                error: 'Failed to update request status'
            };
        }

        return {
            success: true,
            donorId: donor.id,
            donorName: donor.fullName
        };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

