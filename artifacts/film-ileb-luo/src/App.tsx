import { Switch, Route, Router as WouterRouter, Redirect } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider, useApp } from './context/AppContext';
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

function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: '#666', fontSize: 14, fontFamily: 'Arial, sans-serif', gap: 12 }}>
      <span style={{ fontSize: 48, opacity: 0.2 }}>404</span>
      <span>PAGE NOT FOUND</span>
    </div>
  );
}

function AdminGate() {
  const { user, openLogin } = useApp();

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
        <div style={{ fontSize: 48, opacity: 0.3 }}>🚫</div>
        <div style={{ color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: 1 }}>ACCESS DENIED</div>
        <div style={{ color: '#555', fontSize: 11, letterSpacing: 0.8 }}>YOU DO NOT HAVE ADMIN PRIVILEGES</div>
        <a href="/" style={{ color: '#e50914', fontSize: 11, letterSpacing: 1, textDecoration: 'none', marginTop: 8 }}>← BACK TO SITE</a>
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
            <Route component={NotFound} />
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
