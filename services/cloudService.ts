// This service simulates interactions with ashadu.cloud (The Memory/Registry)
// It handles user data and profile storage.

export interface UserStatus {
    isVerified: boolean;
    isCore: boolean;
    isAligned: boolean;
}

// Mock user data stored on the "cloud"
let currentUserStatus: UserStatus = {
    isVerified: false,
    isCore: false,
    isAligned: false,
};

/**
 * Fetches the current user's status from the cloud registry.
 * Simulates a network request with a short delay.
 */
export const fetchUserStatus = (): Promise<UserStatus> => {
    console.log("HANDSHAKE: ashadu.world -> ashadu.cloud (fetchUserStatus)");
    return new Promise(resolve => {
        setTimeout(() => {
            console.log("RESPONSE: ashadu.cloud -> ashadu.world (userStatus)");
            resolve({ ...currentUserStatus });
        }, 300); // Simulate network latency
    });
};

/**
 * Commits the user's advance reward, verifying them in the system.
 * This simulates a write operation to the user registry on ashadu.cloud.
 */
export const commitAdvanceReward = (): Promise<{ success: boolean; newStatus: UserStatus }> => {
    console.log("HANDSHAKE: ashadu.world -> ashadu.cloud (commitAdvanceReward)");
    return new Promise(resolve => {
        setTimeout(() => {
            currentUserStatus = {
                isVerified: true,
                isCore: true,
                isAligned: true,
            };
             console.log("RESPONSE: ashadu.cloud -> ashadu.world (commit successful)");
            resolve({ success: true, newStatus: { ...currentUserStatus } });
        }, 500); // Simulate network latency
    });
};