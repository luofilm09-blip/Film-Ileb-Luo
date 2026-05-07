import { Switch, Route, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        color: '#666',
        fontSize: 16,
      }}
    >
      Page not found
    </div>
  );
}

function Layout() {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#141414',
      }}
    >
      {/* Fixed Left Sidebar */}
      <Sidebar />

      {/* Main content area (offset by sidebar) */}
      <div
        style={{
          marginLeft: 80,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          overflow: 'hidden',
        }}
      >
        {/* Fixed Top Header */}
        <Header />

        {/* Page content (scrollable) */}
        <main
          style={{
            marginTop: 56,
            flex: 1,
            overflowY: 'auto',
            padding: '16px 20px 0',
            background: '#141414',
          }}
        >
          <Switch>
            <Route path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Layout />
      </WouterRouter>
    </QueryClientProvider>
  );
}
