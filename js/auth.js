// Authentication Module
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { auth } from './firebase-config.js';

// Admin credentials (hardcoded)
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'admin123@';

/**
 * Sign up a new user with name, email and password
 */
export async function signUp(email, password, name) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Update user profile with display name
        if (name) {
            await updateProfile(user, {
                displayName: name
            });
        }

        return { success: true, user: user };
    } catch (error) {
        // Handle Firebase Auth errors
        let errorMessage = error.message;
        
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'This email is already registered. Please sign in instead.';
        } else if (error.code === 'auth/invalid-email') {
            errorMessage = 'Invalid email format. Please check your email address.';
        } else if (error.code === 'auth/weak-password') {
            errorMessage = 'Password is too weak. Please use a stronger password.';
        }
        
        return { success: false, error: errorMessage };
    }
}

/**
 * Sign in user or admin
 */
export async function signIn(email, password) {
    try {
        // Check admin credentials first (client-side check, no Firebase Auth needed)
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            // Admin login - purely client-side, no Firebase Auth required
            return { success: true, user: { email: ADMIN_EMAIL }, isAdmin: true };
        }

        // Regular user - authenticate with Firebase
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        return { success: true, user: user, isAdmin: false };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Sign out current user
 */
export async function logOut() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

/**
 * Get current user
 */
export function getCurrentUser() {
    return auth.currentUser;
}

/**
 * Monitor auth state changes
 */
export function onAuthStateChange(callback) {
    onAuthStateChanged(auth, callback);
}

/**
 * Check if user is admin
 */
export async function isAdmin() {
    const user = auth.currentUser;
    if (!user) return false;
    
    // Check admin status based on email from Firebase Authentication
    return user.email === ADMIN_EMAIL;
}

