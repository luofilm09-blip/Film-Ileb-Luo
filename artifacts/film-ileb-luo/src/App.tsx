import { useEffect, useState } from 'react';
import { Switch, Route, Router as WouterRouter, Redirect } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider, useApp } from './context/AppContext';
import { hasAnyAdmin, setUser } from './lib/db';
import { auth } from './lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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

const queryClient = new QueryClient();

const SETUP_CODE = 'FILMADMIN2025';

function AdminSetupPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', code: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const submit = async () => {
    if (form.code !== SETUP_CODE) { setError('INVALID SETUP CODE'); return; }
    if (!form.name || !form.email || !form.password) { setError('ALL FIELDS ARE REQUIRED'); return; }
    if (form.password.length < 6) { setError('PASSWORD MUST BE AT LEAST 6 CHARACTERS'); return; }
    setLoading(true); setError('');
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      await updateProfile(cred.user, { displayName: form.name });
      await setUser(cred.user.uid, {
        uid: cred.user.uid, name: form.name.toUpperCase(), email: form.email, phone: '',
        isAdmin: true, isVip: true, vipExpiry: null, status: 'active', createdAt: serverTimestamp() as any,
      });
      window.location.reload();
    } catch (e: any) {
      if (e.message?.includes('email-already-in-use')) setError('EMAIL ALREADY REGISTERED. LOG IN AND SET isAdmin=true IN FIREBASE CONSOLE.');
      else setError('SETUP FAILED: ' + (e.message || 'UNKNOWN ERROR'));
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0d0d0f', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ background: '#16161a', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '40px 36px', width: 420, maxWidth: '95vw' }}>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontFamily: 'Arial Black, Arial, sans-serif', fontSize: 20, fontWeight: 900, letterSpacing: 1, marginBottom: 8 }}>
            <span style={{ color: '#e50914' }}>FILM ILEB</span><span style={{ color: '#fff' }}> LUO</span>
          </div>
          <div style={{ color: '#e50914', fontSize: 11, fontWeight: 700, letterSpacing: 2 }}>ADMIN FIRST-TIME SETUP</div>
          <div style={{ color: '#444', fontSize: 10, letterSpacing: 1, marginTop: 6 }}>NO ADMIN ACCOUNT FOUND — CREATE THE FIRST ADMIN</div>
        </div>
        {error && <div style={{ background: 'rgba(229,9,20,0.1)', border: '1px solid rgba(229,9,20,0.3)', borderRadius: 8, padding: '10px 14px', marginBottom: 16, color: '#e50914', fontSize: 11, letterSpacing: 0.8 }}>{error}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input style={inp} placeholder="ADMIN NAME" value={form.name} onChange={e => set('name', e.target.value)} />
          <input style={inp} placeholder="ADMIN EMAIL" type="email" value={form.email} onChange={e => set('email', e.target.value)} />
          <input style={inp} placeholder="PASSWORD (MIN 6 CHARS)" type="password" value={form.password} onChange={e => set('password', e.target.value)} />
          <input style={inp} placeholder="SETUP CODE" value={form.code} onChange={e => set('code', e.target.value)} />
        </div>
        <div style={{ color: '#333', fontSize: 10, letterSpacing: 0.8, margin: '10px 0' }}>SETUP CODE: FILMADMIN2025</div>
        <button onClick={submit} disabled={loading} style={{ width: '100%', padding: '13px', background: loading ? '#333' : 'linear-gradient(135deg,#e50914,#c0000a)', border: 'none', borderRadius: 10, color: '#fff', fontFamily: 'Arial, sans-serif', fontWeight: 700, fontSize: 12, letterSpacing: 2, cursor: 'pointer', marginTop: 8 }}>
          {loading ? 'CREATING ADMIN...' : 'CREATE ADMIN ACCOUNT'}
        </button>
      </div>
    </div>
  );
}

const inp: React.CSSProperties = { width: '100%', padding: '12px 14px', background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#fff', fontFamily: 'Arial, sans-serif', fontSize: 12, letterSpacing: 1, outline: 'none', boxSizing: 'border-box' };

function AdminGate() {
  const { user, authLoading, openLogin } = useApp();
  const [hasAdmin, setHasAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    hasAnyAdmin().then(setHasAdmin);
  }, []);

  if (authLoading || hasAdmin === null) {
    return <div style={{ minHeight: '100vh', background: '#0d0d0f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontFamily: 'Arial, sans-serif', fontSize: 11, letterSpacing: 1 }}>LOADING...</div>;
  }

  if (!hasAdmin) {
    return <AdminSetupPage />;
  }

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: '#0d0d0f', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20, fontFamily: 'Arial, sans-serif' }}>
        <div style={{ fontFamily: 'Arial Black, Arial, sans-serif', fontSize: 22, fontWeight: 900 }}>
          <span style={{ color: '#e50914' }}>FILM ILEB</span><span style={{ color: '#fff' }}> LUO</span>
        </div>
        <div style={{ color: '#555', fontSize: 11, letterSpacing: 1 }}>ADMIN ACCESS REQUIRED</div>
        <button onClick={() => openLogin('login')} style={{ background: '#e50914', border: 'none', borderRadius: 10, color: '#fff', padding: '13px 32px', fontSize: 12, fontWeight: 700, letterSpacing: 2, cursor: 'pointer' }}>
          LOG IN TO CONTINUE
        </button>
        <LoginModal />
      </div>
    );
  }

  if (!user.isAdmin) {
    return (
      <div style={{ minHeight: '100vh', background: '#0d0d0f', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16, fontFamily: 'Arial, sans-serif' }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="1.5" strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M12 8v4M12 16h.01"/></svg>
        <div style={{ color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>ACCESS DENIED</div>
        <div style={{ color: '#555', fontSize: 11, letterSpacing: 0.8 }}>YOU DO NOT HAVE ADMIN PRIVILEGES</div>
        <div style={{ color: '#333', fontSize: 10, letterSpacing: 0.8, maxWidth: 300, textAlign: 'center' }}>CONTACT THE SITE OWNER TO GRANT ADMIN ACCESS IN FIREBASE CONSOLE</div>
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
