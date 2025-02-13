import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { createContext, useState, useEffect } from 'react';
import { auth } from './firebase-init';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [menu, setMenu] = useState(false);
    const [theme, setTheme] = useState('dark');
    const pageBannerImg = 'https://i.ibb.co.com/CMF2gtN/pexels-quang-nguyen-vinh-222549-2132180.jpg';
    const [visas, setVisas] = useState([]);
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null)
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [filteredVisas, setFilteredVisas] = useState(visas);

    useEffect(() => {
        fetch('https://server-side-phi-green.vercel.app/visa')
            .then(data => data.json())
            .then(data => {
                setVisas(data);
            })
    }, [])

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const continueWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                setUser(currentUser);

            }
            else {
                //
            }
        })
        return unSubscribe;
    }, [])


    const logOutUser = () => {
        setUser(null);
        return signOut(auth);
    }

    const updateVisas = (newVisa) => {
        setVisas((prevVisas) => [...prevVisas, newVisa]);
    };
    const [appliedVisas, setAppliedVisas] = useState([]);

    useEffect(() => {
        fetch('https://server-side-phi-green.vercel.app/applied-visa')
            .then(data => data.json())
            .then(data => {
                setAppliedVisas(data);
            })
    }, [])

    const forgotPassword = (email) => {
        return sendPasswordResetEmail(auth, email);
    }

    const authInfo = {
        menu,
        setMenu,
        theme,
        setTheme,
        pageBannerImg,
        visas,
        createUser,
        logInUser,
        continueWithGoogle,
        user,
        logOutUser,
        setVisas,
        dropdownVisible,
        setDropdownVisible,
        updateVisas,
        appliedVisas,
        setAppliedVisas,
        forgotPassword,
        filteredVisas, 
        setFilteredVisas,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;