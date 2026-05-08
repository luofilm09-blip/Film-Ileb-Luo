import { useEffect, useState } from 'react';
import { Switch, Route, Router as WouterRouter, Redirect } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider, useApp } from './context/AppContext';
import { hasAnyAdmin, setUser, getAdminAuth, setAdminAuth } from './lib/db';
import { auth } from './lib/firebase';
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from 'firebase/auth';
import { serverTimestamp } from 'firebase/firestore';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginModal from './components/LoginModal';
import VipModal from './components/VipModal';
import Home from './pages/Home';
import PlayPage from './pages/PlayPage';
import CategoryPage from './pages/CategoryPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminMovies from './pages/admin/AdminMovies';
import AdminSeries from './pages/admin/AdminSeries';
import AdminEpisodes from './pages/admin/AdminEpisodes';
import AdminLive from './pages/admin/AdminLive';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSubscriptions from './pages/admin/AdminSubscriptions';
import AdminWallet from './pages/admin/AdminWallet';
import AdminSettings from './pages/admin/AdminSettings';
import AdminSEO from './pages/admin/AdminSEO';
import AdminCarousel from './pages/admin/AdminCarousel';

const queryClient = new QueryClient();

const ADMIN_EMAIL = 'admin@film-ileb-luo.com';
const INITIAL_PASSWORD = '4l4k4n54';

function AdminPasswordLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!password) { setError('PLEASE ENTER YOUR PASSWORD'); return; }
    setLoading(true); setError('');
    try {
      const adminAuth = await getAdminAuth();
      const email = adminAuth?.email || ADMIN_EMAIL;
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess();
    } catch (e: any) {
      if (e.code === 'auth/invalid-credential' || e.code === 'auth/wrong-password') {
        setError('INCORRECT PASSWORD. PLEASE TRY AGAIN.');
      } else {
        setError('LOGIN FAILED: ' + (e.message || 'UNKNOWN ERROR'));
      }
    } finally { setLoading(false); }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') submit();
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '40px 36px', width: 380, maxWidth: '95vw' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontFamily: 'Arial Black, Arial, sans-serif', fontSize: 22, fontWeight: 900, letterSpacing: 1, marginBottom: 10 }}>
            <span style={{ color: '#e50914' }}>FILM ILEB</span><span style={{ color: '#fff' }}> LUO</span>
          </div>
          <div style={{ width: 48, height: 48, background: 'rgba(229,9,20,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e50914" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <div style={{ color: '#e50914', fontSize: 11, fontWeight: 700, letterSpacing: 2 }}>ADMIN ACCESS</div>
          <div style={{ color: '#444', fontSize: 10, letterSpacing: 1, marginTop: 6 }}>ENTER YOUR ADMIN PASSWORD TO CONTINUE</div>
        </div>

        {error && (
          <div style={{ background: 'rgba(229,9,20,0.1)', border: '1px solid rgba(229,9,20,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, color: '#e50914', fontSize: 11, letterSpacing: 0.8 }}>
            {error}
          </div>
        )}

        <div style={{ position: 'relative', marginBottom: 16 }}>
          <input
            type={show ? 'text' : 'password'}
            placeholder="ADMIN PASSWORD"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={handleKey}
            autoFocus
            style={{ width: '100%', padding: '13px 44px 13px 14px', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontFamily: 'Arial, sans-serif', fontSize: 13, letterSpacing: 2, outline: 'none', boxSizing: 'border-box' }}
          />
          <button
            onClick={() => setShow(!show)}
            style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#444', padding: 4, display: 'flex' }}
          >
            {show ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><path d="M1 1l22 22"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            )}
          </button>
        </div>

        <button
          onClick={submit}
          disabled={loading}
          style={{ width: '100%', padding: '13px', background: loading ? '#333' : 'linear-gradient(135deg,#e50914,#c0000a)', border: 'none', borderRadius: 10, color: '#fff', fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: 2, cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'VERIFYING...' : 'ENTER ADMIN PANEL'}
        </button>

        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <a href="/" style={{ color: '#333', fontSize: 10, letterSpacing: 1, textDecoration: 'none' }}>← BACK TO SITE</a>
        </div>
      </div>
    </div>
  );
}

function AdminGate() {
  const { user, authLoading } = useApp();
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);
  const [setting, setSetting] = useState(false);
  const [setupError, setSetupError] = useState('');
  const [loginNeeded, setLoginNeeded] = useState(false);

  useEffect(() => {
    hasAnyAdmin().then(result => {
      setHasAdmin(result);
    });
  }, []);

  useEffect(() => {
    if (hasAdmin === false && !setting) {
      autoSetup();
    }
  }, [hasAdmin]);

  const autoSetup = async () => {
    setSetting(true);
    setSetupError('');
    try {
      let cred;
      try {
        cred = await createUserWithEmailAndPassword(auth, ADMIN_EMAIL, INITIAL_PASSWORD);
        await updateProfile(cred.user, { displayName: 'ADMINISTRATOR' });
        await setUser(cred.user.uid, {
          uid: cred.user.uid,
          name: 'ADMINISTRATOR',
          email: ADMIN_EMAIL,
          phone: '',
          isAdmin: true,
          isVip: true,
          vipExpiry: null,
          status: 'active',
          createdAt: serverTimestamp() as any,
        });
        await setAdminAuth({ email: ADMIN_EMAIL });
        setHasAdmin(true);
      } catch (e: any) {
        if (e.code === 'auth/email-already-in-use') {
          await setAdminAuth({ email: ADMIN_EMAIL });
          setHasAdmin(true);
          setLoginNeeded(true);
        } else {
          throw e;
        }
      }
    } catch (e: any) {
      setSetupError('SETUP FAILED: ' + (e.message || 'UNKNOWN ERROR'));
    } finally {
      setSetting(false);
    }
  };

  if (authLoading || hasAdmin === null || setting) {
    return (
      <div style={{ minHeight: '100vh', background: '#0d0d0f', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, fontFamily: 'Arial, sans-serif' }}>
        <div style={{ width: 32, height: 32, border: '2px solid rgba(229,9,20,0.3)', borderTop: '2px solid #e50914', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <div style={{ color: '#333', fontSize: 11, letterSpacing: 1 }}>
          {setting ? 'SETTING UP ADMIN...' : 'LOADING...'}
        </div>
      </div>
    );
  }

  if (setupError) {
    return (
      <div style={{ minHeight: '100vh', background: '#0d0d0f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ color: '#e50914', fontSize: 12, letterSpacing: 1, textAlign: 'center', maxWidth: 400 }}>
          <div style={{ marginBottom: 12 }}>{setupError}</div>
          <button onClick={() => window.location.reload()} style={{ background: '#e50914', border: 'none', borderRadius: 8, color: '#fff', padding: '10px 24px', fontSize: 11, fontWeight: 700, letterSpacing: 1, cursor: 'pointer' }}>RETRY</button>
        </div>
      </div>
    );
  }

  if (!user || loginNeeded) {
    return <AdminPasswordLogin onSuccess={() => setLoginNeeded(false)} />;
  }

  if (!user.isAdmin) {
    return (
      <div style={{ minHeight: '100vh', background: '#0d0d0f', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, fontFamily: 'Arial, sans-serif' }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4M12 16h.01"/></svg>
        <div style={{ color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>ACCESS DENIED</div>
        <div style={{ color: '#555', fontSize: 11, letterSpacing: 0.8 }}>YOU DO NOT HAVE ADMIN PRIVILEGES</div>
        <a href="/" style={{ color: '#e50914', fontSize: 11, letterSpacing: 1, textDecoration: 'none', marginTop: 8 }}>BACK TO SITE</a>
      </div>
    );
  }

  return (
    <AdminLayout>
      <Switch>
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/movies" component={AdminMovies} />
        <Route path="/admin/series" component={AdminSeries} />
        <Route path="/admin/episodes" component={AdminEpisodes} />
        <Route path="/admin/live" component={AdminLive} />
        <Route path="/admin/users" component={AdminUsers} />
        <Route path="/admin/subscriptions" component={AdminSubscriptions} />
        <Route path="/admin/wallet" component={AdminWallet} />
        <Route path="/admin/carousel" component={AdminCarousel} />
        <Route path="/admin/settings" component={AdminSettings} />
        <Route path="/admin/seo" component={AdminSEO} />
        <Route>{() => <Redirect to="/admin" />}</Route>
      </Switch>
    </AdminLayout>
  );
}

function MainSite() {
  return (
    <>
      <Sidebar />
      <Header />
      <LoginModal />
      <VipModal />
      <div className="channel_container">
        <div className="channel_container_modulelist">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/play/:id" component={PlayPage} />
            <Route path="/drama">{() => <CategoryPage categoryId="drama" />}</Route>
            <Route path="/anime">{() => <CategoryPage categoryId="anime" />}</Route>
            <Route path="/movies">{() => <CategoryPage categoryId="movies" />}</Route>
            <Route path="/variety">{() => <CategoryPage categoryId="variety" />}</Route>
            <Route path="/short">{() => <CategoryPage categoryId="short" />}</Route>
            <Route path="/kids">{() => <CategoryPage categoryId="kids" />}</Route>
            <Route path="/vip">{() => <CategoryPage categoryId="vip" />}</Route>
            <Route path="/documentary">{() => <CategoryPage categoryId="documentary" />}</Route>
            <Route path="/sports">{() => <CategoryPage categoryId="sports" />}</Route>
            <Route path="/culture">{() => <CategoryPage categoryId="culture" />}</Route>
            <Route path="/live">{() => <CategoryPage categoryId="live" />}</Route>
            <Route path="/games">{() => <CategoryPage categoryId="games" />}</Route>
            <Route path="/learning">{() => <CategoryPage categoryId="learning" />}</Route>
            <Route path="/knowledge">{() => <CategoryPage categoryId="knowledge" />}</Route>
            <Route path="/new-films">{() => <CategoryPage categoryId="new-films" />}</Route>
            <Route path="/health">{() => <CategoryPage categoryId="health" />}</Route>
            <Route path="/charity">{() => <CategoryPage categoryId="charity" />}</Route>
            <Route path="/accessible">{() => <CategoryPage categoryId="accessible" />}</Route>
            <Route>{() => (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: '#666', fontSize: 14, fontFamily: 'Arial, sans-serif', gap: 12 }}>
                <span style={{ fontSize: 48, opacity: 0.2 }}>404</span>
                <span>PAGE NOT FOUND</span>
              </div>
            )}</Route>
          </Switch>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Switch>
            <Route path="/admin">
              {() => <AdminGate />}
            </Route>
            <Route path="/admin/:rest*">
              {() => <AdminGate />}
            </Route>
            <Route>
              {() => <MainSite />}
            </Route>
          </Switch>
        </WouterRouter>
      </AppProvider>
    </QueryClientProvider>
  );
}
