import { useEffect, useState, createContext } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from 'firebase/auth';
import { app } from '../firebase/firebase.config';
import useAxiosPublic from '../Hooks/useAxiosPublic';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = async (name, photoURL) => {
    if (!auth.currentUser) return;

    try {
      await updateProfile(auth.currentUser, { displayName: name, photoURL });

      // Update user data in your backend
      const response = await axiosPublic.put(
        `/users/${auth.currentUser.email}`,
        {
          name,
          photoURL,
        }
      );

      // Update local user state
      setUser(response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      if (currentUser) {
        // get token and store client
        const userInfo = { email: currentUser.email };
        axiosPublic.post('/jwt', userInfo).then(res => {
          if (res.data.token) {
            localStorage.setItem('access-token', res.data.token);
            setLoading(false);
          }
        });
      } else {
        // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
        localStorage.removeItem('access-token');
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logout,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
