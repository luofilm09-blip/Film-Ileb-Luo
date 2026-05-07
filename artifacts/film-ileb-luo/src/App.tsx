import { Switch, Route, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import PlayPage from './pages/PlayPage';
import CategoryPage from './pages/CategoryPage';

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', color: '#666', fontSize: 14, fontFamily: 'Arial, sans-serif', gap: 12 }}>
      <span style={{ fontSize: 48, opacity: 0.2 }}>404</span>
      <span>PAGE NOT FOUND</span>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
        <Sidebar />
        <Header />
        <div className="channel_container">
          <div className="channel_container_modulelist">
            <Switch>
              {/* Home */}
              <Route path="/" component={Home} />

              {/* Video play page */}
              <Route path="/play/:id" component={PlayPage} />

              {/* Category pages — each nav route mapped to its category ID */}
              <Route path="/drama">
                {() => <CategoryPage categoryId="drama" />}
              </Route>
              <Route path="/anime">
                {() => <CategoryPage categoryId="anime" />}
              </Route>
              <Route path="/movies">
                {() => <CategoryPage categoryId="movies" />}
              </Route>
              <Route path="/variety">
                {() => <CategoryPage categoryId="variety" />}
              </Route>
              <Route path="/short">
                {() => <CategoryPage categoryId="short" />}
              </Route>
              <Route path="/kids">
                {() => <CategoryPage categoryId="kids" />}
              </Route>
              <Route path="/vip">
                {() => <CategoryPage categoryId="vip" />}
              </Route>
              <Route path="/documentary">
                {() => <CategoryPage categoryId="documentary" />}
              </Route>
              <Route path="/sports">
                {() => <CategoryPage categoryId="sports" />}
              </Route>
              <Route path="/culture">
                {() => <CategoryPage categoryId="culture" />}
              </Route>
              <Route path="/live">
                {() => <CategoryPage categoryId="live" />}
              </Route>
              <Route path="/games">
                {() => <CategoryPage categoryId="games" />}
              </Route>
              <Route path="/learning">
                {() => <CategoryPage categoryId="learning" />}
              </Route>
              <Route path="/knowledge">
                {() => <CategoryPage categoryId="knowledge" />}
              </Route>
              <Route path="/new-films">
                {() => <CategoryPage categoryId="new-films" />}
              </Route>
              <Route path="/health">
                {() => <CategoryPage categoryId="health" />}
              </Route>
              <Route path="/charity">
                {() => <CategoryPage categoryId="charity" />}
              </Route>
              <Route path="/accessible">
                {() => <CategoryPage categoryId="accessible" />}
              </Route>

              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </WouterRouter>
    </QueryClientProvider>
  );
}
