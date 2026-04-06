import { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Welcome } from './components/Welcome';
import { Login } from './components/Login';
import { Dashboard } from './components/Dashboard';
import { Trainer } from './components/Trainer';
import { ProfileSetup } from './components/ProfileSetup';
import { ParentDashboard } from './components/ParentDashboard';
import { useAuth } from './hooks/useAuth';
import { AI_BASICS, HARDWARE, SOFTWARE, INTERNET } from './constants';
import { motion, AnimatePresence } from 'motion/react';
import { useGameStore } from './store/useGameStore';
import { BadgeUnlockModal } from './components/BadgeUnlockModal';

type View = 'welcome' | 'login' | 'profile-setup' | 'dashboard' | 'trainer' | 'parent-dashboard';

export default function App() {
  const [view, setView] = useState<View>('welcome');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { user, storeUser, loading, login, createProfile } = useAuth();
  const { learningStates } = useGameStore();

  useEffect(() => {
    const handleGuestLogin = () => setView('dashboard');
    const handleGoToLogin = () => setView('login');
    window.addEventListener('guest-login', handleGuestLogin);
    window.addEventListener('go-to-login', handleGoToLogin);
    return () => {
      window.removeEventListener('guest-login', handleGuestLogin);
      window.removeEventListener('go-to-login', handleGoToLogin);
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      if (user) {
        if (storeUser) {
          if (view === 'welcome' || view === 'login' || view === 'profile-setup') {
            setView('dashboard');
          }
        } else {
          setView('profile-setup');
        }
      }
    }
  }, [user, storeUser, loading, view]);

  const handleStart = () => {
    if (user) {
      setView(storeUser ? 'dashboard' : 'profile-setup');
    } else {
      setView('dashboard');
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setView('trainer');
  };

  const handleTrainingComplete = () => {
    setView('dashboard');
    setSelectedCategory(null);
  };

  const handleParentDashboard = () => {
    setView('parent-dashboard');
  };

  const handleBackToDashboard = () => {
    setView('dashboard');
  };

  const getAllCategoryItems = (id: string) => {
    switch (id) {
      case 'ai': return AI_BASICS;
      case 'hardware': return HARDWARE;
      case 'software': return SOFTWARE;
      case 'internet': return INTERNET;
      default: return [];
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xl font-black text-slate-800 animate-pulse">LOADING AI TRAINER...</p>
      </div>
    );
  }

  return (
    <Layout onParentClick={handleParentDashboard}>
      <BadgeUnlockModal />
      <AnimatePresence mode="wait">
        {view === 'welcome' && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Welcome onStart={handleStart} />
          </motion.div>
        )}

        {view === 'login' && (
          <motion.div
            key="login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Login onLogin={login} isLoading={loading} />
          </motion.div>
        )}

        {view === 'profile-setup' && (
          <motion.div
            key="profile-setup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ProfileSetup 
              onComplete={createProfile} 
              initialName={user?.displayName || ''} 
            />
          </motion.div>
        )}

        {view === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Dashboard onSelectCategory={handleCategorySelect} />
          </motion.div>
        )}

        {view === 'trainer' && selectedCategory && (
          <motion.div
            key="trainer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Trainer 
              categoryId={selectedCategory}
              allCategoryItems={getAllCategoryItems(selectedCategory)}
              currentLevel={learningStates[selectedCategory]?.level || 1}
              onComplete={handleTrainingComplete}
            />
          </motion.div>
        )}

        {view === 'parent-dashboard' && (
          <motion.div
            key="parent-dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ParentDashboard onBack={handleBackToDashboard} />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
